import json
from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required, get_jwt_identity
from extensions import bcrypt, db
from models import User, Event, Ticket, Payment
from datetime import datetime

routes = Blueprint('routes', __name__)

def create_tokens(user):
    user_identity = json.dumps({"id": user.id, "email": user.email, "role": user.role})
    access_token = create_access_token(identity=user_identity)
    refresh_token = create_refresh_token(identity=user_identity)
    return access_token, refresh_token

@routes.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Welcome to Eventify API"}), 200

@routes.route("/verify-token", methods=["POST"])
@jwt_required()
def verify_token():
    return jsonify({"valid": True}), 200

@routes.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()
    hashed_password = bcrypt.generate_password_hash(data["password"]).decode("utf-8")
    if User.query.filter_by(email=data["email"]).first():
        return jsonify({"error": "Email already registered"}), 400
    user = User(name=data["name"], email=data["email"], password=hashed_password, role=data.get("role", "user"))
    db.session.add(user)
    db.session.commit()
    return jsonify({"message": "User created successfully"}), 201

@routes.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data["email"]).first()
    if user and bcrypt.check_password_hash(user.password, data["password"]):
        access_token, refresh_token = create_tokens(user)
        return jsonify(access_token=access_token, refresh_token=refresh_token, role=user.role)
    return jsonify({"message": "Incorrect email or password"}), 401

@routes.route("/refresh", methods=["POST"])
@jwt_required()
def refresh():
    current_user = json.loads(get_jwt_identity())
    new_access_token = create_access_token(identity=current_user, fresh=False)
    return jsonify(access_token=new_access_token), 201

@routes.route("/users", methods=["GET"])
@jwt_required()
def get_users():
    current_user = json.loads(get_jwt_identity())
    if current_user["role"] != "admin":
        return jsonify({"message": "Access Forbidden"}), 403
    users = User.query.all()
    return jsonify([{"id": u.id, "name": u.name, "email": u.email, "role": u.role} for u in users])

@routes.route("/user-details", methods=["GET"])
@jwt_required()
def get_user_details():
    current_user = json.loads(get_jwt_identity())
    user = User.query.get(current_user["id"])
    if not user:
        return jsonify({"message": "User not found"}), 404
    return jsonify({
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "role": user.role
    }), 200

@routes.route("/users/<int:user_id>", methods=["PUT"])
@jwt_required()
def update_user(user_id):
    current_user = json.loads(get_jwt_identity())
    if current_user["role"] != "admin":
        return jsonify({"error": "Access Forbidden: Admins only"}), 403
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404
    data = request.get_json()
    user.name = data.get("name", user.name)
    user.email = data.get("email", user.email)
    user.role = data.get("role", user.role)
    db.session.commit()
    return jsonify({"message": "User updated successfully"})

@routes.route("/users/<int:user_id>", methods=["DELETE"])
@jwt_required()
def delete_user(user_id):
    current_user = json.loads(get_jwt_identity())
    if current_user["role"] != "admin":
        return jsonify({"error": "Access Forbidden: Admins only"}), 403
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404
    db.session.delete(user)
    db.session.commit()
    return jsonify({"message": "User deleted successfully"})

@routes.route("/events", methods=["GET"])
def get_events():
    events = Event.query.all()
    return jsonify([{
        "id": e.id,
        "title": e.title,
        "description": e.description,
        "date": e.date,
        "location": e.location,
        "ticket_price": e.ticket_price,
        "available_tickets": e.available_tickets,
        "featured": e.featured,
        "category": e.category,
        "image": e.image
    } for e in events])

