from flask import request, jsonify
from http import HTTPStatus
from src.models import *
from src.extentsion import db
from datetime import datetime
from src.ma_schemas import UserSchema, FoodSchema, RestaurantSchema, PriceSchema

user_schema = UserSchema(many=True)
food_schema = FoodSchema(many=True)
restaurant_schema = RestaurantSchema(many=True)
price_schema = PriceSchema(many=True)


# Them nguoi dung
def add_user_view():
    session = db.session()

    try:
        # Thêm 
        user_name = request.get_json()['name']
        user_email = request.get_json()['email']
        session.add(user(user_name,user_email))
        
        return 1
    
    except Exception as e:
        session.rollback()

        return jsonify({
            "message": "Lỗi server !", 
            "error": f"{e}"
        }), HTTPStatus.BAD_REQUEST
        
    finally:
        session.commit()
        session.close()

# Xem danh sach nguoi dung
def view_user_data():
    session = db.session()

    try:
        # Lấy data
        users = user.query.with_entities(
            user.user_name, 
            user.user_email,
        ).all()

        return user_schema.dump(users), HTTPStatus.OK
    
    except Exception as e:
        session.rollback()

        return jsonify({
            "message": "Lỗi server !", 
            "error": f"{e}"
        }), HTTPStatus.BAD_REQUEST
        
    finally:
        session.commit()
        session.close()


# Them mon an 
def add_food_view():
    session = db.session()

    try:
        # Thêm    
        food_name = request.get_json()['name']
        food_detail = request.get_json()['detail']
        session.add(food(food_name,food_detail))

        return 1
    
    except Exception as e:
        session.rollback()

        return jsonify({
            "message": "Lỗi server !", 
            "error": f"{e}"
        }), HTTPStatus.BAD_REQUEST
        
    finally:
        session.commit()
        session.close()

# Them mon an (kem theo nha hang va gia_Check xem nha hang day da co chua_Neu chua co thi them vao tb.restuarant)
def add_food_view_v2():
    session = db.session()
    try:
        # Thêm
        food_name = request.get_json()['Foodname']
        food_detail = request.get_json()['Fooddetail']
        restaurant_name = request.get_json()['Restaurantname']
        restaurant_local = request.get_json()['Restaurantlocal']
        restaurant_time_open_str = request.get_json()['OperationTimeOpen']
        restaurant_time_open = datetime.strptime(restaurant_time_open_str, '%H:%M').time()
        restaurant_time_close_str = request.get_json()['OperationTimeClose']
        restaurant_time_close = datetime.strptime(restaurant_time_close_str, '%H:%M').time()
        price = request.get_json()['Price']

        restaurant_item = session.query(restaurant).filter(restaurant.restaurant_name == restaurant_name).first()
        
        if not restaurant_item:
            session.add(restaurant(restaurant_name,restaurant_local,restaurant_time_open,restaurant_time_close))
            restaurant_item = session.query(restaurant).filter(restaurant.restaurant_name == restaurant_name).first()
        
        #food_detail đang đi theo detail, db đúng (food_detail của restaurant là các thuộc tính khác nhau không phụ thuộc vào food hay restaurant)
        if food_name != food.food_name:
            session.add(food(food_name,food_detail))

        food_item = session.query(food).filter_by(food_name=food_name).first()

        new_ticket = ticket(
            food_id=food_item.food_id,
            restaurant_id=restaurant_item.restaurant_id,
            ticket_price=price
        )

        session.add(new_ticket)

        return jsonify({"message": "Thêm gia mới thành công!"}), HTTPStatus.CREATED
    
    except Exception as e:
        session.rollback()

        return jsonify({
            "message": "Lỗi server !", 
            "error": f"{e}"
        }), HTTPStatus.BAD_REQUEST
        
    finally:
        session.commit()
        session.close()    

# Xem mon an
def view_food_data():
    session = db.session()

    try:
        # Lấy data
        foods = food.query.with_entities(
            food.food_id,
            food.food_name, 
            food.food_detail,
        ).all()

        return food_schema.dump(foods), HTTPStatus.OK 
    
    except Exception as e:
        session.rollback()

        return jsonify({
            "message": "Lỗi server !", 
            "error": f"{e}"
        }), HTTPStatus.BAD_REQUEST
        
    finally:
        session.commit()
        session.close()


# Them nha hang
def add_restaurant_view():
    session = db.session()

    try:
        # Thêm        
        restaurant_name = request.get_json()['name']
        restaurant_local = request.get_json()['local']
        restaurant_time_str = request.get_json()['time']
        restaurant_time = datetime.strptime(restaurant_time_str, '%Y-%m-%d %H:%M:%S')
        session.add(restaurant(restaurant_name, restaurant_local,restaurant_time)) 

        return 1
    
    except Exception as e:
        session.rollback()

        return jsonify({
            "message": "Lỗi server !", 
            "error": f"{e}"
        }), HTTPStatus.BAD_REQUEST
        
    finally:
        session.commit()
        session.close()

# Xem nha hang
def view_restaurant_data():
    session = db.session()

    try:
        # Lấy data
        restaurants = restaurant.query.with_entities(
            restaurant.restaurant_name, 
            restaurant.restaurant_local,
            restaurant.restaurant_time_open,
            restaurant.restaurant_time_close,
        ).all()
        return restaurant_schema.dump(restaurants), HTTPStatus.OK  
    
    except Exception as e:
        session.rollback()

        return jsonify({
            "message": "Lỗi server !", 
            "error": f"{e}"
        }), HTTPStatus.BAD_REQUEST
        
    finally:
        session.commit()
        session.close()


