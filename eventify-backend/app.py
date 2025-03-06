import os
import json
import base64
import uuid
import requests
from datetime import datetime
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from flask_restful import Resource, Api, reqparse
from flask_jwt_extended import (
    JWTManager, create_access_token, create_refresh_token,
    jwt_required, get_jwt_identity
)
from requests.auth import HTTPBasicAuth

# Import extensions, models, and blueprint routes
from extensions import bcrypt, jwt, cors, migrate, db
from models import User, Event, Ticket, Payment
from routes import routes

# Load environment variables
load_dotenv()

# Configuration variables
BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATABASE = os.getenv("DATABASE_URL", f"sqlite:///{os.path.join(BASE_DIR, 'app.db')}")
SECRET_KEY = os.getenv("SECRET_KEY", "your-default-secret-key")
CONSUMER_KEY = os.getenv("CONSUMER_KEY", "default-consumer-key")
CONSUMER_SECRET = os.getenv("CONSUMER_SECRET", "default-consumer-secret")
BASE_URL = os.getenv("BASE_URL", "")
SHORTCODE = os.getenv("SHORTCODE", "default-shortcode")
PASSKEY = os.getenv("PASSKEY", "default-passkey")

# Create and configure the Flask app
app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = DATABASE
app.config["CONSUMER_KEY"] = CONSUMER_KEY
app.config["CONSUMER_SECRET"] = CONSUMER_SECRET
app.config["SECRET_KEY"] = SECRET_KEY
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

# Initialize extensions
bcrypt.init_app(app)
jwt.init_app(app)
cors.init_app(app)
migrate.init_app(app, db)
db.init_app(app)

app.register_blueprint(routes)


def get_access_token():
    url = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"
    response = requests.get(url, auth=HTTPBasicAuth(CONSUMER_KEY, CONSUMER_SECRET))
    return response.json().get("access_token") if response.status_code == 200 else None

# Helper function to generate M-Pesa password
def generate_password(shortcode, passkey, timestamp):
    data_to_encode = f"{shortcode}{passkey}{timestamp}"
    return base64.b64encode(data_to_encode.encode()).decode('utf-8')

# Helper function to get timestamp
def get_timestamp():
    return datetime.now().strftime("%Y%m%d%H%M%S")


# Request parsers for input validation
user_parser = reqparse.RequestParser()
user_parser.add_argument('name', required=True, help='Name is required')
user_parser.add_argument('email', required=True, help='Email is required')
user_parser.add_argument('password', required=True, help='Password is required')
user_parser.add_argument('role', default='user')

ticket_parser = reqparse.RequestParser()
ticket_parser.add_argument('event_id', type=int, required=True, help='Event ID is required')

# User Resource with password hashing and duplicate email check
class UserListResource(Resource):
    @jwt_required()
    def get(self):
        current_user = json.loads(get_jwt_identity())
        # Only admin users may list all users
        if current_user["role"] != "admin":
            return {"message": "Access Forbidden"}, 403
        users = User.query.all()
        return [{'id': u.id, 'name': u.name, 'email': u.email, 'role': u.role} for u in users], 200

    def post(self):
        args = user_parser.parse_args()
        if User.query.filter_by(email=args['email']).first():
            return {"message": "Email already registered"}, 400
        hashed_password = bcrypt.generate_password_hash(args['password']).decode("utf-8")
        user = User(name=args['name'], email=args['email'], password=hashed_password, role=args['role'])
        db.session.add(user)
        db.session.commit()
        return {'message': 'User created', 'id': user.id}, 201

# Event Resource (public endpoint)
class EventListResource(Resource):
    def get(self):
        events = Event.query.all()
        return [{
            'id': e.id,
            'title': e.title,
            'description': e.description,
            'date': e.date.isoformat(),
            'location': e.location,
            'ticket_price': e.ticket_price,
            'available_tickets': e.available_tickets,
            'featured': e.featured,
            'category': e.category,
            'image': e.image
        } for e in events], 200

# Ticket Resource with JWT protection
class TicketListResource(Resource):
    @jwt_required()
    def get(self):
        current_user = json.loads(get_jwt_identity())
        if current_user["role"] == "admin":
            tickets = Ticket.query.all()
        else:
            tickets = Ticket.query.filter_by(user_id=current_user["id"]).all()
        return [{
            'id': t.id,
            'event_id': t.event_id,
            'user_id': t.user_id,
            'purchase_date': t.purchase_date.isoformat(),
            'status': t.status
        } for t in tickets], 200

    @jwt_required()
    def post(self):
        current_user = json.loads(get_jwt_identity())
        args = ticket_parser.parse_args()
        event = Event.query.get_or_404(args['event_id'])
        if event.available_tickets < 1:
            return {"message": "No tickets available"}, 400
        ticket = Ticket(event_id=event.id, user_id=current_user["id"], status="confirmed")
        event.available_tickets -= 1
        db.session.add(ticket)
        db.session.commit()
        return {"message": "Ticket booked successfully", "ticket_id": ticket.id}, 201

