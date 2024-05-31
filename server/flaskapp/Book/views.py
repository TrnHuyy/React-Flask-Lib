from flask import Blueprint, request, jsonify
from flaskapp.database import db
from .models import Book

blueprint = Blueprint("book", __name__, url_prefix="/books", static_folder="../static")

@blueprint.route("/", methods=['GET'] ,strict_slashes=False)
def get_all_book():
    books = Book.query.all()
    books_json = [{ 'id':book.id, 'title': book.title, 'author': book.author} for book in books]
    return jsonify(books_json)
    

@blueprint.route('/add_book', methods=['POST'], strict_slashes=False)
def add_book():
    data = request.json
    title = data.get('title')
    author = data.get('author')
    new_book = Book(title=title, author=author)
    db.session.add(new_book)
    db.session.commit()
    return jsonify({'message': 'Book added successfully'}), 201

@blueprint.route('/delete/<int:id>', methods=['POST'], strict_slashes=False)
def delete_book(id):
    book = Book.query.get_or_404(id)
    #book = db.session.get_or_404(Book, id)
    db.session.delete(book)
    db.session.commit()
    return jsonify({'message': 'Book deleted successfully'}), 201

@blueprint.route('/update/<int:id>', methods=['POST'], strict_slashes=False)
def update_book(id):
    data = request.json
    new_title = data.get('title')
    new_author = data.get('author')
    book = Book.query.get_or_404(id)
    #book = db.session.get_or_404(Book, id)
    if new_title:
        book.title = new_title
    if new_author:
        book.author = new_author
    db.session.commit()
    return jsonify({'message': 'Book deleted successfully'}), 201
