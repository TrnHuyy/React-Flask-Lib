from flask import Flask, request
from flask_cors import CORS
import os
import sys
sys.path.insert(0, 'd:/test/server')
from flaskapp.database import db, migrate
from flaskapp.Book.views import blueprint as book_blueprint

def create_app(config_name=None):
    app = Flask(__name__)

    #app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///data.db"
    app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get('DATABASE_URL')
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.init_app(app)
    migrate.init_app(app, db)

    register_blueprint(app)
    CORS(app)

    with app.app_context():
        db.create_all()
    
    return app


def register_blueprint(app):
    app.register_blueprint(book_blueprint)
    return None
