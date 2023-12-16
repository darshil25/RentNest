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

import Slider1 from '../component/slider1';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'
import Select from "react-select";
import { Link } from 'react-router-dom'

export default function Home() {
	const [counter,setCounter]=useState(false)
	const [loginpopup,setloginpopup]=useState(false)
	console.log(loginpopup);
	const [activeSlideIndex, setActiveSlideIndex] = useState(0);

	// avtive slide index function 
	const handleSlideChange = (swiper) => {
	  setActiveSlideIndex(swiper.activeIndex);
	};

	// home status option
	const HouseStatus =  [
        {value: "For Sale",label:"For Sale"},
        {value: "For Rent",label:"For Rent"},
	];
	

	
	  
  return (
    <>

{/* <div className="loader-bg"></div> */}
<div id="wrapper">
<Header />


    

	<Swiper
      slidesPerView={1}
      loop={true}
      scrollbar={{ draggable: true }}
	  onSlideChange={(swiper) => handleSlideChange(swiper)}
    >
		{/* Slider 1 */}
		 <SwiperSlide>
		 <div className="swiper-slide">
		<img src={home_page_slide1} alt="silde1" />
		<div className="content-overlay m-5 p-5 col-4">
          <div className={`slide-desc-col ${activeSlideIndex == 0 ? 'show' : ''} animated fadeInDown slide-desc-1 `}>
			<div className="row bg-white p-4 col-lg-12">
				<div className="col-lg-6">
					<h3 className='font-weight-bold'>Location:-</h3>
					<select>
						<option value="select">Select Location</option>
						<option value="select">Junagadh</option>
						<option value="select">Rajkot</option>
						<option value="select">Surat</option>
						<option value="select">Ahmedabad</option>
						<option value="select">Vadodara</option>
					</select>
				</div>
			</div>
		</div>
		</div>
		</div>
        </SwiperSlide>

		{/* Slider 2 */}
		 <SwiperSlide>
		 <div className="swiper-slide">
		<img src={home_page_slide2} alt="silde1" />
		<div className="content-overlay m-5 p-5 col-4">
          <div className={`slide-desc-col ${activeSlideIndex == 2 ? 'show' : ''} animated fadeInDown slide-desc-1`}>
		  <div className="row bg-white p-4 col-lg-12">
				<div className="col-lg-6">
					<h3 className='font-weight-bold'>Location:-</h3>
					<select>
						<option value="select">Select Location</option>
						<option value="select">Junagadh</option>
						<option value="select">Rajkot</option>
						<option value="select">Surat</option>
						<option value="select">Ahmedabad</option>
						<option value="select">Vadodara</option>
					</select>
				</div>
			</div>
		</div>
		</div>
		</div>
        </SwiperSlide>
		{/* Slider 3 */}
		 <SwiperSlide>
		 <div className="swiper-slide">
		<img src={home_page_slide1}  alt="silde1" />
		<div className="content-overlay m-5 p-5 col-4">
          <div className={`slide-desc-col ${activeSlideIndex == 2 ? 'show' : ''} animated fadeInDown slide-desc-1`}>
		  <div className="row bg-white p-4 col-lg-12">
				<div className="col-lg-6">
					<h3 className='font-weight-bold'>Location:-</h3>
					<select className=''>
						<option value="select">Select Location</option>
						<option value="select">Junagadh</option>
						<option value="select">Rajkot</option>
						<option value="select">Surat</option>
						<option value="select">Ahmedabad</option>
						<option value="select">Vadodara</option>
					</select>
				</div>
			</div>
		</div>
		</div>
		</div>
        </SwiperSlide>
    </Swiper>

	
    <section className="section-light bottom-padding-45 section-both-shadow">
		<div className="container">
			<div className="row">
				<div className="col-sm-6 col-lg-3">
					<div className="feature wow fadeInLeft sample_property_div" id="feature1">
						<div className="feature-icon center-block smaple_property_div_icn"><i className="fa fa-building"></i></div>
						<div className="feature-text">
							<h5 className="subtitle-margin">PIXEL PERFECT</h5>
							<h3>DESIGN<span className="special-color">.</span></h3>
							<div className="title-separator center-block feature-separator"></div>
							<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.</p>
						</div>
					</div>
				</div>			
				<div className="col-sm-6 col-lg-3">
					<div className="feature wow fadeInUp" id="feature2">
						<div className="feature-icon center-block"><i className="fa fa-home"></i></div>
						<div className="feature-text">
							<h5 className="subtitle-margin">FIFTY</h5>
							<h3>HTML FILES<span className="special-color">.</span></h3>
							<div className="title-separator center-block feature-separator"></div>
							<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.</p>
						</div>
					</div>
				</div>			
				<div className="col-sm-6 col-lg-3">
					<div className="feature wow fadeInUp" id="feature3">
						<div className="feature-icon center-block"><i className="fa fa-industry"></i></div>
						<div className="feature-text">
							<h5 className="subtitle-margin">MASONRY, LIST &amp; GRID</h5>
							<h3>LAYOUTS<span className="special-color">.</span></h3>
							<div className="title-separator center-block feature-separator"></div>
							<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.</p>
						</div>
					</div>
				</div>			
				<div className="col-sm-6 col-lg-3">
					<div className="feature wow fadeInRight" id="feature4">
						<div className="feature-icon center-block"><i className="fa fa-tree"></i></div>
						<div className="feature-text">
							<h5 className="subtitle-margin">MODERN &amp; CLEAN</h5>
							<h3>PROJECT<span className="special-color">.</span></h3>
							<div className="title-separator center-block feature-separator"></div>
							<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.</p>
						</div>
					</div>
				</div>
			</div>
		</div>
    </section>

	
	
	<section className="section-light bottom-padding-45 section-top-shadow">
		<div className="container">
			<div className="row">
				<div className="col-xs-12 col-sm-9">
					<h5 className="subtitle-margin">hot</h5>
							<h1>new listings<span className="special-color">.</span></h1>
				</div>
				
				<div className="col-xs-12">
					<div className="title-separator-primary"></div>
				</div>
			</div>
		</div>
		<div className="grid-offers-container row col-lg-12 d-flex justify-content-center">
		
				<div className="grid-offer-col col-3">
					<div className="grid-offer">
						<div className="grid-offer-front">				
							<div className="grid-offer-photo">
								<img src={sample_property1} style={{height:"212.55px"}} alt="" />
								<div className="type-container">
									<div className="transaction-type">sale</div>
								</div>
							</div>
							<div className="grid-offer-text">
								<i className="fa fa-map-marker grid-offer-localization"></i>
								<div className="grid-offer-h4"><h4 className="grid-offer-title">34 Fort Collins, Colorado 80523, USA</h4></div>
								<div className="clearfix"></div>
								<p>Lorem ipsum dolor sit amet, conse ctetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et [...]</p>
								<div className="clearfix"></div>
							</div>
							<div className="price-grid-cont">
								<div className="grid-price-label pull-left">Price:</div>
								<div className="grid-price pull-right">
									₹ 13,200,00
								</div>
								<div className="clearfix"></div>
							</div>
							<div className="grid-offer-params">
								<div className="grid-area">
									<img src={areaicon} alt="" />54m<sup>2</sup>
								</div>
								<div className="grid-rooms">
									<img src={roomicon} alt="" />3
								</div>
								<div className="grid-baths">
									<img src={bathroomicon} alt="" />1
								</div>							
							</div>	
							
						</div>
						<div className="grid-offer-back" style={{backgroundImage:`url(${googlemap})`}}>
							<div ><img src={googlemap} alt="" /></div>
							<div className="button">	
								<Link to="" className="button-primary">
									<span>read more</span>
									<div className="button-triangle"></div>
									<div className="button-triangle2"></div>
									<div className="button-icon"><i className="fa fa-search"></i></div>
								</Link>
							</div>
						</div>
					</div>
				</div>
				<div className="grid-offer-col col-3">
					<div className="grid-offer">
						<div className="grid-offer-front">				
							<div className="grid-offer-photo">
								<img src={sample_property2} alt="" />
								<div className="type-container">
									<div className="transaction-type">sale</div>
								</div>
							</div>
							<div className="grid-offer-text">
								<i className="fa fa-map-marker grid-offer-localization"></i>
								<div className="grid-offer-h4"><h4 className="grid-offer-title">34 Fort Collins, Colorado 80523, USA</h4></div>
								<div className="clearfix"></div>
								<p>Lorem ipsum dolor sit amet, conse ctetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et [...]</p>
								<div className="clearfix"></div>
							</div>
							<div className="price-grid-cont">
								<div className="grid-price-label pull-left">Price:</div>
								<div className="grid-price pull-right">
									₹ 13,200,00
								</div>
								<div className="clearfix"></div>
							</div>
							<div className="grid-offer-params">
								<div className="grid-area">
									<img src={areaicon} alt="" />54m<sup>2</sup>
								</div>
								<div className="grid-rooms">
									<img src={roomicon} alt="" />3
								</div>
								<div className="grid-baths">
									<img src={bathroomicon} alt="" />1
								</div>							
							</div>	
							
						</div>
						<div className="grid-offer-back" style={{backgroundImage:`url(${googlemap})`}}>
							<div ><img src={googlemap} alt="" /></div>
							<div className="button">	
								<Link to="" className="button-primary">
									<span>read more</span>
									<div className="button-triangle"></div>
									<div className="button-triangle2"></div>
									<div className="button-icon"><i className="fa fa-search"></i></div>
								</Link>
							</div>
						</div>
					</div>
				</div>
				<div className="grid-offer-col col-3">
					<div className="grid-offer">
						<div className="grid-offer-front">				
							<div className="grid-offer-photo">
								<img src={sample_property3} alt="" />
								<div className="type-container">
									<div className="transaction-type">sale</div>
								</div>
							</div>
							<div className="grid-offer-text">
								<i className="fa fa-map-marker grid-offer-localization"></i>
								<div className="grid-offer-h4"><h4 className="grid-offer-title">34 Fort Collins, Colorado 80523, USA</h4></div>
								<div className="clearfix"></div>
								<p>Lorem ipsum dolor sit amet, conse ctetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et [...]</p>
								<div className="clearfix"></div>
							</div>
							<div className="price-grid-cont">
								<div className="grid-price-label pull-left">Price:</div>
								<div className="grid-price pull-right">
									₹ 13,200,00
								</div>
								<div className="clearfix"></div>
							</div>
							<div className="grid-offer-params">
								<div className="grid-area">
									<img src={areaicon} alt="" />54m<sup>2</sup>
								</div>
								<div className="grid-rooms">
									<img src={roomicon} alt="" />3
								</div>
								<div className="grid-baths">
									<img src={bathroomicon} alt="" />1
								</div>							
							</div>	
							
						</div>
						<div className="grid-offer-back" style={{backgroundImage:`url(${googlemap})`}}>
							<div ><img src={googlemap} alt="" /></div>
							<div className="button">	
								<Link to="" className="button-primary">
									<span>read more</span>
									<div className="button-triangle"></div>
									<div className="button-triangle2"></div>
									<div className="button-icon"><i className="fa fa-search"></i></div>
								</Link>
							</div>
						</div>
					</div>
				</div>
		</div>
	</section>
	
	<section className="section-dark">
		<div className="container">
			<div className="row">
				<div className="col-xs-12 col-lg-12">
					<h5 className="subtitle-margin">latest from</h5>
							<h1 className="">our blog<span className="special-color">.</span></h1>
				</div>
			
				<div className="col-xs-12">
					<div className="title-separator-primary"></div>
				</div>
			</div>
		</div>
		<div className="container blog-grid1-container">
			<div className="row">
				<div className="col-md-12 col-lg-6 blog-grid1-left-col">
					<article className="blog-grid1-item zoom-cont">
						<figure className="text-center"><Link to=""><img src={blog_grid1a} alt="" className="zoom" /></Link><br/>
						<button className='pt-2 pb-2 p-4 mt-4 read_more_link'>Read More</button>
						</figure>
						<div className="blog-grid1-post-content">
							<div className="blog-grid1-topline">
								<div className="blog-grid1-author pull-left"><i className="fa fa-user"></i>Admin</div>
								<div className="blog-grid1-date pull-right"><i className="fa fa-calendar-o"></i>28/09/15</div>
								<div className="clearfix"></div>
							</div>
							<Link to="" className="blog-grid1-title"><h4>It’s much cheaper to buy than to rent</h4></Link>
							<div className="blog-grid1-separator"></div>
							<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et. Lorem ipsum dolor sit amet...</p>
							
						</div>
					</article>
				</div>
				<div className="col-md-12 col-lg-6 blog-grid1-right-col">
					<article className="blog-grid1-item zoom-cont">
						<figure className="text-center"><Link to=""><img src={blog_grid1b} alt="" className="zoom" /></Link>
						<button className='pt-2 pb-2 p-4 mt-4 read_more_link'>Read More</button>

						</figure>
						<div className="blog-grid1-post-content">
							<div className="blog-grid1-topline">
								<div className="blog-grid1-author pull-left"><i className="fa fa-user"></i>Admin</div>
								<div className="blog-grid1-date pull-right"><i className="fa fa-calendar-o"></i>28/09/15</div>
								<div className="clearfix"></div>
							</div>
							<Link to="" className="blog-grid1-title"><h4>It’s much cheaper to buy than to rent</h4></Link>
							<div className="blog-grid1-separator"></div>
							<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et. Lorem ipsum dolor sit amet...</p>
							
						</div>
					</article>
				</div>
				<div className="col-md-12 col-lg-6 blog-grid1-left-col">
					<article className="blog-grid1-item zoom-cont">
						<div className="blog-grid1-post-content">
							<div className="blog-grid1-topline">
								<div className="blog-grid1-author pull-left"><i className="fa fa-user"></i>Admin</div>
								<div className="blog-grid1-date pull-right"><i className="fa fa-calendar-o"></i>28/09/15</div>
								<div className="clearfix"></div>
							</div>
							<Link to="" className="blog-grid1-title"><h4>It’s much cheaper to buy than to rent</h4></Link>
							<div className="blog-grid1-separator"></div>
							<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et. Lorem ipsum dolor sit amet...</p>
							
						</div>
						<figure className="text-center"><Link to=""><img src={blog_grid1e} alt="" className="zoom" /></Link>
						<button className='pt-2 pb-2 p-4 mt-4 read_more_link'>Read More</button>
						</figure>
					</article>
				</div>
				<div className="col-md-12 col-lg-6 blog-grid1-right-col">
					<article className="blog-grid1-item zoom-cont">
						<div className="blog-grid1-post-content">
							<div className="blog-grid1-topline">
								<div className="blog-grid1-author pull-left"><i className="fa fa-user"></i>Admin</div>
								<div className="blog-grid1-date pull-right"><i className="fa fa-calendar-o"></i>28/09/15</div>
								<div className="clearfix"></div>
							</div>
							<Link to="" className="blog-grid1-title"><h4>It’s much cheaper to buy than to rent</h4></Link>
							<div className="blog-grid1-separator"></div>
							<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et. Lorem ipsum dolor sit amet...</p>
							
						</div>
						<figure className="text-center"><Link to=""><img src={blog_grid1d} alt="" className="zoom" /></Link>
						<button className='pt-2 pb-2 p-4 mt-4 read_more_link'>Read More</button>
						</figure>
					</article>
				</div>
			</div>
		</div>
	</section>
	
	<section className="section-light top-padding-45 bottom-padding-45">
	<ScrollTrigger onEnter={() => setCounter(true)} onExit={() => setCounter(false)} />
		<div className="container">
			<div className="row count-container">
				<div className="col-xs-6 col-lg-3">
					<div className="number" id="number1">
						<div className="number-img">	
							<i className="fa fa-building"></i>
						</div>
						<span className="number-label text-color2">APARTMENTS</span>
						<span className="number-big text-color3 count">
						{counter &&
                  			<CountUp start={0} end={60} duration={2} delay={0} />
                  		}
						</span>
					</div>
				</div>
				<div className="col-xs-6 col-lg-3 number_border">
					<div className="number" id="number2">
						<div className="number-img">	
							<i className="fa fa-home"></i>	
						</div>			
						<span className="number-label text-color2">HOUSES</span>
						<span className="number-big text-color3 count">
						{counter &&
                  			<CountUp start={0} end={80} duration={2} delay={0} />
                  		}
						</span>
					</div>
				</div>
				<div className="col-xs-6 col-lg-3 number_border3">
					<div className="number" id="number3">
						<div className="number-img">	
							<i className="fa fa-industry"></i>
						</div>
						<span className="number-label text-color2">COMMERCIAL</span>
						<span className="number-big text-color3 count">
						{counter &&
                  			<CountUp start={0} end={40} duration={2} delay={0} />
                  		}
						</span>
					</div>
				</div>
				<div className="col-xs-6 col-lg-3 number_border">
					<div className="number" id="number4">
						<div className="number-img">
							<i className="fa fa-tree"></i>
						</div>
						<span className="number-label text-color2">LAND</span>
						<span className="number-big text-color3 count">
						{counter &&
                  			<CountUp start={0} end={50} duration={2} delay={0} />
                  		}
						</span>
					</div>
				</div>
			</div>
		</div>
	</section>	
	
    </div>
	<Footer/>

	




    
    </>
  )
}
