# -*- coding: utf-8 -*-
"""User views."""
from flask import Blueprint, render_template, request, jsonify
from flask_login import login_required
from .models import User, db

blueprint = Blueprint("user", __name__, url_prefix="/users", static_folder="../static")

@blueprint.route("/")
@login_required
def view_user():
    """List members."""
    users = User.query.all()
    users_json = [{ 'id':user.id, 'username': user.username, 'password': user.password, 'email': user.email} for user in users]
    return jsonify(users_json)

@blueprint.route('/add_user', methods=['POST'], strict_slashes=False)
def add_user():
    data = request.json
    username = data.get('title')
    password = data.get('author')
    email = data.get('email')
    new_user = User(username=username, password=password, email=email)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'User added successfully'}), 201
    



