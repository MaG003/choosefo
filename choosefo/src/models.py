from .extentsion import db
from sqlalchemy import Column, ForeignKey
from sqlalchemy.dialects.mysql import INTEGER, NVARCHAR, CHAR, DATETIME

# User
class user(db.Model):
    __tablename__ = "user"

    user_id = Column(INTEGER, primary_key=True)
    user_name = Column(NVARCHAR(255))
    user_email = Column(NVARCHAR(255))

    # Hàm khởi tại
    def __init__(self, user_name, user_email):
        self.user_name = user_name
        self.user_email = user_email

# Food
class food(db.Model):
    __tablename__ = "food"

    food_id = Column(INTEGER, primary_key=True)
    food_name = Column(NVARCHAR(255))
    food_detail = Column(NVARCHAR(255))

    # Hàm khởi tại
    def __init__(self, food_name, food_detail):
        self.food_name = food_name
        self.food_detail = food_detail

# Restaurant
class restaurant(db.Model):
    __tablename__ = "restaurant"

    restaurant_id = Column(INTEGER, primary_key=True)
    restaurant_name = Column(NVARCHAR(255))
    restaurant_local = Column(NVARCHAR(255))
    restaurant_time = Column(DATETIME)

    # Hàm khởi tại
    def __init__(self, restaurant_name, restaurant_local, restaurant_time):
        self.restaurant_name = restaurant_name
        self.restaurant_local = restaurant_local
        self.restaurant_time = restaurant_time

    
# Ticket
class ticket(db.Model):
    __tablename__ = "ticket"

    ticket_id = Column(INTEGER, primary_key=True)
    food_id = Column(INTEGER, ForeignKey(food.food_id))
    restaurant_id = Column(INTEGER, ForeignKey(restaurant.restaurant_id))
    ticket_price = Column(NVARCHAR(255))

    # Hàm khởi tại
    def __init__(self, food_id, restaurant_id, ticket_price):
        self.food_id = food_id
        self.restaurant_id = restaurant_id
        self.ticket_price = ticket_price

# Bill
class bill(db.Model):
    __tablename__ = "bill"

    bill_id = Column(INTEGER, primary_key=True)
    user_id = Column(INTEGER, ForeignKey(user.user_id))
    ticket_id = Column(INTEGER, ForeignKey(ticket.ticket_id))

    # Hàm khởi tại
    def __init__(self, user_id, ticket_id):
        self.user_id = user_id
        self.ticket_id = ticket_id