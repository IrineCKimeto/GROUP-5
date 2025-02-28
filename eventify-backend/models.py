from datetime import datetime
import uuid
from extensions import db

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    role = db.Column(db.String(200), nullable=False, default="user")

    def __repr__(self):
        return f"User('{self.name}', '{self.email}')"

class Event(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=False)
    date = db.Column(db.Date, nullable=False)
    location = db.Column(db.String(255), nullable=False)
    category = db.Column(db.String(255), nullable=False) 
    featured = db.Column(db.Boolean, default=False)
    ticket_price = db.Column(db.Float, nullable=False)
    available_tickets = db.Column(db.Integer, nullable=False)
    image = db.Column(db.String(255), nullable=True)

    def __repr__(self):
        return f"Event('{self.title}', '{self.date}')"

class Ticket(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    event_id = db.Column(db.Integer, db.ForeignKey("event.id"), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    purchase_date = db.Column(db.DateTime, default=datetime.now)
    status = db.Column(db.String(20), default="confirmed")

    def __repr__(self):
        return f"Ticket('{self.event_id}', '{self.user_id}')"

class Payment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    ticket_id = db.Column(db.Integer, db.ForeignKey("ticket.id"), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    status = db.Column(db.String(50), default="pending")
    transaction_id = db.Column(db.String(30), unique=True, nullable=False, default=lambda: str(uuid.uuid4()))

    def __repr__(self):
        return f"Payment('{self.user_id}', '{self.ticket_id}')"