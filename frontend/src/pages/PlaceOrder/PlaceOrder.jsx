import React from 'react'
import './PlaceOrder.css'
import CartTotal from "../../components/CartTotal/CartTotal";

const PlaceOrder = () => {
  return (
    <div className='place-order'>
      <div className="place-order-left">
        <h2>Delivery Information</h2>
        <br />
        <form action="/submit" className="place-order-form">
          <div className="place-order-form-name">
            <input type="text" placeholder='First name'/>
            <input type="text" placeholder='Last name'/>
          </div>
          <input type="email" placeholder='Email addres'/>
          <input type="text" placeholder='Street'/>
          <div className="place-order-form-address">
            <input type="text" placeholder='City'/>
            <input type="text" placeholder='State'/>
            <input type="text" placeholder='Zip Code'/>
            <input type="text" placeholder='Country'/>
          </div>
          <input type="tel" placeholder='Phone'/>
        </form>
      </div>
      <div className="place-order-right">
        <CartTotal />
      </div>
    </div>
  )
}

export default PlaceOrder
