import React from 'react'
import { Link } from 'react-router-dom'


export default function Footer() {
  return (
    <>
      <footer class="large-cont">
        <div class="container">
          <div class="row">
            <div class="col-xs-6 col-sm-6 col-lg-3">
              <h4 class="second-color">
                About Us<span class="special-color">.</span>
              </h4>
              <div class="footer-title-separator"></div>
              <p class="footer-p">
                Quikr is all about you - Our aim is to empower every person in
                the country to independently connect with buyers and sellers
                online.
              </p>

              <div class="clear"></div>
            </div>
            <div class="col-xs-6 col-sm-6 col-lg-3">
              <h4 class="second-color">
                contact us<span class="special-color">.</span>
              </h4>
              <div class="footer-title-separator"></div>
              <p class="footer-p">For any query Contact Us to below details</p>
              <address>
                <span>
                  <i class="fa fa-map-marker"></i>Cozy Courtyard, Nana mava main
                  road, Rajkot, Gujarat, India
                </span>
                <div class="footer-separator"></div>
                <span>
                  <i class="fa fa-envelope fa-sm"></i>
                  <Link to="mailto:smitp6875@gmail.com">
                    smitp6875@gmail.com
                  </Link>
                </span>
                <div class="footer-separator"></div>
                <span>
                  <i class="fa fa-phone"></i>
                  <Link to="tel:+91 9265934440"> +91 9265934440</Link>
                </span>
              </address>
              <div class="clear"></div>
            </div>
            <div class="col-xs-6 col-sm-6 col-lg-3">
              <h4 class="second-color">
                quick links<span class="special-color">.</span>
              </h4>
              <div class="footer-title-separator"></div>
              <ul class="footer-ul">
                <li>
                  <span class="custom-ul-bullet"></span>
                  <Link to="/home">Home</Link>
                </li>
                <li>
                  <span class="custom-ul-bullet"></span>
                  <Link to="/myproperty">My Property</Link>
                </li>
              </ul>
            </div>
            <div class="col-xs-6 col-sm-6 col-lg-3">
              <h4 class="second-color">
                Follow Us<span class="special-color">.</span>
              </h4>
              <div class="footer-title-separator"></div>
              <i class="fa fa-facebook" aria-hidden="true"></i>&nbsp;&nbsp;
              <i class="fa fa-instagram" aria-hidden="true"></i>&nbsp;&nbsp;
              <i class="fa fa-twitter" aria-hidden="true"></i>
            </div>
          </div>
        </div>
      </footer>
      <footer class="small-cont border-top border-secondary d-flex  text-center align-items-center">
        <div class="col-xs-12 col-md-6 col-lg-12">
          2024 Copyright Rent Nest. All right reserved.
        </div>
      </footer>
    </>
  );
}
