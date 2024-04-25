
// import { useEffect } from "react";
import React from "react";
import { Routes, Route} from "react-router-dom";
import './App.css';

import "../src/assest/css/bootstrap.min.css"
import "../src/assest/css/apartment-layout.css"
import "../src/assest/css/plugins.css"
import "../src/assest/css/font-awesome.min.css"
import "../src/assest/css/style.css"
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import Property from "./pages/property";
import UserPropertyRent from "./pages/userpropertyrent";
import MyPropertyList from "./pages/mypropertylist";
import ForgotPassword from "./pages/forgotpassword";
import OTPVerify from "./pages/otpverify";
import ResetPassword from "./pages/resetpassword";
function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/otpverify" element={<OTPVerify />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/property" element={<Property />} />
        <Route path="/userpropertyrent" element={<UserPropertyRent />} />
        <Route path="/myproperty" element={<MyPropertyList />} />
      </Routes>
    </>
  );
    }

export default App;