@routes.route("/events", methods=["POST"])
@jwt_required()
def create_event():
    current_user = json.loads(get_jwt_identity())
    if current_user["role"] != "admin":
        return jsonify({"error": "Access Forbidden: Admins only"}), 403

    data = request.get_json()

    if not data.get("title") or not data.get("location") or not data.get("ticket_price") or not data.get("date"):
        return jsonify({"error": "Missing required fields"}), 400

    try:
        event_date = datetime.strptime(data["date"], "%Y-%m-%d").date()
    except ValueError:
        return jsonify({"error": "Invalid date format. Use 'YYYY-MM-DD'"}), 400

    try:
        new_event = Event(
            title=data["title"],
            description=data.get("description", ""),
            date=event_date,
            location=data["location"],
            ticket_price=data["ticket_price"],
            available_tickets=data.get("available_tickets", 100),
            category=data.get("category", ""),
            featured=data.get("featured", False),
            image=data.get("image") or None  
        )

        db.session.add(new_event)
        db.session.commit()

        return jsonify({"message": "Event created successfully", "event": new_event.id}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@routes.route("/events/<int:event_id>", methods=["PUT"])
@jwt_required()
def update_event(event_id):
    current_user = json.loads(get_jwt_identity())
    if current_user["role"] != "admin":
        return jsonify({"error": "Access Forbidden: Admins only"}), 403
    event = Event.query.get(event_id)
    if not event:
        return jsonify({"error": "Event not found"}), 404
    data = request.get_json()
    if not data.get("title") or not data.get("location") or not data.get("ticket_price") or not data.get("date"):
        return jsonify({"error": "Missing required fields"}), 400

    try:
        event_date = datetime.strptime(data["date"], "%Y-%m-%d").date()
    except ValueError:
        return jsonify({"error": "Invalid date format. Use 'YYYY-MM-DD'"}), 400

    event.title = data.get("title", event.title)
    event.description = data.get("description", event.description)
    event.date = event_date
    event.location = data.get("location", event.location)
    event.ticket_price = data.get("ticket_price", event.ticket_price)
    event.available_tickets = data.get("available_tickets", event.available_tickets)
    event.category = data.get("category", event.category)
    event.featured = data.get("featured", event.featured)
    event.image = data.get("image", event.image)

    db.session.commit()
    return jsonify({"message": "Event updated successfully"})

@routes.route("/events/<int:event_id>", methods=["DELETE"])
@jwt_required()
def delete_event(event_id):
    current_user = json.loads(get_jwt_identity())
    if current_user["role"] != "admin":
        return jsonify({"error": "Access Forbidden: Admins only"}), 403
    event = Event.query.get(event_id)
    if not event:
        return jsonify({"error": "Event not found"}), 404
    db.session.delete(event)
    db.session.commit()
    return jsonify({"message": "Event deleted successfully"})

@routes.route("/tickets", methods=["GET"])
@jwt_required()
def get_tickets():
    current_user = json.loads(get_jwt_identity())
    tickets = Ticket.query.filter_by(user_id=current_user["id"]).all() if current_user["role"] != "admin" else Ticket.query.all()
    return jsonify([{
        "id": t.id,
        "event_id": t.event_id,
        "user_id": t.user_id,
        "purchase_date": t.purchase_date,
        "status": t.status
    } for t in tickets])

@routes.route("/tickets", methods=["POST"])
@jwt_required()
def create_ticket():
    current_user = json.loads(get_jwt_identity())
    data = request.get_json()
    event = Event.query.get_or_404(data["event_id"])
    if event.available_tickets < 1:
        return jsonify({"message": "No tickets available"}), 400
    ticket = Ticket(
        event_id=event.id,
        user_id=current_user["id"],
        status="confirmed"
    )
    event.available_tickets -= 1
    db.session.add(ticket)
    db.session.commit()
    return jsonify({"message": "Ticket booked successfully"}), 201

@routes.route("/tickets/<int:ticket_id>", methods=["DELETE"])
@jwt_required()
def delete_ticket(ticket_id):
    current_user = json.loads(get_jwt_identity())
    ticket = Ticket.query.get_or_404(ticket_id)
    if current_user["role"] != "admin" and ticket.user_id != current_user["id"]:
        return jsonify({"message": "Access Forbidden"}), 403
    event = Event.query.get(ticket.event_id)
    event.available_tickets += 1
    db.session.delete(ticket)
    db.session.commit()
    return jsonify({"message": "Ticket deleted successfully"}), 200

@routes.route("/change-password", methods=["POST"])
@jwt_required()
def change_password():
    current_user = json.loads(get_jwt_identity())
    data = request.get_json()
    
    if not data.get("current_password") or not data.get("new_password"):
        return jsonify({"error": "Missing required fields"}), 400

    user = User.query.get(current_user["id"])
    if not user or not bcrypt.check_password_hash(user.password, data["current_password"]):
        return jsonify({"error": "Current password is incorrect"}), 401

    hashed_new_password = bcrypt.generate_password_hash(data["new_password"]).decode("utf-8")
    user.password = hashed_new_password
    db.session.commit()

    return jsonify({"message": "Password changed successfully"}), 200
