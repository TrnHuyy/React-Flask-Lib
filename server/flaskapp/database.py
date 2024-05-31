from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

# Không cần khởi tạo db và migrate ở đây nữa
db = SQLAlchemy()
migrate = Migrate()