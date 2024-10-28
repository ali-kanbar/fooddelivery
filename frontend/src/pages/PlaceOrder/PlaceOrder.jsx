import React, { useContext, useState, useEffect } from "react";
import "./PlaceOrder.css";
import CartTotal from "../../components/CartTotal/CartTotal";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { useNavigate } from "react-router-dom"

const PlaceOrder = () => {
  const { token, food_list, cartItems, url, getTotalCartAmount } = useContext(StoreContext);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
    };

    let response = await axios.post(url + "/api/order/place", orderData, {
      headers: { token },
    });
    if (response.data.success) {
      const { session_url } = response.data;
      window.location.replace(session_url);
    } else {
      alert("Error");
    }
  };

  const navigate = useNavigate()
  useEffect(()=>{
    if (!token) {
      navigate("/cart")
    } else if (getTotalCartAmount()===0) {
      navigate("/cart")
    }
  },[token])
  return (
    <div className="place-order">
      <form className="place-order-form" onSubmit={placeOrder}>
        <div className="place-order-left">
          <h2>Delivery Information</h2>
          <br />
          <div className="place-order-form-name">
            <input
              type="text"
              name="firstName"
              placeholder="First name"
              onChange={onChangeHandler}
              value={data.firstName}
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last name"
              onChange={onChangeHandler}
              value={data.lastName}
              required
            />
          </div>
          <input
            type="email"
            name="email"
            placeholder="Email address"
            onChange={onChangeHandler}
            value={data.email}
            required
          />
          <input
            type="text"
            name="street"
            placeholder="Street"
            onChange={onChangeHandler}
            value={data.street}
            required
          />
          <div className="place-order-form-address">
            <input
              type="text"
              name="city"
              placeholder="City"
              onChange={onChangeHandler}
              value={data.city}
              required
            />
            <input
              type="text"
              name="state"
              placeholder="State"
              onChange={onChangeHandler}
              value={data.state}
              required
            />
            <input
              type="text"
              name="zipcode"
              placeholder="Zip Code"
              onChange={onChangeHandler}
              value={data.zipcode}
              required
            />
            <input
              type="text"
              name="country"
              placeholder="Country"
              onChange={onChangeHandler}
              value={data.country}
              required
            />
          </div>
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            onChange={onChangeHandler}
            value={data.phone}
            required
          />
        </div>
        <div className="place-order-right">
          <CartTotal />
        </div>
      </form>
    </div>
  );
};

export default PlaceOrder;
