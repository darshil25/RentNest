import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchDataPrivate } from '../config/Reausable';

import agencyimg from "../assets/images/agency.png"
import logo from "../assets/images/Logo.svg"
import smartphone from "../assets/images/smartphone-2.svg"

export default function Otpverification() {
    document.title = 'Buildify AI | OTP Verification'
    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to the top of the page
    }, []);

    const [code_1, setCode_1] = useState('');
    const [code_2, setCode_2] = useState('');
    const [code_3, setCode_3] = useState('');
    const [code_4, setCode_4] = useState('');
    const [code_5, setCode_5] = useState('');
    const [code_6, setCode_6] = useState('');

    const otp = `${code_1}${code_2}${code_3}${code_4}${code_5}${code_6}`;

    const navigate = useNavigate();

    // verify otp api call
    const verifyOTPApi = async () => {

        let data = { "otp": otp };

        var response = await fetchDataPrivate("api/verifyOTP", data);
        if (response.status === 200) {
            // window.localStorage.setItem('token',response.data[0].token);
            navigate("../resetpassword/");
        } else {
            console.log(response);
            console.log(response.message);
        }
    }

    // Function to handle the input change for each code input
    const handleInputChange = (e, setterFunction) => {
        const value = e.target.value;
        // Ensure the value is a single digit and update the state
        if (/^\d*$/.test(value) && value.length <= 1) {
            setterFunction(value);
            // Focus on the next input after setting the value
            const currentInput = e.target;
            if (currentInput.nextSibling && value !== '') {
                currentInput.nextSibling.focus();
            }
        }
    };


    return (
        <>
            {/* <!--begin::Root--> */}
            <div className="d-flex flex-column flex-root bgImgLogin" id="kt_app_root">
                {/* <!--begin::Page bg image--> */}
                {/* <style>body { background-image: url('../assets/media/auth/bg10.jpeg'); } [data-bs-theme="dark"] body { background-image: url('../assets/media/auth/bg10-dark.jpeg'); }</style> */}
                {/* <!--end::Page bg image--> */}
                {/* <!--begin::Authentication - Sign-up --> */}
                <div className="d-flex flex-column flex-lg-row flex-column-fluid">
                    {/* <!--begin::Aside--> */}
                    <div className="d-flex flex-lg-row-fluid">
                        {/* <!--begin::Content--> */}
                        <div className="d-flex flex-column flex-center pb-0 pb-lg-10 p-10 w-100">
                            {/* <!--begin::Image--> */}
                            <img className="theme-light-show mx-auto mw-100 w-150px w-lg-300px mb-10 mb-lg-20" src={agencyimg} alt="" />
                            {/* <img className="theme-dark-show mx-auto mw-100 w-150px w-lg-300px mb-10 mb-lg-20" src="../assets/media/auth/agency-dark.png" alt="" /> */}
                            {/* <!--end::Image--> */}
                            {/* <!--begin::Title--> */}
                            <img className="theme-light-show mx-auto mw-100 w-250px" src={logo} alt="logo" />
                            <h1 className="text-gray-800 fs-2qx fw-bold text-center mb-7">Fast, Efficient and Productive</h1>
                            {/* <!--end::Title--> */}
                            {/* <!--begin::Text--> */}
                            {/* <div className="text-gray-600 fs-base text-center fw-semibold">In this kind of post, */}
                            {/* <Link to="#" className="opacity-75-hover text-primary me-1">the blogger</Link>introduces a person they’ve interviewed */}
                            {/* <br />and provides some background information about */}
                            {/* <Link to="/" className="opacity-75-hover text-primary me-1">the interviewee</Link>and their */}
                            {/* <br />work following this is a transcript of the interview.</div> */}
                            {/* <!--end::Text--> */}
                        </div>
                        {/* <!--end::Content--> */}
                    </div>
                    {/* <!--begin::Aside--> */}
                    {/* <!--begin::Body--> */}
                    <div className="d-flex flex-column-fluid flex-lg-row-auto justify-content-center justify-content-lg-end p-12">
                        {/* <!--begin::Wrapper--> */}
                        <div className="bg-body d-flex flex-column flex-center rounded-4 w-md-600px p-10">
                            {/* <!--begin::Content--> */}
                            <div className="d-flex flex-center flex-column align-items-stretch h-lg-100 w-md-400px">
                                {/* <!--begin::Wrapper--> */}
                                <div className="d-flex flex-center flex-column flex-column-fluid pb-15 pb-lg-20">
                                    {/* <!--begin::Form--> */}
                                    <div className="form w-100 mb-13">
                                        {/* <!--begin::Icon--> */}
                                        <div className="text-center mb-10">
                                            <img alt="Logo" className="mh-125px" src={smartphone} />
                                        </div>
                                        {/* <!--end::Icon--> */}
                                        {/* <!--begin::Heading--> */}
                                        <div className="text-center mb-10">
                                            {/* <!--begin::Title--> */}
                                            <h1 className="text-dark mb-3">Two-Factor Verification</h1>
                                            {/* <!--end::Title--> */}
                                            {/* <!--begin::Sub-title--> */}
                                            <div className="text-muted fw-semibold fs-5 mb-5">Enter the verification code we sent to</div>
                                            {/* <!--end::Sub-title--> */}
                                            {/* <!--begin::Mobile no--> */}
                                            <div className="fw-bold text-dark fs-3">******7859</div>
                                            {/* <!--end::Mobile no--> */}
                                        </div>
                                        {/* <!--end::Heading--> */}
                                        {/* <!--begin::Section--> */}
                                        <div className="mb-10">
                                            {/* <!--begin::Label--> */}
                                            <div className="fw-bold text-start text-dark fs-6 mb-1 ms-1">Type your 4 digit security code</div>
                                            {/* <!--end::Label--> */}
                                            {/* <!--begin::Input group--> */}
                                            <div className="d-flex flex-wrap flex-stack">
                                                <input type="text" name="code_1" maxLength="1" className="form-control bg-transparent h-60px w-60px fs-2qx text-center mx-1 my-2" value={code_1} onChange={(e) => {setCode_1(e.target.value);handleInputChange(e, setCode_1)}} />
                                                <input type="text" name="code_2" maxLength="1" className="form-control bg-transparent h-60px w-60px fs-2qx text-center mx-1 my-2" value={code_2} onChange={(e) => {setCode_2(e.target.value);handleInputChange(e, setCode_2)}} />
                                                <input type="text" name="code_3" maxLength="1" className="form-control bg-transparent h-60px w-60px fs-2qx text-center mx-1 my-2" value={code_3} onChange={(e) => {setCode_3(e.target.value);handleInputChange(e, setCode_3)}} />
                                                <input type="text" name="code_4" maxLength="1" className="form-control bg-transparent h-60px w-60px fs-2qx text-center mx-1 my-2" value={code_4} onChange={(e) => {setCode_4(e.target.value);handleInputChange(e, setCode_4)}} />
                                                <input type="text" name="code_5" maxLength="1" className="form-control bg-transparent h-60px w-60px fs-2qx text-center mx-1 my-2" value={code_5} onChange={(e) => {setCode_5(e.target.value);handleInputChange(e, setCode_5)}} />
                                                <input type="text" name="code_6" maxLength="1" className="form-control bg-transparent h-60px w-60px fs-2qx text-center mx-1 my-2" value={code_6} onChange={(e) => {setCode_6(e.target.value);handleInputChange(e, setCode_6)}} />
                                            </div>
                                            {/* <!--begin::Input group--> */}
                                        </div>
                                        {/* <!--end::Section--> */}
                                        {/* <!--begin::Submit--> */}
                                        <div className="d-flex flex-center">
                                            <button className="btn btn-lg fw-bold btnButton" onClick={() => { verifyOTPApi() }}>
                                                <span className="indicator-label">Submit</span>
                                                <span className="indicator-progress">Please wait...
                                                    <span className="spinner-border spinner-border-sm align-middle ms-2"></span></span>
                                            </button>
                                        </div>
                                        {/* <!--end::Submit--> */}
                                    </div>
                                    {/* <!--end::Form--> */}
                                    {/* <!--begin::Notice--> */}
                                    <div className="text-center fw-semibold fs-5">
                                        <span className="text-muted me-1">Didn’t get the code ?</span>
                                        <Link to="/" className="link-primary fs-5 me-1">Resend</Link>
                                        <span className="text-muted me-1">or</span>
                                        <Link to="/" className="link-primary fs-5">Call Us</Link>
                                    </div>
                                    {/* <!--end::Notice--> */}
                                </div>
                                {/* <!--end::Wrapper--> */}
                            </div>
                            {/* <!--end::Content--> */}
                        </div>
                        {/* <!--end::Wrapper--> */}
                    </div>
                    {/* <!--end::Body--> */}
                </div>
                {/* <!--end::Authentication - Sign-up--> */}
            </div>
            {/* <!--end::Root--> */}
        </>
    )
}
