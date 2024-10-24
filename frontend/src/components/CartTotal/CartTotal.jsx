import React, { useContext } from "react";
import "./CartTotal.css";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

const CartTotal = () => {
  const { getTotalCartAmount } = useContext(StoreContext);
  let totalAmount = getTotalCartAmount();
  const deliveryFee = 2 * (totalAmount > 1);
  const navigate = useNavigate();
  return (
    <div className="cart-total">
      <h2>Cart Total</h2>
      <div>
        <div className="cart-total-details">
          <p>Subtotal</p>
          <p>${totalAmount}</p>
        </div>
        <hr />
        <div className="cart-total-details">
          <p>Delivery Fee</p>
          <p>${deliveryFee}</p>
        </div>
        <hr />
        <div className="cart-total-details">
          <p>Total</p>
          <p>${totalAmount + deliveryFee}</p>
        </div>
      </div>
      <button onClick={() => navigate("/order")}>PROCCED TO CKECKOUT</button>
    </div>
  );
};

export default CartTotal;