# Them gia
def add_price_view():
    session = db.session()

    try:
        food_name = request.get_json()['FoodName']
        restaurant_name = request.get_json()['RestaurantName']
        ticket_price = request.get_json()['price']

        food_item = session.query(food).filter_by(food_name=food_name).first()
        restaurant_item = session.query(restaurant).filter_by(restaurant_name=restaurant_name).first()

        if not food_item:
            return jsonify({"message": f"Món ăn '{food_name}' không tồn tại!"}), HTTPStatus.BAD_REQUEST

        if not restaurant_item:
            return jsonify({"message": f"Nhà hàng '{restaurant_name}' không tồn tại!"}), HTTPStatus.BAD_REQUEST
        
        new_ticket = ticket(
            food_id=food_item.food_id,
            restaurant_id=restaurant_item.restaurant_id,
            ticket_price=ticket_price
        )
        
        session.add(new_ticket)

        return jsonify({"message": "Thêm gia mới thành công!"}), HTTPStatus.CREATED
    
    except Exception as e:
        session.rollback()

        return jsonify({
            "message": "Lỗi server !", 
            "error": f"{e}"
        }), HTTPStatus.BAD_REQUEST
        
    finally:
        session.commit()
        session.close()

# Xem gia
def view_price_data():
    session = db.session()

    try:
        # Lấy data 
        prices = session.query(
            ticket.ticket_id,
            food.food_name,
            restaurant.restaurant_name,
            ticket.ticket_price,
            food.food_detail
        ).join(
            food, food.food_id == ticket.food_id
        ).join(
            restaurant, restaurant.restaurant_id == ticket.restaurant_id
        ).all()

        # Tuần tự hóa dữ liệu
        result = [
            {   
                "ticket_id":price.ticket_id,
                "food_name": price.food_name,
                "restaurant_name": price.restaurant_name,
                "ticket_price": price.ticket_price,
                "food_detail":price.food_detail,
            } for price in prices
        ]

        return jsonify(result), HTTPStatus.OK
    
    except Exception as e:
        session.rollback()

        return jsonify({
            "message": "Lỗi server !", 
            "error": f"{e}"
        }), HTTPStatus.BAD_REQUEST
        
    finally:
        session.commit()
        session.close()


# Xoa mon an
def delete_food_data():
    session = db.session()

    try:
        food_name = request.get_json()['name']
        restaurant_name = request.get_json()['restaurantname']

        food_item = session.query(food).filter(food.food_name == food_name).first()
        restaurant_item = session.query(restaurant).filter(restaurant.restaurant_name == restaurant_name).first()

        if not food_item:
            return jsonify({
                "message": f"Món ăn '{food_name}' không tồn tại!"
            }), HTTPStatus.NOT_FOUND
    
        food_id = food_item.food_id
        restaurant_id = restaurant_item.restaurant_id
        
        session.query(ticket).filter(ticket.food_id == food_id, ticket.restaurant_id == restaurant_id).delete()
            
        # session.query(food).filter(food.food_id == food_id).delete()
        
        return jsonify({
            "message": f"Đã xóa món ăn '{food_name}' thành công!"
        }), HTTPStatus.OK
        
    except Exception as e:
        session.rollback()

        return jsonify({
            "message": "Lỗi server !", 
            "error": f"{e}"
        }), HTTPStatus.BAD_REQUEST
        
    finally:
        session.commit()
        session.close()


# Sửa món ăn
def update_food_data():
    session = db.session()

    try:
        old_food_name = request.get_json().get('oldName', None)
        new_food_name = request.get_json().get('newName', None)
        new_food_price = request.get_json().get('newPrice', None)
        new_food_detail = request.get_json().get('newDetail', None)

        food_item = session.query(food).filter_by(food_name=old_food_name).first()

        if not food_item:
            return jsonify({"message": f"Món ăn {old_food_name} không tồn tại!"}), HTTPStatus.NOT_FOUND

        if new_food_name:
            food_item.food_name = new_food_name
        if new_food_price:
            food_item.ticket_price = new_food_price
        if new_food_detail:
            food_item.food_detail = new_food_detail
        
        return jsonify({"message": "Cập nhật món ăn thành công!"}), HTTPStatus.OK
    
    except Exception as e:
        session.rollback()
        return jsonify({
            "message": "Lỗi server!", 
            "error": str(e)
        }), HTTPStatus.BAD_REQUEST
        
    finally:
        session.commit()
        session.close()


# Xoa nha hang
def delete_restaurant_data():
    session = db.session()

    try:
        restaurant_name = request.get_json()['restaurantname']

        restaurant_item = session.query(restaurant).filter(restaurant.restaurant_name == restaurant_name).first()

        restaurant_id = restaurant_item.restaurant_id
        
        session.query(ticket).filter(ticket.restaurant_id == restaurant_id).delete()
            
        session.query(restaurant).filter(restaurant.restaurant_id == restaurant_id).delete()
        
        return jsonify({
            "message": f"Đã xóa món ăn '{restaurant_name}' thành công!"
        }), HTTPStatus.OK
        
    except Exception as e:
        session.rollback()

        return jsonify({
            "message": "Lỗi server !", 
            "error": f"{e}"
        }), HTTPStatus.BAD_REQUEST
        
    finally:
        session.commit()
        session.close()