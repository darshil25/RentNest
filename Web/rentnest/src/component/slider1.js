import React,{useState} from 'react'
import Select from "react-select";
import home_page_slide1 from "../assest/images/home_page_slide1.jpg"
import areaicon from "../assest/images/area-icon.png"
import roomicon from "../assest/images/rooms-icon.png"
import bathroomicon from "../assest/images/bathrooms-icon.png"
import parkingicon from "../assest/images/parking-icon.png"


export default function Slider1() {
    const [activeSlideIndex, setActiveSlideIndex] = useState(0);

	// avtive slide index function 
	const handleSlideChange = (swiper) => {
	  setActiveSlideIndex(swiper.activeIndex);
	};
    const HouseStatus =  [
        {value: "For Sale",label:"For Sale"},
        {value: "For Rent",label:"For Rent"},
	];
	const [house,setHouse] = useState(Object)

    const handleContextMenu = (e) => {
		e.preventDefault(); 
	  };
  return (
    <div className="swiper-slide">
		<img src={home_page_slide1} alt="silde1" />
		<div className="content-overlay m-5 p-5">
          <div className={`slide-desc-col ${activeSlideIndex == 0 ? 'show' : ''} animated fadeInDown slide-desc-1`}>
                        <div className="row col-lg-12">
                            <div className="col-xs-12 col-sm-10 col-md-8 col-lg-6 col-sm-offset-2 col-md-offset-4 col-lg-offset-6 slide-desc-col animated fadeInDown slide-desc-1">
								<div className="slide-desc pull-right">
									<div className="slide-desc-text">
										
										<div className="estate-type">apartment</div>
										<div className="transaction-type">sale</div>
										<h4>Fort Collins, Colorado 80523, USA</h4>
										<div className="clearfix"></div>
										
										<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
										Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
										</p>
									</div>
									<div className="row col-lg-12">
										<div className="col-2 text-center p-2 pl-0 pr-0">
											<img src={areaicon} style={{width:"17px",height:"17px"}} alt="" />54m<sup>2</sup>
										</div>
										<div className="col-2 text-center p-2 pl-0 pr-0">
											<img src={roomicon}  style={{width:"17px",height:"17px"}} alt="" />3
										</div>
										<div className="col-2 text-center p-2 pl-0 pr-0">
											<img src={bathroomicon} style={{width:"17px",height:"17px"}} alt="" />1
										</div>	
										<div className="col-2 text-center p-2 pl-0 pr-0">
											<img src={parkingicon} style={{width:"17px",height:"17px"}} alt="" />1
										</div>	
									<div className="slide-desc-price col-4 text-center pt-1 pl-0 pr-0">
										$ 320 000
									</div>
									<div className="clearfix"></div>
									</div>
								</div>
								
							</div>
						</div>
		</div>
			<div className="row position-absolute tab-content p-5">
				<div  className="col-xs-12">
					<div className="row">
						<Select options={HouseStatus} onContextMenu={this.handleContextMenu}/>
						
						
						
					</div>
					<div className="row">
						<div className="col-xs-12 col-sm-6 col-lg-3">
							<div className="adv-search-range-cont">	
								<label for="slider-range-price1-value" className="adv-search-label">Price:</label>
								<span>$</span>
								<input type="text" id="slider-range-price1-value" readonly className="adv-search-amount"/>
								<div className="clearfix"></div>
								<div id="slider-range-price1" data-min="0" data-max="300000" className="slider-range"></div>
							</div>
							
						</div>
						<div className="col-xs-12 col-sm-6 col-lg-3">
							<div className="adv-search-range-cont">	
								<label for="slider-range-area1-value" className="adv-search-label">Area:</label>
								<span>m<sup>2</sup></span>
								<input type="text" id="slider-range-area1-value" readonly className="adv-search-amount"/>
								<div className="clearfix"></div>
								<div id="slider-range-area1" data-min="0" data-max="180" className="slider-range"></div>
							</div>
						</div>
						<div className="col-xs-12 col-sm-6 col-lg-3">
							<div className="adv-search-range-cont">	
								<label for="slider-range-bedrooms1-value" className="adv-search-label">Bedrooms:</label>
								<input type="text" id="slider-range-bedrooms1-value" readonly className="adv-search-amount"/>
								<div className="clearfix"></div>
								<div id="slider-range-bedrooms1" data-min="1" data-max="10" className="slider-range"></div>
							</div>
						</div>
						<div className="col-xs-12 col-sm-6 col-lg-3">
							<div className="adv-search-range-cont">	
								<label for="slider-range-bathrooms1-value" className="adv-search-label">Bathrooms:</label>
								<input type="text" id="slider-range-bathrooms1-value" readonly className="adv-search-amount"/>
								<div className="clearfix"></div>
								<div id="slider-range-bathrooms1" data-min="1" data-max="4" className="slider-range"></div>
							</div>
						</div>
					</div>
				</div>
				<div role="tabpanel" className="col-xs-12 adv-search-outer tab-pane fade" id="houses">
					<div className="row">
						<div className="col-xs-12 col-sm-6 col-lg-3">
							<select name="transaction2" className="bootstrap-select" title="Transaction:" multiple>
								<option>For sale</option>
								<option>For rent</option>
							</select>
						</div>
						<div className="col-xs-12 col-sm-6 col-lg-3">
							<select name="country2" className="bootstrap-select" title="Country:" multiple data-actions-box="true">
								
								<option>United States</option>
								<option>Canada</option>
								<option>Mexico</option>
							</select>
						</div>
						<div className="col-xs-12 col-sm-6 col-lg-3">
							<select name="city2" className="bootstrap-select" title="City:" multiple data-actions-box="true">
								<option>New York</option>
								<option>Los Angeles</option>
								<option>Chicago</option>
								<option>Houston</option>
								<option>Philadelphia</option>
								<option>Phoenix</option>
								<option>Washington</option>
								<option>Salt Lake City</option>
								<option>Detroit</option>
								<option>Boston</option>
							</select>
						</div>
						<div className="col-xs-12 col-sm-6 col-lg-3">
							<select name="location2" className="bootstrap-select" title="Location:" multiple data-actions-box="true">
								<option>Some location 1</option>
								<option>Some location 2</option>
								<option>Some location 3</option>
								<option>Some location 4</option>
							</select>
						</div>
					</div>
					<div className="row">
						<div className="col-xs-12 col-sm-6 col-lg-3">
							<div className="adv-search-range-cont">	
								<label for="slider-range-price2-value" className="adv-search-label">Price:</label>
								<span>$</span>
								<input type="text" id="slider-range-price2-value" readonly className="adv-search-amount"/>
								<div className="clearfix"></div>
								<div id="slider-range-price2" data-min="0" data-max="300000" className="slider-range"></div>
							</div>
						</div>
						<div className="col-xs-12 col-sm-6 col-lg-3">
							<div className="adv-search-range-cont">	
								<label for="slider-range-area2-value" className="adv-search-label">Area:</label>
								<span>m<sup>2</sup></span>
								<input type="text" id="slider-range-area2-value" readonly className="adv-search-amount"/>
								<div className="clearfix"></div>
								<div id="slider-range-area2" data-min="0" data-max="180" className="slider-range"></div>
							</div>
						</div>
						<div className="col-xs-12 col-sm-6 col-lg-3">
							<div className="adv-search-range-cont">	
								<label for="slider-range-bedrooms2-value" className="adv-search-label">Bedrooms:</label>
								<input type="text" id="slider-range-bedrooms2-value" readonly className="adv-search-amount"/>
								<div className="clearfix"></div>
								<div id="slider-range-bedrooms2" data-min="1" data-max="10" className="slider-range"></div>
							</div>
						</div>
						<div className="col-xs-12 col-sm-6 col-lg-3">
							<div className="adv-search-range-cont">	
								<label for="slider-range-bathrooms2-value" className="adv-search-label">Bathrooms:</label>
								<input type="text" id="slider-range-bathrooms2-value" readonly className="adv-search-amount"/>
								<div className="clearfix"></div>
								<div id="slider-range-bathrooms2" data-min="1" data-max="4" className="slider-range"></div>
							</div>
						</div>
					</div>
				</div>
				<div role="tabpanel" className="col-xs-12 adv-search-outer tab-pane fade" id="commercials">
					<div className="row">
						<div className="col-xs-12 col-sm-6 col-lg-3">
							<select name="transaction3" className="bootstrap-select" title="Transaction:" multiple>
								<option>For sale</option>
								<option>For rent</option>
							</select>
						</div>
						<div className="col-xs-12 col-sm-6 col-lg-3">
							<select name="country3" className="bootstrap-select" title="Country:" multiple data-actions-box="true">
								
								<option>United States</option>
								<option>Canada</option>
								<option>Mexico</option>
							</select>
						</div>
						<div className="col-xs-12 col-sm-6 col-lg-3">
							<select name="city3" className="bootstrap-select" title="City:" multiple data-actions-box="true">
								<option>New York</option>
								<option>Los Angeles</option>
								<option>Chicago</option>
								<option>Houston</option>
								<option>Philadelphia</option>
								<option>Phoenix</option>
								<option>Washington</option>
								<option>Salt Lake City</option>
								<option>Detroit</option>
								<option>Boston</option>
							</select>
						</div>
						<div className="col-xs-12 col-sm-6 col-lg-3">
							<select name="location3" className="bootstrap-select" title="Location:" multiple data-actions-box="true">
								<option>Some location 1</option>
								<option>Some location 2</option>
								<option>Some location 3</option>
								<option>Some location 4</option>
							</select>
						</div>
					</div>
					<div className="row">
					<div className="col-xs-12 col-sm-6 col-lg-3">
							<select name="type3" className="bootstrap-select short-margin" title="Type:" multiple>
								<option>Shop/service</option>
								<option>Factory</option>
								<option>Warehouse</option>
								<option>Office</option>
								<option>Other</option>
							</select>
						</div>
						<div className="col-xs-12 col-sm-6 col-lg-3">
							<div className="adv-search-range-cont">	
								<label for="slider-range-price3-value" className="adv-search-label">Price:</label>
								<span>$</span>
								<input type="text" id="slider-range-price3-value" readonly className="adv-search-amount"/>
								<div className="clearfix"></div>
								<div id="slider-range-price3" data-min="0" data-max="300000" className="slider-range"></div>
							</div>
						</div>
						<div className="col-xs-12 col-sm-6 col-lg-3">
							<div className="adv-search-range-cont">	
								<label for="slider-range-area3-value" className="adv-search-label">Area:</label>
								<span>m<sup>2</sup></span>
								<input type="text" id="slider-range-area3-value" readonly className="adv-search-amount"/>
								<div className="clearfix"></div>
								<div id="slider-range-area3" data-min="0" data-max="180" className="slider-range"></div>
							</div>
						</div>
						<div className="col-xs-12 col-sm-6 col-lg-3">
							<div className="adv-search-range-cont">	
								<label for="slider-range-bedrooms3-value" className="adv-search-label">Rooms:</label>
								<input type="text" id="slider-range-bedrooms3-value" readonly className="adv-search-amount"/>
								<div className="clearfix"></div>
								<div id="slider-range-bedrooms3" data-min="1" data-max="10" className="slider-range"></div>
							</div>
						</div>
					</div>
				</div>
				<div role="tabpanel" className="col-xs-12 adv-search-outer tab-pane fade" id="lands">
					<div className="row">
						<div className="col-xs-12 col-sm-6 col-lg-3">
							<select name="transaction4" className="bootstrap-select" title="Transaction:" multiple>
								<option>For sale</option>
								<option>For rent</option>
							</select>
						</div>
						<div className="col-xs-12 col-sm-6 col-lg-3">
							<select name="country4" className="bootstrap-select" title="Country:" multiple data-actions-box="true">
								<option>United States</option>
								<option>Canada</option>
								<option>Mexico</option>
							</select>
						</div>
						<div className="col-xs-12 col-sm-6 col-lg-3">
							<select name="city4" className="bootstrap-select" title="City:" multiple data-actions-box="true">
								<option>New York</option>
								<option>Los Angeles</option>
								<option>Chicago</option>
								<option>Houston</option>
								<option>Philadelphia</option>
								<option>Phoenix</option>
								<option>Washington</option>
								<option>Salt Lake City</option>
								<option>Detroit</option>
								<option>Boston</option>
							</select>
						</div>
						<div className="col-xs-12 col-sm-6 col-lg-3">
							<select name="location4" className="bootstrap-select" title="Location:" multiple data-actions-box="true">
								<option>Some location 1</option>
								<option>Some location 2</option>
								<option>Some location 3</option>
								<option>Some location 4</option>
							</select>
						</div>
					</div>
					<div className="row">
						<div className="col-xs-12 col-sm-6 col-lg-3">
							<select name="type4" className="bootstrap-select short-margin" title="Type:" multiple>
								<option>Field</option>
								<option>Recreational</option>
								<option>Orchard</option>
								<option>Forest</option>
								<option>Other</option>
							</select>
						</div>
						<div className="col-xs-12 col-sm-6 col-lg-3">
							<div className="adv-search-range-cont">	
								<label for="slider-range-price4-value" className="adv-search-label">Price:</label>
								<span>$</span>
								<input type="text" id="slider-range-price4-value" readonly className="adv-search-amount"/>
								<div className="clearfix"></div>
								<div id="slider-range-price4" data-min="0" data-max="300000" className="slider-range"></div>
							</div>
						</div>
						<div className="col-xs-12 col-sm-6 col-lg-3">
							<div className="adv-search-range-cont">	
								<label for="slider-range-area4-value" className="adv-search-label">Area:</label>
								<span>ha</span>
								<input type="text" id="slider-range-area4-value" readonly className="adv-search-amount"/>
								<div className="clearfix"></div>
								<div id="slider-range-area4" data-min="0" data-max="500" className="slider-range"></div>
							</div>
						</div>
						<div className="col-xs-12 col-sm-6 col-lg-3">
							
						</div>
					</div>
					
				</div>
			</div>
		</div>
		</div>
  )
}
