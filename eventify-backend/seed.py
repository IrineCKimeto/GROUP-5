
#!/usr/bin/env python3

from app import app
from models import db, User, Event

with app.app_context():
    
    Event.query.delete()
    User.query.delete()

    
    users = [
        User(name="Admin User", email="admin@example.com", password="admin123", role="admin"),
        User(name="Regular User", email="user@example.com", password="user123", role="user")
    ]

    # Seed events
    events = [
        {
            "title": "Music Concert",
            "description": "A great music concert featuring top Kenyan artists including Sauti Sol and Nyashinski.",
            "date": "2025-03-15",
            "location": "KICC, Nairobi",
            "category": "Music",
            "featured": True,
            "ticket_price": 2500,
            "available_tickets": 50,
            "image": "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        },
        {
            "title": "Tech Conference 2025",
            "description": "Annual tech conference showcasing the latest innovations in AI, blockchain, and cloud computing.",
            "date": "2025-04-20",
            "location": "Sarit Centre, Nairobi",
            "category": "Technology",
            "featured": False,
            "ticket_price": 3000,
            "available_tickets": 50,
            "image": "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        },
        {
            "title": "Food & Wine Festival",
            "description": "Experience the best of Kenyan cuisine and international wines.",
            "date": "2025-05-10",
            "location": "Carnivore Gardens, Nairobi",
            "category": "Food & Drinks",
            "featured": True,
            "ticket_price": 4000,
            "available_tickets": 50,
            "image": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        },
        {
            "title": "Art Exhibition",
            "description": "Showcasing contemporary African art from emerging artists.",
            "date": "2025-06-01",
            "location": "National Museums of Kenya, Nairobi",
            "category": "Art & Culture",
            "featured": False,
            "ticket_price": 1500,
            "available_tickets": 50,
            "image": "https://images.unsplash.com/photo-1580136579312-94651dfd596d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        },
        {
            "title": "Marathon for Charity",
            "description": "Annual marathon supporting education initiatives in Kenya.",
            "date": "2025-07-15",
            "location": "Ngong Road, Nairobi",
            "category": "Sports",
            "featured": True,
            "ticket_price": 2000,
            "available_tickets": 50,
            "image": "https://images.unsplash.com/photo-1530549387789-4c1017266635?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        },
        {
            "title": "Business Summit",
            "description": "Connecting entrepreneurs and investors in East Africa.",
            "date": "2025-08-20",
            "location": "Radisson Blu, Nairobi",
            "category": "Business",
            "featured": False,
            "ticket_price": 5000,
            "available_tickets": 50,
            "image": "https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        }
    ]

    db.session.add_all(users)
    db.session.add_all([Event(**event) for event in events])
    db.session.commit()

    print("Seeding done!")
