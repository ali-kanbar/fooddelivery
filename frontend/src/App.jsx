import React, { useState } from "react";
import Navbar from "./components/navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Footer from "./components/Footer/Footer";
import LoginPopup from "./components/LoginPopup/LoginPopup";

const App = () => {

  const [showPopup,setShowPopup] = useState(false)
  
  return (
    <>
      <div className="app" style={{ filter: showPopup ? "blur(5px)" : "none" }}>
        <Navbar showPopup={showPopup} setShowPopup={setShowPopup}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
        </Routes>
      </div>
      <Footer />
      {showPopup && <LoginPopup closePopup={() => setShowPopup(false)}/>}

    </>
    
  );
};

export default App;
