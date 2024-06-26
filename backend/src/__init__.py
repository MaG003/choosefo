from flask import Flask
from flask_cors import CORS
from .extentsion import *
from .constant.config import APP_CONFIG

# routes
from .routes.users import users_route

def create_app():
    app = Flask(__name__)
    app.config.from_object(APP_CONFIG)
    socketIO.init_app(app, cors_allowed_origins="*")
    jwt.init_app(app)
    db.init_app(app)
    CORS(app)

    with app.app_context():
        db.create_all()

    # routes
    app.register_blueprint(users_route)

    return app