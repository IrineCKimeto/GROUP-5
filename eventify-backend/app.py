from flask import Flask, request, jsonify
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required, get_jwt_identity
from dotenv import load_dotenv
import os
from extensions import bcrypt, jwt, cors, migrate, db
from models import User, Event, Ticket, Payment

# Load environment variables from .env file
load_dotenv()

# Create an instance of the Flask application
app = Flask(__name__)

# Configure the app
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv("DATABASE_URL", f"sqlite:///{os.path.join(os.path.abspath(os.path.dirname(__file__)), 'app.db')}")
app.config['SECRET_KEY'] = os.getenv("SECRET_KEY", "your-default-secret-key")
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False 
# Initialize extensions
bcrypt.init_app(app)
jwt.init_app(app)
cors.init_app(app)
migrate.init_app(app, db)
db.init_app(app)

def create_tokens(user):
    access_token = create_access_token(identity={"id": user.id, "email": user.email, "role": user.role})
    refresh_token = create_refresh_token(identity={"id": user.id, "email": user.email, "role": user.role})
    return access_token, refresh_token

@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Welcome to Eventify API"}), 200

@app.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()
    hashed_password = bcrypt.generate_password_hash(data["password"]).decode("utf-8")
    if User.query.filter_by(email=data["email"]).first():
        return jsonify({"error": "Email already registered"}), 400
    user = User(name=data["name"], email=data["email"], password=hashed_password, role=data.get("role", "user"))
    db.session.add(user)
    db.session.commit()
    return jsonify({"message": "User created successfully"}), 201

@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data["email"]).first()
    if user and bcrypt.check_password_hash(user.password, data["password"]):
        access_token, refresh_token = create_tokens(user)
        return jsonify(access_token=access_token, refresh_token=refresh_token, role=user.role)
    return jsonify({"message": "Incorrect email or password"}), 401

@app.route("/refresh", methods=["POST"])
@jwt_required(refresh=True)
def refresh():
    current_user = get_jwt_identity()
    new_access_token = create_access_token(identity=current_user, fresh=False)
    return jsonify(access_token=new_access_token), 201

@app.route("/users", methods=["GET"])
@jwt_required()
def get_users():
    current_user = get_jwt_identity()
    if current_user["role"] != "admin":
        return jsonify({"message": "Access Forbidden"}), 403
    users = User.query.all()
    return jsonify([{"id": u.id, "name": u.name, "email": u.email, "role": u.role} for u in users])

@app.route("/events", methods=["GET"])
@jwt_required()
def get_events():
    events = Event.query.all()
    return jsonify([{
        "id": e.id,
        "title": e.title,
        "description": e.description,
        "date": e.date,
        "location": e.location,
        "ticket_price": e.ticket_price,
        "available_tickets": e.available_tickets
    } for e in events])

@app.route("/tickets", methods=["GET"])
@jwt_required()
def get_tickets():
    current_user = get_jwt_identity()
    tickets = Ticket.query.filter_by(user_id=current_user["id"]).all() if current_user["role"] != "admin" else Ticket.query.all()
    return jsonify([{
        "id": t.id,
        "event_id": t.event_id,
        "user_id": t.user_id,
        "purchase_date": t.purchase_date,
        "status": t.status
    } for t in tickets])

if __name__ == "__main__":
    app.run(debug=True)