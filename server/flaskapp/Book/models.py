from flaskapp.database import db

class Book(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100))
    author = db.Column(db.String(100))

    def to_json(self):
        return {
        'id': self.id,
        'title': self.title,
        'author': self.author
    }