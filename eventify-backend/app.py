import os
from flask import Flask, request, jsonify
from dotenv import load_dotenv
from flask_restful import Resource, Api, reqparse
import json
from datetime import datetime
import base64
import requests
from requests.auth import HTTPBasicAuth
from extensions import bcrypt, jwt, cors, migrate, db
from routes import routes
from models import User, Event, Ticket, Payment

# Load environment variables from .env file
load_dotenv()

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATABASE = os.getenv("DATABASE_URL", f"sqlite:///{os.path.join(BASE_DIR, 'app.db')}")
SECRET_KEY = os.getenv("SECRET_KEY", "your-default-secret-key")
CONSUMER_KEY = os.getenv("CONSUMER_KEY", "default-consumer-key")
CONSUMER_SECRET = os.getenv("CONSUMER_SECRET", "default-consumer-secret")
BASE_URL = os.getenv("BASE_URL", "")
shortcode = os.getenv("SHORTCODE", "default-shortcode")
passkey = os.getenv("PASSKEY")

# Create an instance of the Flask application
app = Flask(__name__)

# Configure the app
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

# Register blueprints
app.register_blueprint(routes)

# Function to obtain M-Pesa access token
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

# Define RESTful API endpoints
user_parser = reqparse.RequestParser()
user_parser.add_argument('name', required=True)
user_parser.add_argument('email', required=True)
user_parser.add_argument('password', required=True)
user_parser.add_argument('role', default='user')

class UserListResource(Resource):
    def get(self):
        users = User.query.all()
        return [{'id': u.id, 'name': u.name, 'email': u.email, 'role': u.role} for u in users], 200

    def post(self):
        args = user_parser.parse_args()
        user = User(name=args['name'], email=args['email'], password=args['password'], role=args['role'])
        db.session.add(user)
        db.session.commit()
        return {'message': 'User created', 'id': user.id}, 201

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
            'available_tickets': e.available_tickets
        } for e in events], 200

class TicketListResource(Resource):
    def get(self):
        tickets = Ticket.query.all()
        return [{
            'id': t.id,
            'event_id': t.event_id,
            'user_id': t.user_id,
            'purchase_date': t.purchase_date.isoformat(),
            'status': t.status
        } for t in tickets], 200

class PaymentListResource(Resource):
    def get(self):
        payments = Payment.query.all()
        return [{
            'id': p.id,
            'user_id': p.user_id,
            'ticket_id': p.ticket_id,
            'amount': p.amount,
            'status': p.status,
            'transaction_id': p.transaction_id
        } for p in payments], 200

# Initialize RESTful API endpoints on the app instance
api = Api(app)
api.add_resource(UserListResource, '/api/users')
api.add_resource(EventListResource, '/api/events')
api.add_resource(TicketListResource, '/api/tickets')
api.add_resource(PaymentListResource, '/api/payments')

# M-Pesa STK Push
@app.route('/mpesa/stk-push', methods=['POST'])
def mpesa_stk_push():
    phone_number = request.json.get('phone_number')
    amount = request.json.get('amount')

    access_token = get_access_token()
    if not access_token:
        return jsonify({"message": "Failed to get M-Pesa access token"}), 500

    timestamp = get_timestamp()
    password = generate_password(shortcode, passkey, timestamp)

    payload = {
        "BusinessShortCode": "174379",
        "Password": password,
        "Timestamp": timestamp,
        "TransactionType": "CustomerPayBillOnline",
        "Amount": amount,
        "PartyA": phone_number,
        "PartyB": "174379",
        "PhoneNumber": phone_number,
        "CallBackURL": BASE_URL + "/mpesa/callback",
        "AccountReference": "TestPay",
        "TransactionDesc": "HelloTest"
    }

    headers = {"Authorization": f"Bearer {access_token}"}
    response = requests.post("https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest", json=payload, headers=headers)

    return response.json(), response.status_code

# M-Pesa Callback
@app.route('/mpesa/callback', methods=['POST'])
def mpesa_callback():
    data = request.get_json()
    with open("mpesa_callback.log", "a") as log_file:
        log_file.write(json.dumps(data, indent=4) + "\n\n")

    try:
        result_code = data['Body']['stkCallback']['ResultCode']
        result_desc = data['Body']['stkCallback']['ResultDesc']

        if result_code == 0:
            callback_metadata = data['Body']['stkCallback']['CallbackMetadata']['Item']
            amount = next(item['Value'] for item in callback_metadata if item['Name'] == 'Amount')
            mpesa_receipt_number = next(item['Value'] for item in callback_metadata if item['Name'] == 'MpesaReceiptNumber')
            phone_number = next(item['Value'] for item in callback_metadata if item['Name'] == 'PhoneNumber')

            return jsonify({
                "status": "success",
                "amount": amount,
                "receipt": mpesa_receipt_number,
                "phone": phone_number,
                "message": "Payment received successfully"
            }), 200
        else:
            return jsonify({"status": "failed", "message": result_desc}), 400

    except KeyError:
        return jsonify({"status": "error", "message": "Invalid callback data"}), 400

if __name__ == "__main__":
    app.run(debug=True)
