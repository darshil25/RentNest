import logo from './logo.svg';
import './App.css';
import Login from './pages/login';
import React, { useLayoutEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import '../src/assets/style/style.css'

import "../src/assets/plugins/custom/datatables/datatables.bundle.css";
import "../src/assets/plugins/custom/vis-timeline/vis-timeline.bundle.css";
import "../src/assets/plugins/global/plugins.bundle.css";

import Dashboard from './pages/adminpages/dashboard';
import Property from './pages/adminpages/property';
import ForgotPassword from './pages/authPages/forgotpassword';
import OtpVerification from "./pages/authPages/otpverification";
import ResetPassword from "./pages/authPages/resetpassword";
import ViewAdmin from './pages/adminpages/viewadmin';
import EditAdmin from './pages/adminpages/editadmin';
import ViewProperty from './pages/adminpages/viewproperty';
import ViewBookings from './pages/adminpages/viewbookings';


function App() {

  return (
    <Routes>
      <Route path="/" element={<Login />} />;
      <Route path="login" element={<Login />} />;
      <Route path="/dashboard" element={<Dashboard />} />;
      <Route path="/property" element={<Property />} />;
      <Route path="/forgot" element={<ForgotPassword />} />;
      <Route path="/otpverification" element={<OtpVerification />} />;
      <Route path="/resetpassword" element={<ResetPassword />} />;
      <Route path="/editadmin" element={<EditAdmin />} />;
      <Route path="/viewadmindeatil" element={<ViewAdmin />} />;
      <Route path="/viewproperty" element={<ViewProperty />} />;
      <Route path="/viewbooking" element={<ViewBookings  />} />;
    </Routes>
  );
  
}

export default App;
