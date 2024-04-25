import React, { useEffect, useState, useRef } from "react";
import CountUp from "react-countup";
import ScrollTrigger from "react-scroll-trigger";
import Header from "./header";
import Footer from "./footer";
import areaicon from "../assest/images/area-icon.png";
import roomicon from "../assest/images/rooms-icon.png";
import bathroomicon from "../assest/images/bathrooms-icon.png";
import parkingicon from "../assest/images/parking-icon.png";
import silde1 from "../assest/images/slides/1.jpg";
import silde2 from "../assest/images/slides/2.jpg";
import silde3 from "../assest/images/slides/3.jpg";
import featured_offer1 from "../assest/images/featured-offer1.jpg";
import featured_offer2 from "../assest/images/featured-offer2.jpg";
import featured_offer3 from "../assest/images/featured-offer3.jpg";
import featured_offer4 from "../assest/images/featured-offer4.jpg";
import featured_offer5 from "../assest/images/featured-offer5.jpg";
import featured_offer6 from "../assest/images/featured-offer6.jpg";
import featured_offer7 from "../assest/images/featured-offer7.jpg";

import agent1 from "../assest/images/agent1.jpg";
import agent2 from "../assest/images/agent2.jpg";
import agent3 from "../assest/images/agent3.jpg";
import agent4 from "../assest/images/agent4.jpg";
import agent5 from "../assest/images/agent5.jpg";
import agent6 from "../assest/images/agent6.jpg";

import testimonials1 from "../assest/images/testimonials1.jpg";
import testimonials2 from "../assest/images/testimonials2.jpg";
import testimonials3 from "../assest/images/testimonials3.jpg";

import testimonials_bg from "../assest/images/testimonials-bg.jpg";
import googlemap from "../assest/images/googlemaps.webp";

import grid_offer1 from "../assest/images/grid-offer1.jpg";
import grid_offer2 from "../assest/images/grid-offer2.jpg";
import grid_offer3 from "../assest/images/grid-offer3.jpg";
import grid_offer4 from "../assest/images/grid-offer4.jpg";
import grid_offer5 from "../assest/images/grid-offer5.jpg";
import grid_offer7 from "../assest/images/grid-offer7.jpg";

import sample_property1 from "../assest/images/sample_property1.jpg";
import sample_property2 from "../assest/images/sample_property2.jpg";
import sample_property3 from "../assest/images/sample_property3.jpg";

import blog_grid1a from "../assest/images/sample_property4.jpg";
import blog_grid1b from "../assest/images/sample_property5.jpg";
import blog_grid1e from "../assest/images/sample_property6.jpg";
import blog_grid1d from "../assest/images/sample_property7.jpg";

import home_page_slide1 from "../assest/images/home_page_slide1.jpg";
import home_page_slide2 from "../assest/images/home_page_slide2.jpg";
import home_page_slide3 from "../assest/images/home_page_slide3.jpg";

import Slider1 from "../component/slider1";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Select from "react-select";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { fetchDataPrivate, path, toastsuccessmsg } from "../config/Reausable";
import { ToastContainer, toast } from "react-toastify";

