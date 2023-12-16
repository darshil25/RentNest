import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../pages/layout';
import { fetchDataPrivate,toasterrormsg,fetchData } from '../config/Reausable';
import Select from "react-select";

import avatar330_1 from "../assets/images/300-1.jpg"

function ProfileData() {
    document.title = 'Buildify AI | Profile'
    const navigate = useNavigate();

    const [profileDetails,setProfileDetails] = useState([])
    const [countryId, setCountryId] = useState("");
    const [countryName, setCountryName] = useState([]);
    const [stateId, setStateId] = useState("");
    const [stateName, setStateName] = useState([]);
    const [category,setCategory] = useState([]);
    const [categorySelectedOptions,setCetegorySelectedOptions] = useState([]);
    // console.log(profileDetails.category[0].categoryId);

    useEffect(() => {
        const userId = window.localStorage.getItem("userId");
        if (userId !== "" && userId !== null && userId !== undefined) {
            profileDetailsApi();
            countryApi();
            categoryApi(); 
            stateApi();
        } else {
            navigate("/");
        }
    }, [navigate]);

    const profileDetailsApi = async () => {
        let data = {};

        var response = await fetchDataPrivate("GET","api/profileDetails", data);
        if (response.status === 200) {
            // window.localStorage.setItem('token',response.data[0].token);
            setProfileDetails(response.data[0]);
            // setCountryName(profileDetails.country[0].name);
            // for (let index = 0; index <= profileDetails.category.length; index++) {
            //     const element = profileDetails.category[index];
            //     setCetegorySelectedOptions(element);
                
            // }
            // console.log(response.data[0]);
        }else{
            console.log(response);
        } 
    }

    // category api
    const categoryApi = async () => {

        let data ={};
        var response = await fetchData("GET","public/categoryList", data);
        if (response.status === 200) {

            setCategory(response.data);
            
        } else {
            console.log(response);
            toasterrormsg(response.message);
        }
    }
    const categoryList = category.map(categoryOp => ({
        value: categoryOp.categoryId,
        label: categoryOp.name,
      }));

      //   country api call
    const countryApi = async () => {

        var response = await fetchData("GET","public/countryList", {});
        if (response.status === 200) {

            setCountryName(response.data);
            
        } else {
            console.log(response);
            toasterrormsg(response.message);
        }
    }
    const countryOption = countryName.map(countryOp => ({
        value: countryOp.countryId,
        label: countryOp.name,
      }));

      // state api call
      const stateApi = async () => {

        let data = {};
        var response = await fetchData('GET',`public/stateList/${profileDetails.country[0].cityId}`, data);
        if (response.status === 200) {

            setStateName(response.data);
            
        } else {
            console.log(response);
            toasterrormsg(response.message);
        }
    }
      const stateOption = stateName.map(stateOp => ({
        value: stateOp.stateId,
        label: stateOp.name,
      }));
      
      let countryValue = null; 
      let stateValue = null;

    if (profileDetails.country && profileDetails.country.length > 0) {
        countryValue = countryOption.find(option => option.value === profileDetails.country[0].cityId);
    }
    if (profileDetails.state && profileDetails.state.length > 0) {
        stateValue = stateOption.find(option => option.value === profileDetails.state[0].stateId);
    }

    return (
        <>
            {/* <!--begin::Content wrapper--> */}
            <div className="d-flex flex-column flex-column-fluid">
                {/* <!--begin::Content--> */}
                <div id="kt_app_content" className="app-content flex-column-fluid">
                    {/* <!--begin::Navbar--> */}
                    <div className="card mb-5 mb-xl-10">
                        <div className="card-body pt-9 pb-0">
                            {/* <!--begin::Details--> */}
                            <div className="d-flex flex-wrap flex-sm-nowrap">
                                {/* <!--begin: Pic--> */}
                                <div className="me-7 mb-4">
                                    <div className="symbol symbol-100px symbol-lg-160px symbol-fixed position-relative">
                                        <img src={avatar330_1} alt="avatar330_1" />
                                        <div className="position-absolute translate-middle bottom-0 start-100 mb-6 bg-success rounded-circle border border-4 border-body h-20px w-20px"></div>
                                    </div>
                                </div>
                                {/* <!--end::Pic--> */}
                                {/* <!--begin::Info--> */}
                                <div className="flex-grow-1">
                                    {/* <!--begin::Title--> */}
                                    <div className="d-flex justify-content-between align-items-start flex-wrap mb-2">
                                        {/* <!--begin::User--> */}
                                        <div className="d-flex flex-column">
                                            {/* <!--begin::Name--> */}
                                            <div className="d-flex align-items-center mb-2">
                                                <Link href="#" className="text-gray-900 text-hover-primary fs-2 fw-bold me-1">{profileDetails.firstName} {profileDetails.lastName}</Link>
                                                <Link href="#">
                                                    <i className="ki-outline ki-verify fs-1 text-primary"></i>
                                                </Link>
                                            </div>
                                            {/* <!--end::Name--> */}
                                            {/* <!--begin::Info--> */}
                                            <div className="d-flex flex-wrap fw-semibold fs-6 mb-4 pe-2">
                                                <Link href="#" className="d-flex align-items-center text-muted text-hover-primary me-5 mb-2">
                                                    <i className="ki-outline ki-profile-circle fs-4 me-1"></i>{profileDetails.accountType}</Link>
                                                <Link href="#" className="d-flex align-items-center text-muted text-hover-primary me-5 mb-2">
                                                    <i className="ki-outline ki-geolocation fs-4 me-1"></i>SF, Bay Area</Link>
                                                <Link href="#" className="d-flex align-items-center text-muted text-hover-primary mb-2">
                                                    <i className="ki-outline ki-sms fs-4 me-1"></i>{profileDetails.email}</Link>
                                            </div>
                                            {/* <!--end::Info--> */}
                                        </div>
                                        {/* <!--end::User--> */}
                                        {/* <!--begin::Actions--> */}
                                        <div className="d-flex my-4">
                                            <Link href="#" className="btn btn-sm btn-light me-2" id="kt_user_follow_button">
                                                <i className="ki-outline ki-check fs-3 d-none"></i>
                                                {/* <!--begin::Indicator label--> */}
                                                <span className="indicator-label">Follow</span>
                                                {/* <!--end::Indicator label--> */}
                                                {/* <!--begin::Indicator progress--> */}
                                                <span className="indicator-progress">Please wait...
                                                    <span className="spinner-border spinner-border-sm align-middle ms-2"></span></span>
                                                {/* <!--end::Indicator progress--> */}
                                            </Link>
                                            <Link href="#" className="btn btn-sm btn-primary me-3" data-bs-toggle="modal" data-bs-target="#kt_modal_offer_a_deal">Hire Me</Link>
                                            {/* <!--begin::Menu--> */}
                                            <div className="me-0">
                                                <button className="btn btn-sm btn-icon btn-bg-light btn-active-color-primary" data-kt-menu-trigger="click" data-kt-menu-placement="bottom-end">
                                                    <i className="ki-solid ki-dots-horizontal fs-2x me-1"></i>
                                                </button>
                                                {/* <!--begin::Menu 3--> */}
                                                <div className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg-light-primary fw-semibold w-200px py-3" data-kt-menu="true">
                                                    {/* <!--begin::Heading--> */}
                                                    <div className="menu-item px-3">
                                                        <div className="menu-content text-muted pb-2 px-3 fs-7 text-uppercase">Payments</div>
                                                    </div>
                                                    {/* <!--end::Heading--> */}
                                                    {/* <!--begin::Menu item--> */}
                                                    <div className="menu-item px-3">
                                                        <Link href="#" className="menu-link px-3">Create Invoice</Link>
                                                    </div>
                                                    {/* <!--end::Menu item--> */}
                                                    {/* <!--begin::Menu item--> */}
                                                    <div className="menu-item px-3">
                                                        <Link href="#" className="menu-link flex-stack px-3">Create Payment
                                                            <span className="ms-2" data-bs-toggle="tooltip" title="Specify a target name for future usage and reference">
                                                                <i className="ki-outline ki-information fs-6"></i>
                                                            </span></Link>
                                                    </div>
                                                    {/* <!--end::Menu item--> */}
                                                    {/* <!--begin::Menu item--> */}
                                                    <div className="menu-item px-3">
                                                        <Link href="#" className="menu-link px-3">Generate Bill</Link>
                                                    </div>
                                                    {/* <!--end::Menu item--> */}
                                                    {/* <!--begin::Menu item--> */}
                                                    <div className="menu-item px-3" data-kt-menu-trigger="hover" data-kt-menu-placement="right-end">
                                                        <Link href="#" className="menu-link px-3">
                                                            <span className="menu-title">Subscription</span>
                                                            <span className="menu-arrow"></span>
                                                        </Link>
                                                        {/* <!--begin::Menu sub--> */}
                                                        <div className="menu-sub menu-sub-dropdown w-175px py-4">
                                                            {/* <!--begin::Menu item--> */}
                                                            <div className="menu-item px-3">
                                                                <Link href="#" className="menu-link px-3">Plans</Link>
                                                            </div>
                                                            {/* <!--end::Menu item--> */}
                                                            {/* <!--begin::Menu item--> */}
                                                            <div className="menu-item px-3">
                                                                <Link href="#" className="menu-link px-3">Billing</Link>
                                                            </div>
                                                            {/* <!--end::Menu item--> */}
                                                            {/* <!--begin::Menu item--> */}
                                                            <div className="menu-item px-3">
                                                                <Link href="#" className="menu-link px-3">Statements</Link>
                                                            </div>
                                                            {/* <!--end::Menu item--> */}
                                                            {/* <!--begin::Menu separator--> */}
                                                            <div className="separator my-2"></div>
                                                            {/* <!--end::Menu separator--> */}
                                                            {/* <!--begin::Menu item--> */}
                                                            <div className="menu-item px-3">
                                                                <div className="menu-content px-3">
                                                                    {/* <!--begin::Switch--> */}
                                                                    <label className="form-check form-switch form-check-custom form-check-solid">
                                                                        {/* <!--begin::Input--> */}
                                                                        <input className="form-check-input w-30px h-20px" type="checkbox" name="notifications" />
                                                                        {/* <!--end::Input--> */}
                                                                        {/* <!--end::Label--> */}
                                                                        <span className="form-check-label text-muted fs-6">Recuring</span>
                                                                        {/* <!--end::Label--> */}
                                                                    </label>
                                                                    {/* <!--end::Switch--> */}
                                                                </div>
                                                            </div>
                                                            {/* <!--end::Menu item--> */}
                                                        </div>
                                                        {/* <!--end::Menu sub--> */}
                                                    </div>
                                                    {/* <!--end::Menu item--> */}
                                                    {/* <!--begin::Menu item--> */}
                                                    <div className="menu-item px-3 my-1">
                                                        <Link href="#" className="menu-link px-3">Settings</Link>
                                                    </div>
                                                    {/* <!--end::Menu item--> */}
                                                </div>
                                                {/* <!--end::Menu 3--> */}
                                            </div>
                                            {/* <!--end::Menu--> */}
                                        </div>
                                        {/* <!--end::Actions--> */}
                                    </div>
                                    {/* <!--end::Title--> */}
                                    {/* <!--begin::Stats--> */}
                                    <div className="d-flex flex-wrap flex-stack">
                                        {/* <!--begin::Wrapper--> */}
                                        <div className="d-flex flex-column flex-grow-1 pe-8">
                                            {/* <!--begin::Stats--> */}
                                            <div className="d-flex flex-wrap">
                                                {/* <!--begin::Stat--> */}
                                                <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">
                                                    {/* <!--begin::Number--> */}
                                                    <div className="d-flex align-items-center">
                                                        <i className="ki-outline ki-arrow-up fs-3 text-success me-2"></i>
                                                        <div className="fs-2 fw-bold" data-kt-countup="true" data-kt-countup-prefix="$">0</div>
                                                    </div>
                                                    {/* <!--end::Number--> */}
                                                    {/* <!--begin::Label--> */}
                                                    <div className="fw-semibold fs-6 text-muted">Earnings</div>
                                                    {/* <!--end::Label--> */}
                                                </div>
                                                {/* <!--end::Stat--> */}
                                                {/* <!--begin::Stat--> */}
                                                <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">
                                                    {/* <!--begin::Number--> */}
                                                    <div className="d-flex align-items-center">
                                                        <i className="ki-outline ki-arrow-down fs-3 text-danger me-2"></i>
                                                        <div className="fs-2 fw-bold" data-kt-countup="true">0</div>
                                                    </div>
                                                    {/* <!--end::Number--> */}
                                                    {/* <!--begin::Label--> */}
                                                    <div className="fw-semibold fs-6 text-muted">Projects</div>
                                                    {/* <!--end::Label--> */}
                                                </div>
                                                {/* <!--end::Stat--> */}
                                                {/* <!--begin::Stat--> */}
                                                <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">
                                                    {/* <!--begin::Number--> */}
                                                    <div className="d-flex align-items-center">
                                                        <i className="ki-outline ki-arrow-up fs-3 text-success me-2"></i>
                                                        <div className="fs-2 fw-bold" data-kt-countup="true" data-kt-countup-prefix="%">0</div>
                                                    </div>
                                                    {/* <!--end::Number--> */}
                                                    {/* <!--begin::Label--> */}
                                                    <div className="fw-semibold fs-6 text-muted">Success Rate</div>
                                                    {/* <!--end::Label--> */}
                                                </div>
                                                {/* <!--end::Stat--> */}
                                            </div>
                                            {/* <!--end::Stats--> */}
                                        </div>
                                        {/* <!--end::Wrapper--> */}
                                        {/* <!--begin::Progress--> */}
                                        <div className="d-flex align-items-center w-200px w-sm-300px flex-column mt-3">
                                            <div className="d-flex justify-content-between w-100 mt-auto mb-2">
                                                <span className="fw-semibold fs-6 text-muted">Profile Compleation</span>
                                                <span className="fw-bold fs-6">50%</span>
                                            </div>
                                            <div className="h-5px mx-3 w-100 bg-light mb-3">
                                                <div className="bg-success rounded h-5px" role="progressbar" style={{width: '50%'}} ></div>
                                            </div>
                                        </div>
                                        {/* <!--end::Progress--> */}
                                    </div>
                                    {/* <!--end::Stats--> */}
                                </div>
                                {/* <!--end::Info--> */}
                            </div>
                            {/* <!--end::Details--> */}
                            {/* <!--begin::Navs--> */}
                            <ul className="nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bold">
                                {/* <!--begin::Nav item--> */}
                                <li className="nav-item mt-2">
                                    <Link className="nav-link text-active-primary ms-0 me-10 py-5 active" href="#">Settings</Link>
                                </li>
                                {/* <!--end::Nav item--> */}
                            </ul>
                            {/* <!--begin::Navs--> */}
                        </div>
                    </div>
                    {/* <!--end::Navbar--> */}
                    {/* <!--begin::Basic info--> */}
                    <div className="card mb-5 mb-xl-10">
                        {/* <!--begin::Card header--> */}
                        <div className="card-header border-0 cursor-pointer" role="button" data-bs-toggle="collapse" data-bs-target="#kt_account_profile_details" aria-expanded="true" aria-controls="kt_account_profile_details">
                            {/* <!--begin::Card title--> */}
                            <div className="card-title m-0">
                                <h3 className="fw-bold m-0">Profile Details</h3>
                            </div>
                            {/* <!--end::Card title--> */}
                        </div>
                        {/* <!--begin::Card header--> */}
                        {/* <!--begin::Content--> */}
                        <div id="kt_account_settings_profile_details" className="collapse show">
                            {/* <!--begin::Form--> */}
                            <form id="kt_account_profile_details_form" className="form">
                                {/* <!--begin::Card body--> */}
                                <div className="card-body border-top p-9">
                                    {/* <!--begin::Input group--> */}
                                    <div className="row mb-6">
                                        {/* <!--begin::Label--> */}
                                        <label className="col-lg-4 col-form-label fw-semibold fs-6">Avatar</label>
                                        {/* <!--end::Label--> */}
                                        {/* <!--begin::Col--> */}
                                        <div className="col-lg-8">
                                            {/* <!--begin::Image input--> */}
                                            <div className="image-input image-input-outline blankImg" data-kt-image-input="true">
                                                {/* <!--begin::Preview existing avatar--> */}
                                                <div className="image-input-wrapper w-125px h-125px avatar330-1"></div>
                                                {/* <!--end::Preview existing avatar--> */}
                                                {/* <!--begin::Label--> */}
                                                <label className="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow" data-kt-image-input-action="change" data-bs-toggle="tooltip" title="Change avatar">
                                                    <i className="ki-outline ki-pencil fs-7"></i>
                                                    {/* <!--begin::Inputs--> */}
                                                    <input type="file" name="avatar" accept=".png, .jpg, .jpeg" />
                                                    <input type="hidden" name="avatar_remove" />
                                                    {/* <!--end::Inputs--> */}
                                                </label>
                                                {/* <!--end::Label--> */}
                                                {/* <!--begin::Cancel--> */}
                                                <span className="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow" data-kt-image-input-action="cancel" data-bs-toggle="tooltip" title="Cancel avatar">
                                                    <i className="ki-outline ki-cross fs-2"></i>
                                                </span>
                                                {/* <!--end::Cancel--> */}
                                                {/* <!--begin::Remove--> */}
                                                <span className="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow" data-kt-image-input-action="remove" data-bs-toggle="tooltip" title="Remove avatar">
                                                    <i className="ki-outline ki-cross fs-2"></i>
                                                </span>
                                                {/* <!--end::Remove--> */}
                                            </div>
                                            {/* <!--end::Image input--> */}
                                            {/* <!--begin::Hint--> */}
                                            <div className="form-text">Allowed file types: png, jpg, jpeg.</div>
                                            {/* <!--end::Hint--> */}
                                        </div>
                                        {/* <!--end::Col--> */}
                                    </div>
                                    {/* <!--end::Input group--> */}
                                    {/* <!--begin::Input group--> */}
                                    <div className="row mb-6">
                                        {/* <!--begin::Label--> */}
                                        <label className="col-lg-4 col-form-label required fw-semibold fs-6">Full Name</label>
                                        {/* <!--end::Label--> */}
                                        {/* <!--begin::Col--> */}
                                        <div className="col-lg-8">
                                            {/* <!--begin::Row--> */}
                                            <div className="row">
                                                {/* <!--begin::Col--> */}
                                                <div className="col-lg-6 fv-row">
                                                    <input type="text" name="fname" className="form-control form-control-lg form-control-solid mb-3 mb-lg-0" placeholder="First name" value={profileDetails.firstName} />
                                                </div>
                                                {/* <!--end::Col--> */}
                                                {/* <!--begin::Col--> */}
                                                <div className="col-lg-6 fv-row">
                                                    <input type="text" name="lname" className="form-control form-control-lg form-control-solid" placeholder="Last name" value={profileDetails.lastName} />
                                                </div>
                                                {/* <!--end::Col--> */}
                                            </div>
                                            {/* <!--end::Row--> */}
                                        </div>
                                        {/* <!--end::Col--> */}
                                    </div>
                                    {/* <!--end::Input group--> */}
                                    {/* <!--begin::Input group--> */}
                                    <div className="row mb-6">
                                        {/* <!--begin::Label--> */}
                                        <label className="col-lg-4 col-form-label fw-semibold fs-6">
                                            <span className="required">Contact Number</span>
                                        </label>
                                        {/* <!--end::Label--> */}
                                        {/* <!--begin::Col--> */}
                                        <div className="col-lg-8 fv-row">
                                            <input type="text" name="phone" className="form-control form-control-lg form-control-solid" placeholder="Phone number" value={profileDetails.mobileNumber} />
                                        </div>
                                        {/* <!--end::Col--> */}
                                    </div>
                                    <div className="row mb-6">
                                        {/* <!--begin::Label--> */}
                                        <label className="col-lg-4 col-form-label fw-semibold fs-6">
                                            <span className="required">Email</span>
                                        </label>
                                        {/* <!--end::Label--> */}
                                        {/* <!--begin::Col--> */}
                                        <div className="col-lg-8 fv-row">
                                            <input type="text" name="email" className="form-control form-control-lg form-control-solid" placeholder="Email" value={profileDetails.email} />
                                        </div>
                                        {/* <!--end::Col--> */}
                                    </div>
                                    <div className="row mb-6">
                                        {/* <!--begin::Label--> */}
                                        <label className="col-lg-4 col-form-label fw-semibold fs-6">
                                            <span className="required">Licence Number</span>
                                        </label>
                                        {/* <!--end::Label--> */}
                                        {/* <!--begin::Col--> */}
                                        <div className="col-lg-8 fv-row">
                                            <input type="textx" name="licenceNumber" className="form-control form-control-lg form-control-solid" placeholder="Licence Number" value={profileDetails.licenceNumber} />
                                        </div>
                                        {/* <!--end::Col--> */}
                                    </div>
                                    {/* <!--end::Input group--> */}
                                    {/* <!--begin::Input group--> */}
                                    <div className="row mb-6">
                                        {/* <!--begin::Label--> */}
                                        <label className="col-lg-4 col-form-label fw-semibold fs-6">
                                            <span className="required">Country</span>
                                        </label>
                                        {/* <!--end::Label--> */}
                                        {/* <!--begin::Col--> */}
                                        <div className="col-lg-8 fv-row">
                                        <Select 
                                                className='form-control form-control-lg form-control-solid' 
                                                options={countryOption} 
                                                name='country' 
                                                id='country' 
                                                placeholder="Select Country" 
                                                value={countryValue}
                                                onChange={(e) => {setCountryId(e.value);stateApi(e.value);}}
                                                />
                                        </div>
                                        {/* <!--end::Col--> */}
                                    </div>
                                    <div className="row mb-6">
                                        {/* <!--begin::Label--> */}
                                        <label className="col-lg-4 col-form-label fw-semibold fs-6">
                                            <span className="required">Select State</span>
                                        </label>
                                        {/* <!--end::Label--> */}
                                        {/* <!--begin::Col--> */}
                                        <div className="col-lg-8 fv-row">
                                        <Select className='form-control form-control-lg form-control-solid' 
                                                options={stateOption} 
                                                name='state' 
                                                id='state' 
                                                placeholder="Select State" 
                                                value={stateValue} 
                                                onChange={(e) => {setStateId(e.value);}}
                                                />
                                        </div>
                                        {/* <!--end::Col--> */}
                                    </div>
                                    {/* <!--end::Input group--> */}
                                    {/* <!--begin::Input group--> */}
                                    <div className="row mb-6">
                                        {/* <!--begin::Label--> */}
                                        <label className="col-lg-4 col-form-label required fw-semibold fs-6">Address Line1</label>
                                        {/* <!--end::Label--> */}
                                        {/* <!--begin::Col--> */}
                                        <div className="col-lg-8 fv-row">
                                            <input type="text" name="addressLine1" className="form-control form-control-lg form-control-solid" placeholder="Address Line1" value={profileDetails.addressLine1} />
                                        </div>
                                        {/* <!--end::Col--> */}
                                    </div>
                                    <div className="row mb-6">
                                        {/* <!--begin::Label--> */}
                                        <label className="col-lg-4 col-form-label required fw-semibold fs-6">Address Line2</label>
                                        {/* <!--end::Label--> */}
                                        {/* <!--begin::Col--> */}
                                        <div className="col-lg-8 fv-row">
                                            <input type="text" name="addressLine2" className="form-control form-control-lg form-control-solid" placeholder="Address Line2" value={profileDetails.addressLine2} />
                                        </div>
                                        {/* <!--end::Col--> */}
                                    </div>
                                    <div className="row mb-6">
                                        {/* <!--begin::Label--> */}
                                        <label className="col-lg-4 col-form-label required fw-semibold fs-6">Zip Code</label>
                                        {/* <!--end::Label--> */}
                                        {/* <!--begin::Col--> */}
                                        <div className="col-lg-8 fv-row">
                                            <input type="text" name="zipcode" className="form-control form-control-lg form-control-solid" placeholder="Zip Code" value={profileDetails.zipcode} />
                                        </div>
                                        {/* <!--end::Col--> */}
                                    </div>
                                    <div className="row mb-6">
                                        {/* <!--begin::Label--> */}
                                        <label className="col-lg-4 col-form-label required fw-semibold fs-6">Business Name</label>
                                        {/* <!--end::Label--> */}
                                        {/* <!--begin::Col--> */}
                                        <div className="col-lg-8 fv-row">
                                            <input type="text" name="businessName" className="form-control form-control-lg form-control-solid" placeholder="Business Name" value={profileDetails.businessName} />
                                        </div>
                                        {/* <!--end::Col--> */}
                                    </div>
                                    <div className="row mb-6">
                                        {/* <!--begin::Label--> */}
                                        <label className="col-lg-4 col-form-label required fw-semibold fs-6">Business Date</label>
                                        {/* <!--end::Label--> */}
                                        {/* <!--begin::Col--> */}
                                        <div className="col-lg-8 fv-row">
                                            <input type="date" name="businessDate" className="form-control form-control-lg form-control-solid" placeholder="Business Date" value={profileDetails.businessDate} />
                                        </div>
                                        {/* <!--end::Col--> */}
                                    </div>
                                    <div className="row mb-6">
                                        {/* <!--begin::Label--> */}
                                        <label className="col-lg-4 col-form-label required fw-semibold fs-6">Select Category</label>
                                        {/* <!--end::Label--> */}
                                        {/* <!--begin::Col--> */}
                                        <div className="col-lg-8 fv-row">
                                        {/* <Select 
                                                className='form-control form-control-lg form-control-solid' 
                                                name='category[]' 
                                                id='category' 
                                                placeholder="Select Category" 
                                                isMulti
                                                options={categoryList} 
                                                value={categoryList.find(option => option.value === profileDetails.category[0].categoryId)}
                                                onChange={(e) => {setCetegorySelectedOptions(e);}}
                                                /> */}
                                        </div>
                                        {/* <!--end::Col--> */}
                                    </div>
                                    {/* <!--end::Input group--> */}
                                </div>
                                {/* <!--end::Card body--> */}
                                {/* <!--begin::Actions--> */}
                                <div className="card-footer d-flex justify-content-end py-6 px-9">
                                    <button type="reset" className="btn btn-light btn-active-light-primary me-2">Discard</button>
                                    <button type="submit" className="btn btn-primary" id="kt_account_profile_details_submit">Save Changes</button>
                                </div>
                                {/* <!--end::Actions--> */}
                            </form>
                            {/* <!--end::Form--> */}
                        </div>
                        {/* <!--end::Content--> */}
                    </div>
                    {/* <!--end::Basic info--> */}
                    {/* <!--begin::Sign-in Method--> */}
                    <div className="card mb-5 mb-xl-10">
                        {/* <!--begin::Card header--> */}
                        <div className="card-header border-0 cursor-pointer" role="button" data-bs-toggle="collapse" data-bs-target="#kt_account_signin_method">
                            <div className="card-title m-0">
                                <h3 className="fw-bold m-0">Sign-in Method</h3>
                            </div>
                        </div>
                        {/* <!--end::Card header--> */}
                        {/* <!--begin::Content--> */}
                        <div id="kt_account_settings_signin_method" className="collapse show">
                            {/* <!--begin::Card body--> */}
                            <div className="card-body border-top p-9">
                                {/* <!--begin::Email Address--> */}
                                <div className="d-flex flex-wrap align-items-center">
                                    {/* <!--begin::Label--> */}
                                    <div id="kt_signin_email">
                                        <div className="fs-6 fw-bold mb-1">Email Address</div>
                                        <div className="fw-semibold text-gray-600">support@keenthemes.com</div>
                                    </div>
                                    {/* <!--end::Label--> */}
                                    {/* <!--begin::Edit--> */}
                                    <div id="kt_signin_email_edit" className="flex-row-fluid d-none">
                                        {/* <!--begin::Form--> */}
                                        <form id="kt_signin_change_email">
                                            <div className="row mb-6">
                                                <div className="col-lg-6 mb-4 mb-lg-0">
                                                    <div className="fv-row mb-0">
                                                        <label htmlFor="emailaddress" className="form-label fs-6 fw-bold mb-3">Enter New Email Address</label>
                                                        <input type="email" className="form-control form-control-lg form-control-solid" id="emailaddress" placeholder="Email Address" name="emailaddress" value="support@keenthemes.com" />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="fv-row mb-0">
                                                        <label htmlFor="confirmemailpassword" className="form-label fs-6 fw-bold mb-3">Confirm Password</label>
                                                        <input type="password" className="form-control form-control-lg form-control-solid" name="confirmemailpassword" id="confirmemailpassword" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="d-flex">
                                                <button id="kt_signin_submit" type="button" className="btn btn-primary me-2 px-6">Update Email</button>
                                                <button id="kt_signin_cancel" type="button" className="btn btn-color-gray-400 btn-active-light-primary px-6">Cancel</button>
                                            </div>
                                        </form>
                                        {/* <!--end::Form--> */}
                                    </div>
                                    {/* <!--end::Edit--> */}
                                    {/* <!--begin::Action--> */}
                                    <div id="kt_signin_email_button" className="ms-auto">
                                        <button className="btn btn-light btn-active-light-primary">Change Email</button>
                                    </div>
                                    {/* <!--end::Action--> */}
                                </div>
                                {/* <!--end::Email Address--> */}
                                {/* <!--begin::Separator--> */}
                                <div className="separator separator-dashed my-6"></div>
                                {/* <!--end::Separator--> */}
                                {/* <!--begin::Password--> */}
                                <div className="d-flex flex-wrap align-items-center mb-10">
                                    {/* <!--begin::Label--> */}
                                    <div id="kt_signin_password">
                                        <div className="fs-6 fw-bold mb-1">Password</div>
                                        <div className="fw-semibold text-gray-600">************</div>
                                    </div>
                                    {/* <!--end::Label--> */}
                                    {/* <!--begin::Edit--> */}
                                    <div id="kt_signin_password_edit" className="flex-row-fluid d-none">
                                        {/* <!--begin::Form--> */}
                                        <form id="kt_signin_change_password" className="form">
                                            <div className="row mb-1">
                                                <div className="col-lg-4">
                                                    <div className="fv-row mb-0">
                                                        <label htmlFor="currentpassword" className="form-label fs-6 fw-bold mb-3">Current Password</label>
                                                        <input type="password" className="form-control form-control-lg form-control-solid" name="currentpassword" id="currentpassword" />
                                                    </div>
                                                </div>
                                                <div className="col-lg-4">
                                                    <div className="fv-row mb-0">
                                                        <label htmlFor="newpassword" className="form-label fs-6 fw-bold mb-3">New Password</label>
                                                        <input type="password" className="form-control form-control-lg form-control-solid" name="newpassword" id="newpassword" />
                                                    </div>
                                                </div>
                                                <div className="col-lg-4">
                                                    <div className="fv-row mb-0">
                                                        <label htmlFor="confirmpassword" className="form-label fs-6 fw-bold mb-3">Confirm New Password</label>
                                                        <input type="password" className="form-control form-control-lg form-control-solid" name="confirmpassword" id="confirmpassword" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-text mb-5">Password must be at least 8 character and contain symbols</div>
                                            <div className="d-flex">
                                                <button id="kt_password_submit" type="button" className="btn btn-primary me-2 px-6">Update Password</button>
                                                <button id="kt_password_cancel" type="button" className="btn btn-color-gray-400 btn-active-light-primary px-6">Cancel</button>
                                            </div>
                                        </form>
                                        {/* <!--end::Form--> */}
                                    </div>
                                    {/* <!--end::Edit--> */}
                                    {/* <!--begin::Action--> */}
                                    <div id="kt_signin_password_button" className="ms-auto">
                                        <button className="btn btn-light btn-active-light-primary">Reset Password</button>
                                    </div>
                                    {/* <!--end::Action--> */}
                                </div>
                                {/* <!--end::Password--> */}
                                {/* <!--begin::Notice--> */}
                                <div className="notice d-flex bg-light-primary rounded border-primary border border-dashed p-6">
                                    {/* <!--begin::Icon--> */}
                                    <i className="ki-outline ki-shield-tick fs-2tx text-primary me-4"></i>
                                    {/* <!--end::Icon--> */}
                                    {/* <!--begin::Wrapper--> */}
                                    <div className="d-flex flex-stack flex-grow-1 flex-wrap flex-md-nowrap">
                                        {/* <!--begin::Content--> */}
                                        <div className="mb-3 mb-md-0 fw-semibold">
                                            <h4 className="text-gray-900 fw-bold">Secure Your Account</h4>
                                            <div className="fs-6 text-gray-700 pe-7">Two-factor authentication adds an extra layer of security to your account. To log in, in addition you'll need to provide a 6 digit code</div>
                                        </div>
                                        {/* <!--end::Content--> */}
                                        {/* <!--begin::Action--> */}
                                        <Link href="#" className="btn btn-primary px-6 align-self-center text-nowrap" data-bs-toggle="modal" data-bs-target="#kt_modal_two_factor_authentication">Enable</Link>
                                        {/* <!--end::Action--> */}
                                    </div>
                                    {/* <!--end::Wrapper--> */}
                                </div>
                                {/* <!--end::Notice--> */}
                            </div>
                            {/* <!--end::Card body--> */}
                        </div>
                        {/* <!--end::Content--> */}
                    </div>
                    {/* <!--end::Sign-in Method--> */}
                </div>
                {/* <!--end::Content--> */}
            </div>
            {/* <!--end::Content wrapper--> */}
        </>
    )
}
function Profile() {
    return <Layout data={<ProfileData />} />
}
export default Profile;