import os
from flask import Flask
from dotenv import load_dotenv
from flask_restful import Resource, Api, reqparse
import json
from datetime import datetime
from extensions import bcrypt, jwt, cors, migrate, db
from routes import routes
from models import User, Event, Ticket, Payment

# Load environment variables from .env file
load_dotenv()

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATABASE = os.getenv("DATABASE_URL", f"sqlite:///{os.path.join(BASE_DIR, 'app.db')}")
SECRET_KEY = os.getenv("SECRET_KEY", "your-default-secret-key")
# Create an instance of the Flask application
app = Flask(__name__)

# Configure the app
app.config["SQLALCHEMY_DATABASE_URI"] = DATABASE
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

if __name__ == "__main__":
    app.run(debug=True)