export default function UserPropertyRent() {
  
  const [propertydata, setpropertydata] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");
  const [fromDate, setFromDate] = useState(new Date().toISOString().split("T")[0]);
  const navigate = useNavigate();
  const location = useLocation();
  const property = location.state ? location.state.property : "";

  const [paymentMode, setPaymentMode] = useState("");

  const handlePaymentModeChange = (event) => {
    setPaymentMode(event.target.value);
  };

  // ------------------- Form Field ------------
  const [startDate, setstartDate] = useState();
  const [enddate, setenddate] = useState();
  const [price, setprice] = useState();

  const [errors, setErrors] = useState([
    {
      startDate: "",
      enddate: "",
    },
  ]);

  const handlevalidation = () => {
     var isValid = true;
     var errorTmp = [...errors];

     if (startDate == "" || startDate == undefined || startDate == null) {
       errorTmp[0].startDate = "startDate is required.";
       isValid = false;
     }
     if (enddate == "" || enddate == undefined || enddate == null) {
       errorTmp[0].enddate = "enddate is required.";
       isValid = false;
     }
     setErrors(errorTmp);
     return isValid;
};
  
  const userrent = async () => {
   if (handlevalidation()) {
     let data = {
       userId: window.localStorage.getItem("userId"),
       propertyId: window.sessionStorage.getItem("propertyId"),
       startDate: startDate,
       endDate: enddate,
       price: price,
     };
     
     var response = await fetchDataPrivate("post", "user/propertyrent", data);
    

     if (response.status === 200) {

      //  window.localStorage.setItem("userId", response.data._id);
      navigate("/myproperty");
       window.sessionStorage.setItem("isPurchsed","1");
       
      //  toastsuccessmsg("Congratulations! your property purchase has been successfully completed");
      
     } else {
      console.log(response);
      //  toasterrormsg(response.message);
     }
   }
 };

  const currentDate = new Date

  useEffect(() => {
    // viewProperty();
  }, []);

  return (
    <>
      {/* <div className="loader-bg"></div> */}
      <ToastContainer />
      <div id="wrapper">
        <Header />
        <section className="section-light bottom-padding-45 section-both-shadow">
          <div className="container">
            {/* <div className="row"> */}
            <div className="col-xs-12 col-md-12">
              <div className="row margin-top-60">
                <div className="col-xs-12">
                  <h3 className="title-negative-margin">
                    Property Rent Buy<span className="special-color">.</span>
                  </h3>
                  <div className="title-separator-primary"></div>
                </div>
              </div>
              <div className="row margin-top-60">
                <div className="col-xs-8 col-xs-offset-2 col-sm-3 col-sm-offset-0">
                  <h5 className="subtitle-margin">Renter</h5>
                  <h3 className="title-negative-margin">
                    Mark Smith<span className="special-color">.</span>
                  </h3>
                  <a href="agent-right-sidebar.html" className="agent-photo">
                    <img
                      src="images/agent3.jpg"
                      alt=""
                      className="img-responsive"
                    />
                  </a>
                </div>
                <div className="col-xs-12 col-sm-9">
                  <div className="agent-social-bar">
                    <div className="pull-left">
                      <span className="agent-icon-circle">
                        <i className="fa fa-phone"></i>
                      </span>
                      <span className="agent-bar-text">+91 9265934440</span>
                    </div>
                    <div className="pull-left">
                      <span className="agent-icon-circle">
                        <i className="fa fa-envelope fa-sm"></i>
                      </span>
                      <span className="agent-bar-text">
                        smitp6875@gmail.com
                      </span>
                    </div>
                    <div className="pull-right">
                      <div className="pull-right">
                        <a className="agent-icon-circle" href="#">
                          <i className="fa fa-facebook"></i>
                        </a>
                      </div>
                      <div className="pull-right">
                        <a className="agent-icon-circle icon-margin" href="#">
                          <i className="fa fa-twitter"></i>
                        </a>
                      </div>
                      <div className="pull-right">
                        <a className="agent-icon-circle icon-margin" href="#">
                          <i className="fa fa-google-plus"></i>
                        </a>
                      </div>
                      <div className="pull-right">
                        <a className="agent-icon-circle icon-margin" href="#">
                          <i className="fa fa-skype"></i>
                        </a>
                      </div>
                    </div>
                    <div className="clearfix"></div>
                  </div>
                  <form name="contact-from" action="#">
                    <div>
                      <label className="mx-3">From Date</label>
                      <input
                        name="fromDate"
                        type="date"
                        className="input-short main-input"
                        min={new Date().toISOString().split("T")[0]}
                        onChange={
                          ((e) => setFromDate(e.target.value),
                          (e) => setstartDate(e.target.value))
                        }
                      />
                      <p className="error_text mx-5">{errors[0].startDate}</p>
                    </div>
                    <div>
                      <label className="mx-3">To Date</label>
                      <input
                        name="enddate"
                        type="date"
                        className="input-short main-input ml-2"
                        min={fromDate}
                        onChange={(e) => setenddate(e.target.value)}
                      />
                      <p className="error_text mx-5">{errors[0].enddate}</p>
                    </div>
                    <div className=" mb-2">
                      <label className="mx-3">Payment Mode</label>
                      <label className="mx-3">
                        COD
                        <input
                          name="paymentMode"
                          type="radio"
                          value="COD"
                          checked={paymentMode === "COD"}
                          onChange={handlePaymentModeChange}
                          className="border radioinput mx-1"
                        />
                      </label>
                      <label className="mx-3">
                        Online Payment
                        <input
                          name="paymentMode"
                          type="radio"
                          value="Online Payment"
                          checked={paymentMode === "Online Payment"}
                          onChange={handlePaymentModeChange}
                          className="border radioinput mx-1"
                        />
                      </label>
                    </div>
                    <textarea
                      name="message"
                      className="input-full agent-textarea main-input"
                      placeholder="Your Suggestion"
                    ></textarea>
                    <div className="form-submit-cont">
                      <a
                        href="#"
                        className="button-primary pull-right"
                        onClick={userrent}
                      >
                        <span>Buy</span>
                        <div className="button-triangle"></div>
                        <div className="button-triangle2"></div>
                        <div className="button-icon">
                          <i className="fa fa-paper-plane"></i>
                        </div>
                      </a>
                      <div className="clearfix"></div>
                    </div>
                  </form>
                </div>
              </div>
              {/* </div> */}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
