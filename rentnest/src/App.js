
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
function App() {

  return (
    <>
    
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        
      </Routes>
   
    </>
      );
    }

export default App;