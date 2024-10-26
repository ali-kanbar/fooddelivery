import React, { useContext, useEffect, useState } from "react";
import "./LoginPopup.css";
import xIcon from "./../../assets/cross_icon.png"; // Assuming you have the X icon in your assets folder
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

const LoginPopup = ({ closePopup }) => {
  const [registerOrLogin, setRegisterOrLogin] = useState("login");
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const { url, setToken } = useContext(StoreContext);
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onRegisterLogin = async (event) => {
    event.preventDefault();
    const loginData = {
      name:`${data.firstName} ${data.lastName}`,
      email:data.email,
      password:data.password
    }
    let newURl = url
    if (registerOrLogin==="login") {
      newURl += "/api/user/login"
    } else {
      newURl += "/api/user/register"
    }
    const response = await axios.post(newURl,loginData);
    if (response.data.success) {
      setToken(response.data.token)
      localStorage.setItem('token', response.data.token)
      closePopup()
    } else {
      alert(response.data.message)
    }

  }

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
            <form className="login-form" onSubmit={onRegisterLogin}>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                name="email"
                onChange={onChangeHandler}
                value={data.email}
                required
              />
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                name="password"
                onChange={onChangeHandler}
                value={data.password}
                required
              />
              <button type="submit">Login</button>
              <p>
                Create an Account ?{" "}
                <span onClick={() => setRegisterOrLogin("register")}>
                  Click Here
                </span>
              </p>
            </form>
          </div>
        ) : (
          <div>
            <h2>Sign Up</h2>
            <form className="register-form" onSubmit={onRegisterLogin}>
              <div className="register-name">
                <label>First Name:</label>
                <input
                  type="text"
                  name="firstName"
                  onChange={onChangeHandler}
                  value={data.firstName}
                  required
                />
                <label>Last Name:</label>
                <input
                  type="text"
                  name="lastName"
                  onChange={onChangeHandler}
                  value={data.lastName}
                  required
                />
              </div>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                name="email"
                onChange={onChangeHandler}
                value={data.email}
                required
              />
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                name="password"
                onChange={onChangeHandler}
                value={data.password}
                required
              />
              <button type="submit">Register</button>
              <p>
                Already Have an Account ?{" "}
                <span onClick={() => setRegisterOrLogin("login")}>
                  Click Here
                </span>
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPopup;
