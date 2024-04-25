import React,{useEffect, useState,useRef} from 'react'
import CountUp from 'react-countup';
import ScrollTrigger from 'react-scroll-trigger';
import Header from "./header"
import Footer from "./footer"
import areaicon from "../assest/images/area-icon.png"
import roomicon from "../assest/images/rooms-icon.png"
import bathroomicon from "../assest/images/bathrooms-icon.png"
import parkingicon from "../assest/images/parking-icon.png"
import silde1 from "../assest/images/slides/1.jpg"
import silde2 from "../assest/images/slides/2.jpg"
import silde3 from "../assest/images/slides/3.jpg"
import featured_offer1 from "../assest/images/featured-offer1.jpg"
import featured_offer2 from "../assest/images/featured-offer2.jpg"
import featured_offer3 from "../assest/images/featured-offer3.jpg"
import featured_offer4 from "../assest/images/featured-offer4.jpg"
import featured_offer5 from "../assest/images/featured-offer5.jpg"
import featured_offer6 from "../assest/images/featured-offer6.jpg"
import featured_offer7 from "../assest/images/featured-offer7.jpg"

import agent1 from "../assest/images/agent1.jpg"
import agent2 from "../assest/images/agent2.jpg"
import agent3 from "../assest/images/agent3.jpg"
import agent4 from "../assest/images/agent4.jpg"
import agent5 from "../assest/images/agent5.jpg"
import agent6 from "../assest/images/agent6.jpg"

import testimonials1 from "../assest/images/testimonials1.jpg"
import testimonials2 from "../assest/images/testimonials2.jpg"
import testimonials3 from "../assest/images/testimonials3.jpg"

import testimonials_bg from "../assest/images/testimonials-bg.jpg"
import googlemap from "../assest/images/googlemaps.webp"

import grid_offer1 from "../assest/images/grid-offer1.jpg"
import grid_offer2 from "../assest/images/grid-offer2.jpg"
import grid_offer3 from "../assest/images/grid-offer3.jpg"
import grid_offer4 from "../assest/images/grid-offer4.jpg"
import grid_offer5 from "../assest/images/grid-offer5.jpg"
import grid_offer7 from "../assest/images/grid-offer7.jpg"

import sample_property1 from "../assest/images/sample_property1.jpg"
import sample_property2 from "../assest/images/sample_property2.jpg"
import sample_property3 from "../assest/images/sample_property3.jpg"

import blog_grid1a from "../assest/images/sample_property4.jpg"
import blog_grid1b from "../assest/images/sample_property5.jpg"
import blog_grid1e from "../assest/images/sample_property6.jpg"
import blog_grid1d from "../assest/images/sample_property7.jpg"

import home_page_slide1 from "../assest/images/home_page_slide1.jpg"
import home_page_slide2 from "../assest/images/home_page_slide2.jpg"
import home_page_slide3 from "../assest/images/home_page_slide3.jpg"

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

import Slider1 from '../component/slider1';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'
import Select from "react-select";
import { Link, useNavigate } from 'react-router-dom'
import { fetchDataPrivate } from '../config/Reausable';
import { ToastContainer, toast } from 'react-toastify';

