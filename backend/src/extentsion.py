from flask_jwt_extended import JWTManager
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_socketio import SocketIO

db = SQLAlchemy()
socketIO = SocketIO()
jwt = JWTManager()
ma = Marshmallow()
