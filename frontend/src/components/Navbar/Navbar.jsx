import React, { useContext, useState } from "react";
import "./Navbar.css";
import { assets } from "./../../assets/assets";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

const Navbar = ({ setShowLoginPopup }) => {
  const [menu, setMenu] = useState("home");
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
    window.location.reload();
  };

  let totalAmount = getTotalCartAmount();
  const handleNavigation = (section, menuItem) => {
    setMenu(menuItem);
    if (pathname !== "/") {
      navigate("/"); // Navigate to the homepage if not already there
    }
    setTimeout(() => {
      document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="navbar">
      <Link to="/">
        <img src={assets.logo} alt="" className="logo" />
      </Link>
      <ul className="navbar-menu">
        <Link
          to="/"
          onClick={() => setMenu("home")}
          className={menu === "home" ? "active" : ""}
        >
          home
        </Link>
        <a
          onClick={() => handleNavigation("explore-menu", "menu")}
          className={menu === "menu" ? "active" : ""}
        >
          menu
        </a>
        <a
          onClick={() => handleNavigation("app-download", "mobile-app")}
          className={menu === "mobile-app" ? "active" : ""}
        >
          mobile-app
        </a>
        <a
          onClick={() => handleNavigation("footer", "contact-us")}
          className={menu === "contact-us" ? "active" : ""}
        >
          contact us
        </a>
      </ul>

      <div className="navbar-right">
        <div className="navbar-search-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="" />
          </Link>
          {totalAmount !== 0 ? <div className="dot"></div> : <></>}
        </div>
        {!token ? (
          <button
            onClick={() => {
              setShowLoginPopup(true);
            }}
          >
            {" "}
            sign in
          </button>
        ) : (
          <div className="navbar-profile">
            <img src={assets.profile_icon} alt="" />
            <ul className="navbar-profile-dropdown">
              <li onClick={() => navigate("/myorders")}>
                <img src={assets.bag_icon} alt="" />
                <p>Orders</p>
              </li>
              <hr />
              <li onClick={logout}>
                <img src={assets.logout_icon} alt="" />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
