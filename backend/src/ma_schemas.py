from .extentsion import ma

class UserSchema(ma.Schema):
    class Meta:
        fields = ("user_id", "user_name", "user_email")

class FoodSchema(ma.Schema):
    class Meta:
        fields = ("food_id", "food_name", "food_detail")

class RestaurantSchema(ma.Schema):
    class Meta:
        fields = ("restaurant_id", "restaurant_name", "restaurant_local", "restaurant_time")

class PriceSchema(ma.Schema):
    class Meta:
        fields = ("food_name", "restaurant_name","ticket_price","food_detail")  