export default function MyPropertyList() {
	const [counter,setCounter]=useState(false)
	const [loginpopup,setloginpopup]=useState(false)
	// console.log(loginpopup);
	const [activeSlideIndex, setActiveSlideIndex] = useState(0);
	const [propertydata, setpropertydata] = useState([]);
	const [ProopertyDetail, setProopertyDetail] = useState({});
	const [selectedValue, setSelectedValue] = useState("");

  var bb = "http://localhost/projects/rent_nest_api_front_database/";

	// avtive slide index function 
	const handleSlideChange = (swiper) => {
	  setActiveSlideIndex(swiper.activeIndex);
	};

  const navigate = useNavigate();
	// home status option
	const HouseStatus =  [
        {value: "For Sale",label:"For Sale"},
        {value: "For Rent",label:"For Rent"},
	];
	
	const selectdatachange = async (event) => {
	setSelectedValue(event.target.value);
	viewProperty(event.target.value);
  }

	//    Sign In Api Call Function
  const viewProperty = async (userId) => {
    
    if (window.sessionStorage.getItem("isPurchsed") == "1") {
      toast.success("Congratulations! Property Purchase Has Been Completed", {
        position: "top-right",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }

        let data = {
          userId: userId,
        };
        
		var response = await fetchDataPrivate("post", "user/viewuserpropertylist", data);
     
		
		if(response.status === 200){
      console.log("---------",response.data);
			setpropertydata(response.data);
      // Image Url
      // setProopertyDetail(bb+ response.data.propertyDetail.image)

            // toastsuccessmsg(response.message);

		}else{
			// toasterrormsg(response.message);
		}	
 };
  
 
 useEffect(() => {
   viewProperty(window.localStorage.getItem("userId"));
   const userId = window.localStorage.getItem("userId");
   if (userId == null || userId == "" || userId == undefined) {
     navigate("/home");
   }
 }, []);
	
	  
  return (
    <>
      {/* <div className="loader-bg"></div> */}
      <ToastContainer />
      <div id="wrapper">
        <Header />
        <section className="section-light bottom-padding-45 section-top-shadow">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-sm-9">
                <h5 className="subtitle-margin"></h5>
                <h1>
                  My Properties<span className="special-color">.</span>
                </h1>
              </div>

              <div className="col-xs-12">
                <div className="title-separator-primary"></div>
              </div>
            </div>
          </div>
          <div className="grid-offers-container row col-lg-12 d-flex justify-content-center">
            {/* <Carousel cols={4} rows={1} gap={0} loop> */}

            {propertydata.map((propertydata) =>
              
             (
             propertydata.propertyDetail ? 
              (<div
                className="grid-offer-col col-3"
                key={propertydata.propertyDetail.id}
              >
                <div className="grid-offer">
                  <div className="grid-offer-front">
                    <div className="grid-offer-photo">
                      <img
                        // src={sample_property1}
                        src={propertydata.propertyDetail.image == "" || propertydata.propertyDetail.image == null ||propertydata.propertyDetail.image == undefined ? "" : bb+propertydata.propertyDetail.image}
                        style={{ height: "212.55px" }}
                        alt=""
                      />
                      <div className="type-container">
                        <div className="transaction-type">sale</div>
                      </div>
                    </div>
                    <div className="grid-offer-text">
                      <i className="fa fa-map-marker grid-offer-localization"></i>
                      <div className="grid-offer-h4">
                        <h4 className="grid-offer-title">
                          { propertydata.propertyDetail.location ?  propertydata.propertyDetail.location :''}
                        </h4>
                      </div>
                      <div className="clearfix"></div>
                      <p>
                        {propertydata.startDate} TO {propertydata.endDate}
                      </p>
                      <p>{propertydata.dayCount} Days</p>
                      <div className="clearfix"></div>
                    </div>
                    <div className="price-grid-cont">
                      <div className="grid-price-label pull-left">Price:</div>
                      <div className="grid-price pull-right">
                        ₹ {propertydata.propertyDetail.price ? propertydata.propertyDetail.price : '0'}
                      </div>
                      <div className="clearfix"></div>
                    </div>
                    {/* <div className="grid-offer-params">
                          <div className="grid-area">
                            <img src={areaicon} alt="" />
                            54m<sup>2</sup>
                          </div>
                          <div className="grid-rooms">
                            <img src={roomicon} alt="" />3
                          </div>
                          <div className="grid-baths">
                            <img src={bathroomicon} alt="" />1
                          
                          </div>
                        </div> */}
                  </div>
                  <div
                    className="grid-offer-back"
                   
                    style={{ backgroundImage: `url(${googlemap})` }}
                  >
                    <div>
                      <img src={googlemap} alt="" />
                    </div>
                    <div className="button">
                      <Link
                        to=""
                        className="button-primary"
                        // state={{ property: propertydata }}
                      >
                        <span>read more</span>
                        <div className="button-triangle"></div>
                        <div className="button-triangle2"></div>
                        <div className="button-icon">
                          <i className="fa fa-search"></i>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>) : ''
             
            ))}
            {/* </Carousel> */}
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
