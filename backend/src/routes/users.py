from flask import Blueprint
from src.views.users import *

users_route = Blueprint("user", __name__)

@users_route.route("/add_user", methods=["POST"])
def add_user():
    return add_user_view()

@users_route.route("/view_user", methods=["GET"])
def view_user():
    return view_user_data()

@users_route.route("/add_food", methods=["POST"])
def add_food():
    return add_food_view()

@users_route.route("/view_food", methods=["GET"])
def view_food():
    return view_food_data()

@users_route.route("/add_restaurant", methods=["POST"])
def add_restaurant():
    return add_restaurant_view()

@users_route.route("/view_restaurant", methods=["GET"])
def view_restaurant():
    return view_restaurant_data()

@users_route.route("/add_price", methods=["POST"])
def add_price():
    return add_price_view()

@users_route.route("/view_price", methods=["GET"])
def view_price():
    return view_price_data()

@users_route.route("/delete_food", methods=["POST"])
def delete_food():
    return delete_food_data()

@users_route.route("/add_food_v2", methods=["POST"])
def add_food_v2():
    return add_food_view_v2()

@users_route.route("/update_food", methods=["POST"])
def update_food():
    return update_food_data()

