import os
from flask import Flask
from dotenv import load_dotenv
from extensions import bcrypt, jwt, cors, migrate, db
from routes import routes

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

# Register blueprints
app.register_blueprint(routes)

if __name__ == "__main__":
    app.run(debug=True)