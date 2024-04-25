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
import { fetchDataPrivate, path } from "../config/Reausable";

export default function Property() {
  const [counter, setCounter] = useState(false);
  const [loginpopup, setloginpopup] = useState(false);
  // console.log(loginpopup);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [propertydata, setpropertydata] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");
  const location = useLocation();
  const property = location.state ? location.state.property : "";
  // avtive slide index function
  const handleSlideChange = (swiper) => {
    setActiveSlideIndex(swiper.activeIndex);
  };

  // home status option
  const HouseStatus = [
    { value: "For Sale", label: "For Sale" },
    { value: "For Rent", label: "For Rent" },
  ];

  const selectdatachange = async (event) => {
    setSelectedValue(event.target.value);
    viewProperty(event.target.value);
  };

  var bb = "http://localhost/projects/rent_nest_api_front_database/";

  const viewProperty = async () => {
    // console.log(property);
    let data = {
      propertyId: property._id,
    };

    var response = await fetchDataPrivate("post", "admin/viewProperty", data);
    // console.log("response ======", response);
    if (response.status === 200) {

      setpropertydata(response.data);
      // toastsuccessmsg(response.message);
    } else {
      // toasterrormsg(response.message);
    }
  };

  const navigate = useNavigate();

   const checklogin = async () => {
     const userId = window.localStorage.getItem("userId");
     if (userId !== "" && userId !== null && userId !== undefined) {
      navigate("/userpropertyrent");
      window.sessionStorage.setItem("propertyId", property._id);
     } else {
       navigate("/login");
     }
  };


  useEffect(() => {
    viewProperty();
     
  }, []);

  return (
    <>
      {/* <div className="loader-bg"></div> */}
      <div id="wrapper">
        <Header />
        <section className="section-light bottom-padding-45 section-both-shadow">
          <div className="container">
            {/* <div className="row"> */}
            <div className="col-xs-12 col-md-12">
              <div className="row">
                <div className="col-xs-12 col-sm-7 col-md-8">
                  <div className="details-image pull-left hidden-xs">
                    <i className="fa fa-home"></i>
                  </div>
                  <div className="details-title pull-left">
                    <h5 className="subtitle-margin">
                      {propertydata.propertyName}
                    </h5>
                    <h3>
                      {propertydata.location}
                      <span className="special-color">.</span>
                    </h3>
                  </div>
                  <div className="clearfix"></div>
                  <div className="title-separator-primary"></div>
                  <p className="details-desc">{propertydata.description}</p>
                  <div className="row">
                    <span>Property Type - {propertydata.propertyType}</span>
                    <span>BHK - {propertydata.bhk}</span>
                    <span>Furniture - {propertydata.furniture}</span>
                    <span>Built-Up Area - {propertydata.builtUpArea}</span>
                    <span>Mobile Number - {propertydata.mobileNumber}</span>
                    <span>BATH - {propertydata.bath}</span>
                  </div>
                </div>
                <div className="col-xs-12 col-sm-5 col-md-4">
                  {/* <img alt="Images" src={path+propertydata.image} /> */}
                  <img alt="Images" src={ bb+propertydata.image} />
                </div>
                <div>
                  <a href="#" className="button-primary" onClick={checklogin}>
                    <span>Buy</span>
                    <div className="button-triangle"></div>
                    <div className="button-triangle2"></div>
                    {/* <div className="button-icon">
                      <i className="fa fa-paper-plane"></i>
                    </div> */}
                  </a>
                </div>
              </div>

              {/* <div className="row margin-top-45">
                <div className="col-xs-12 apartment-tabs">
                 
                  <ul className="nav nav-tabs" role="tablist">
                    <li role="presentation" className="active">
                      <a
                        href="#tab-map"
                        aria-controls="tab-map"
                        role="tab"
                        data-toggle="tab"
                      >
                        <span>Map</span>
                        <div className="button-triangle2"></div>
                      </a>
                    </li>
                    <li role="presentation">
                      <a
                        href="#tab-street-view"
                        aria-controls="tab-street-view"
                        role="tab"
                        data-toggle="tab"
                      >
                        <span>Street view</span>
                        <div className="button-triangle2"></div>
                      </a>
                    </li>
                  </ul>
                 
                  <div className="tab-content">
                    <div role="tabpanel" className="tab-pane active" id="tab-map">
                      <div
                        id="estate-map"
                        className="details-map"
                        style={{ backgroundImage: `url(${googlemap})` }}
                      ></div>
                    </div>
                    <div role="tabpanel" className="tab-pane" id="tab-street-view">
                      <div id="estate-street-view" className="details-map"></div>
                    </div>
                  </div>
                </div>
              </div> */}
              {/* <div className="row margin-top-60">
                <div className="col-xs-12">
                  <h3 className="title-negative-margin">
                    contact the agent<span className="special-color">.</span>
                  </h3>
                  <div className="title-separator-primary"></div>
                </div>
              </div> */}
              {/* <div className="row margin-top-60">
                <div className="col-xs-8 col-xs-offset-2 col-sm-3 col-sm-offset-0">
                  <h5 className="subtitle-margin">manager</h5>
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
                      <span className="agent-bar-text">123-456-789</span>
                    </div>
                    <div className="pull-left">
                      <span className="agent-icon-circle">
                        <i className="fa fa-envelope fa-sm"></i>
                      </span>
                      <span className="agent-bar-text">
                        apartment@domain.tld
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
                    <input
                      name="name"
                      type="text"
                      className="input-short main-input"
                      placeholder="Your name"
                    />
                    <input
                      name="phone"
                      type="text"
                      className="input-short pull-right main-input"
                      placeholder="Your phone"
                    />
                    <input
                      name="mail"
                      type="email"
                      className="input-full main-input"
                      placeholder="Your email"
                    />
                    <textarea
                      name="message"
                      className="input-full agent-textarea main-input"
                      placeholder="Your question"
                    ></textarea>
                    <div className="form-submit-cont">
                      <a href="#" className="button-primary pull-right">
                        <span>send</span>
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
              </div> */}
              {/* </div> */}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
