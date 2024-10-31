import React, { useContext , useState} from "react";
import "./FoodItem.css";
import { assets } from "../assets/assets";
import { StoreContext } from "../context/StoreContext";
import {useNavigate} from 'react-router-dom'
import StarRating from "../components/StarRating/StarRating";

const FoodItem = ({ id, name, price, description, image, ingredients, rating, reviewsCount, setShowLoginPopup }) => {
  const { cartItems, addToCart, removeFromCart, url, token } = useContext(StoreContext);
  const navigate = useNavigate()

  const handleSetFood = () => {
    navigate("/foodpage/",{state:{ id, name, price, description, image, ingredients, rating , reviewsCount}})
  }
  return (
    <div className="food-item" >
      <div className="food-item-img-container">
        <img className="food-item-image" src={url+"/images/"+image} alt="" onClick={()=>handleSetFood()}/>
        {!cartItems[id] ? (
          <img
            className="add"
            onClick={() => token? addToCart(id) : setShowLoginPopup(true)}
            src={assets.add_icon_white}
            alt=""
          />
        ) : (
          <div className="food-item-counter">
            <img
              onClick={() => removeFromCart(id)}
              src={assets.remove_icon_red}
              alt=""
            />
            <p>{cartItems[id]}</p>
            <img
              onClick={() => addToCart(id)}
              src={assets.add_icon_green}
              alt=""
            />
          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <StarRating rating={rating}/>
        </div>
        <p className="food-item-description">{description}</p>
        <p className="food-item-price">${price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
