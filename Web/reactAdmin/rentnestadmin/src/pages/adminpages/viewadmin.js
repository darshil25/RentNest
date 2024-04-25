import React, { useEffect } from 'react'
import Sidebar from '../sidebar/sidebar';
import Header from '../header/header';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../footer/footer';

export default function ViewAdmin() {

  const [admin, setadmin] = useState({});

  var session = window.sessionStorage.getItem("admin");

   var adminDetails = null;
   const adminViewDetails = () => {
     if (session !== null) {
       setadmin(adminDetails);
      }
    }; 
    // console.log("========================", admin);

  useEffect(() => {
     adminViewDetails()
    }, []);
  return (
    <>
      <div className="d-flex">
        <Sidebar />
        <div className="container">
          <Header />
          <div className="card mb-5 mb-xl-10" id="kt_profile_details_view">
            {/* <!--begin::Card header--> */}
            <div className="card-header cursor-pointer">
              {/* <!--begin::Card title--> */}
              <div className="card-title m-0">
                <h3 className="fw-bold m-0">Profile Details</h3>
              </div>
              <Link
                to="../editadmin"
                className="btn btn-sm btnButton align-self-center text-white fs-5"
              >
                Edit Profile
              </Link>
              {/* <!--end::Card title--> */}
            </div>
            {/* <!--begin::Card header--> */}
            {/* <!--begin::Card body--> */}
            <div className="card-body p-9">
              {/* <!--begin::Row--> */}
              <div className="row mb-7">
                {/* <!--begin::Label--> */}
                <label className="col-lg-4 fw-semibold text-muted">
                  Full Name
                </label>
                {/* <!--end::Label--> */}
                {/* <!--begin::Col--> */}
                <div className="col-lg-8">
                  <span className="fw-bold fs-6 text-gray-800">
                    {/* {admin.name} */}
                  </span>
                </div>
                {/* <!--end::Col--> */}
              </div>
              {/* <!--end::Row--> */}
              {/* <!--begin::Input group--> */}
              <div className="row mb-7">
                {/* <!--begin::Label--> */}
                <label className="col-lg-4 fw-semibold text-muted">Email</label>
                {/* <!--end::Label--> */}
                {/* <!--begin::Col--> */}
                <div className="col-lg-8 fv-row">
                  <span className="fw-semibold text-gray-800 fs-6">
                    {/* {admin.email} */}
                  </span>
                </div>
                {/* <!--end::Col--> */}
              </div>
              <div className="row mb-7">
                {/* <!--begin::Label--> */}
                <label className="col-lg-4 fw-semibold text-muted">
                  Mobile Number
                </label>
                {/* <!--end::Label--> */}
                {/* <!--begin::Col--> */}
                <div className="col-lg-8 fv-row">
                  <span className="fw-semibold text-gray-800 fs-6">
                    {/* {admin.mobileNumber} */}
                  </span>
                </div>
                {/* <!--end::Col--> */}
              </div>
            </div>
            <div className="h-300px"></div>
            <Footer></Footer>
          </div>
        </div>
      </div>
    </>
  );
}
