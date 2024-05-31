# -*- coding: utf-8 -*-
"""User models."""
import datetime as dt

from flask_bcrypt import Bcrypt
from sqlalchemy.ext.hybrid import hybrid_property

from flaskapp.database import db

bcrypt = Bcrypt()

class User(db.Model):
    """A user of the app."""

    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column("password", db.LargeBinary(128), nullable=True)
    created_at = db.Column(db.DateTime, nullable=False, default=dt.datetime.now(dt.timezone.utc))

    @hybrid_property
    def password(self):
        """Hashed password."""
        return self._password

    @password.setter
    def password(self, value):
        """Set password."""
        self._password = bcrypt.generate_password_hash(value)

    def check_password(self, value):
        """Check password."""
        return bcrypt.check_password_hash(self._password, value)

    @property
    def __repr__(self):
        """Represent instance as a unique string."""
        return f"<User({self.username!r})>"