# Payment Resource (only accessible by admin for listing all payments)
class PaymentListResource(Resource):
    @jwt_required()
    def get(self):
        current_user = json.loads(get_jwt_identity())
        if current_user["role"] != "admin":
            return {"message": "Access Forbidden"}, 403
        payments = Payment.query.all()
        return [{
            'id': p.id,
            'user_id': p.user_id,
            'ticket_id': p.ticket_id,
            'amount': p.amount,
            'status': p.status,
            'transaction_id': p.transaction_id
        } for p in payments], 200

# Register RESTful resources
api = Api(app)
api.add_resource(UserListResource, '/api/users')
api.add_resource(EventListResource, '/api/events')
api.add_resource(TicketListResource, '/api/tickets')
api.add_resource(PaymentListResource, '/api/payments')

@app.route('/mpesa/stk-push', methods=['POST'])
@jwt_required()
def mpesa_stk_push():
    data = request.get_json()
    phone_number = data.get('phone_number')
    amount = data.get('amount')
    ticket_id = data.get('ticket_id')

    ticket = Ticket.query.get(ticket_id)
    if not ticket:
        return jsonify({"message": "Ticket not found"}), 404
    current_user = json.loads(get_jwt_identity())
    if ticket.user_id != current_user["id"]:
        return jsonify({"message": "Access Forbidden: This ticket does not belong to you"}), 403

    payment = Payment(user_id=current_user["id"], ticket_id=ticket_id, amount=amount, status="pending")
    db.session.add(payment)
    db.session.commit()

    access_token = get_access_token()
    if not access_token:
        return jsonify({"message": "Payment failed. Could not obtain M-Pesa access token."}), 500

    timestamp = get_timestamp()
    password = generate_password(SHORTCODE, PASSKEY, timestamp)

    payload = {
        "BusinessShortCode": SHORTCODE,
        "Password": password,
        "Timestamp": timestamp,
        "TransactionType": "CustomerPayBillOnline",
        "Amount": amount,
        "PartyA": phone_number,
        "PartyB": SHORTCODE,
        "PhoneNumber": phone_number,
        "CallBackURL": BASE_URL + "/mpesa/callback",
        "AccountReference": f"ticket_{ticket_id}",
        "TransactionDesc": f"Payment for ticket {ticket_id}"
    }

    headers = {"Authorization": f"Bearer {access_token}"}
    response = requests.post("https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
                             json=payload, headers=headers)
    resp_data = response.json()

    checkout_request_id = resp_data.get("CheckoutRequestID")
    if checkout_request_id:
        payment.transaction_id = checkout_request_id
        db.session.commit()

    return jsonify(resp_data), response.status_code

@app.route('/mpesa/callback', methods=['POST'])
def mpesa_callback():
    data = request.get_json()
    with open("mpesa_callback.log", "a") as log_file:
        log_file.write(json.dumps(data, indent=4) + "\n\n")

    try:
        stk_callback = data['Body']['stkCallback']
        result_code = stk_callback.get('ResultCode')
        result_desc = stk_callback.get('ResultDesc')
        checkout_request_id = stk_callback.get('CheckoutRequestID')

        payment = Payment.query.filter_by(transaction_id=checkout_request_id).first()

        if result_code == 0 and payment:
            callback_metadata = stk_callback.get('CallbackMetadata', {}).get('Item', [])
            # Extract values from the callback metadata
            amount = next((item.get('Value') for item in callback_metadata if item.get('Name') == 'Amount'), None)
            mpesa_receipt_number = next((item.get('Value') for item in callback_metadata if item.get('Name') == 'MpesaReceiptNumber'), None)
            phone_number = next((item.get('Value') for item in callback_metadata if item.get('Name') == 'PhoneNumber'), None)

            # Update Payment record to 'paid'
            payment.status = 'paid'
            db.session.commit()

            # Update the corresponding Ticket status to 'paid'
            ticket = Ticket.query.get(payment.ticket_id)
            if ticket:
                ticket.status = 'paid'
                db.session.commit()

            return jsonify({
                "status": "success",
                "amount": amount,
                "receipt": mpesa_receipt_number,
                "phone": phone_number,
                "message": "Payment received successfully"
            }), 200
        else:
            if payment:
                payment.status = 'failed'
                db.session.commit()
            return jsonify({"status": "failed", "message": result_desc}), 400

    except Exception as e:
        return jsonify({"status": "error", "message": "Invalid callback data", "error": str(e)}), 400


if __name__ == "__main__":
    app.run(debug=True)
