import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar.jsx";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Footer from "./components/Footer/Footer";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import Verify from "./pages/Verify/Verify.jsx";
import MyOrders from "./pages/MyOrders/MyOrders.jsx";
import FoodPage from "./pages/FoodPage/FoodPage.jsx";

const App = () => {

  const [showLoginPopup,setShowLoginPopup] = useState(false)
  
  return (
    <>
      <div className="app" style={{ filter: showLoginPopup ? "blur(5px)" : "none" }}>
        <Navbar setShowLoginPopup={setShowLoginPopup}/>
        <Routes>
          <Route path="/" element={<Home setShowLoginPopup={setShowLoginPopup}/>} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/myorders" element={<MyOrders />} />
          <Route path="/foodpage" element={<FoodPage setShowLoginPopup={setShowLoginPopup}/>} />
        </Routes>
      </div>
      <Footer />
      {showLoginPopup && <LoginPopup closePopup={() => setShowLoginPopup(false)}/>}

    </>
    
  );
};

export default App;
