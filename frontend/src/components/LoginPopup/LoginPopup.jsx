import React, { useState } from "react";
import "./LoginPopup.css";
import xIcon from "./../../assets/cross_icon.png"; // Assuming you have the X icon in your assets folder

const LoginPopup = ({ closePopup }) => {
  const [registerOrLogin, setRegisterOrLogin] = useState("login");

  return (
    <div className="register-login-popup-overlay">
      <div className="register-login-popup-content">
        <img
          src={xIcon}
          alt="Close"
          className="close-icon"
          onClick={closePopup}
        />

        {registerOrLogin === "login" ? (
          <div>
            <h2>Sign in</h2>
            <form className="login-form">
              <label htmlFor="email">Email:</label>
              <input type="email" required />
              <label htmlFor="password">Password:</label>
              <input type="password" required />
              <button type="submit">Login</button>
              <p>Create an Account ? <span onClick={() => setRegisterOrLogin("register")}>Click Here</span></p>

            </form>
          </div>
        ) : (
          <div>
            <h2>Sign Up</h2>
            <form className="register-form">
              <div className="register-name">
                <label>First Name:</label>
                <input type="text" required />
                <label>Last Name:</label>
                <input type="text" required />
              </div>
              <label htmlFor="email">Email:</label>
              <input type="email" required />
              <label htmlFor="password">Password:</label>
              <input type="password" required />
              <button type="submit">Register</button>
              <p>Already Have an Account ? <span onClick={() => setRegisterOrLogin("login")}>Click Here</span></p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPopup;
