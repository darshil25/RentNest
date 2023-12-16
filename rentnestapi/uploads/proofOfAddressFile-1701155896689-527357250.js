import React, { useEffect, useState } from 'react';

import agencyimg from "../assets/images/agency.png"
import googleimg from "../assets/images/google-icon.svg"
import appleimg from "../assets/images/apple-black.svg"
import logo from "../assets/images/Logo.svg"
import {Link, useNavigate} from 'react-router-dom';
import { fetchDataPrivate } from '../config/Reausable';
import { useForm } from 'react-hook-form';



export default function Login() {
	document.title = 'Buildify AI | Login'
	useEffect(() => {
		window.scrollTo(0, 0); // Scroll to the top of the page
	  }, []);

	  const [email,setEmail] = useState('');
	  const [password,setPassword] = useState('');

	  const navigate = useNavigate();

	const { 
		register, 
		handleSubmit, 
		formState: { errors } 
	} = useForm();
	
	const signInApi = async (value) => {
		// Handle form submission logic here
		setEmail(value.email)
		setPassword(value.password);

		let data = {
			"email": value.email,
			"password": value.password
			};

		var response = await fetchDataPrivate("login",data);
		
		if(response.status === 200){
			window.localStorage.setItem('token',response.data[0].token);
			navigate("../dashboard/");
			console.log(response);
		}else{
			console.log(response);
		}
		
	};

	  
	  // login api call
	//   const signInApi = async () => {
		
	// 	let data = {"email": email,
	// 				"password": password
	// 				};
    
    // 	var response = await fetchDataPrivate("login",data);
	// 	console.log(response);
	// 	if(response.status === 200){
	// 		window.localStorage.setItem('token',response.data[0].token);
	// 		navigate("./dashboard/");
	// 	}else{
	// 		console.log(response);
	// 		console.log(response.message);
	// 	}
	//   }
	
  return (
    <>
    {/* <!--begin::Root--> */}
		<div className="d-flex flex-column flex-root bgImgLogin" id="kt_app_root">
			{/* <!--begin::Page bg image--> */}
			{/* <style>body { background-image: url('../assets/media/auth/bg10.jpeg'); } [data-bs-theme="dark"] body { background-image: url('../assets/media/auth/bg10-dark.jpeg'); }</style> */}
			{/* <!--end::Page bg image--> */}
			{/* <!--begin::Authentication - Sign-in --> */}
			<div className="d-flex flex-column flex-lg-row flex-column-fluid">
				{/* <!--begin::Aside--> */}
				<div className="d-flex flex-lg-row-fluid">
					{/* <!--begin::Content--> */}
					<div className="d-flex flex-column flex-center pb-0 pb-lg-10 p-10 w-100">
						{/* <!--begin::Image--> */}
						<img className="theme-light-show mx-auto mw-100 w-150px w-lg-300px mb-10 mb-lg-20" src={agencyimg} alt="agencyimg" />
						{/* <img className="theme-dark-show mx-auto mw-100 w-150px w-lg-300px mb-10 mb-lg-20" src={agencydarkimg} alt="agencyimg" /> */}
						{/* <!--end::Image--> */}
						{/* <!--begin::Title--> */}
						<img className="theme-light-show mx-auto mw-100 w-250px" src={logo} alt="logo" />
						<h4 className="text-gray-800 fs-2qx fw-bold text-center mb-7">Fast, Efficient and Productive</h4>
						{/* end::Title */}
						{/* <!--begin::Text--> */}
						{/* <div className="text-gray-600 fs-base text-center fw-semibold">In this kind of post, */}
						{/* <Link to="/" className="opacity-75-hover text-primary me-1">the blogger</Link>introduces a person they’ve interviewed */}
						{/* <br />and provides some background information about */}
						{/* <Link to="/" className="opacity-75-hover text-primary me-1">the interviewee</Link>and their */}
						{/* <br />work following this is a transcript of the interview.</div> */}
						{/* <!--end::Text--> */}
					</div>
					{/* <!--end::Content--> */}
				</div>
				{/* <!--begin::Aside-->
				<!--begin::Body--> */}
				<div className="d-flex flex-column-fluid flex-lg-row-auto justify-content-center justify-content-lg-end p-12">
					{/* <!--begin::Wrapper--> */}
					<div className="bg-body d-flex flex-column flex-center rounded-4 w-md-600px p-10">
						{/* <!--begin::Content--> */}
						<div className="d-flex flex-center flex-column align-items-stretch h-lg-100 w-md-400px">
							{/* <!--begin::Wrapper--> */}
							<div className="d-flex flex-center flex-column flex-column-fluid pb-15 pb-lg-20">
								{/* <!--begin::Form--> */}
								<form className="form w-100" onSubmit={handleSubmit(signInApi)}>
									{/* <!--begin::Heading--> */}
									<div className="text-center mb-11">
										{/* <!--begin::Title--> */}
										<h1 className="text-dark fw-bolder mb-3">Sign In</h1>
										{/* <!--end::Title-->
										<!--begin::Subtitle--> */}
										<div className="text-gray-500 fw-semibold fs-6">Your Social Campaigns</div>
										{/* <!--end::Subtitle=--> */}
									</div>
									{/* <!--begin::Heading--> 
									<!--begin::Login options--> */}
									<div className="row g-3 mb-9">
										{/* <!--begin::Col--> */}
										<div className="col-md-6">
											{/* <!--begin::Google link=--> */}
											<Link to="/" className="btn btn-flex btn-outline btn-text-gray-700 btn-active-color-primary bg-state-light flex-center text-nowrap w-100">
											<img alt="Logo" src={googleimg} className="h-15px me-3" />Sign in with Google</Link>
											{/* <!--end::Google link=--> */}
										</div>
										{/* <!--end::Col--> */}
										{/* <!--begin::Col--> */}
										<div className="col-md-6">
											{/* <!--begin::Google link=--> */}
											<Link to="/" className="btn btn-flex btn-outline btn-text-gray-700 btn-active-color-primary bg-state-light flex-center text-nowrap w-100">
											<img alt="Logo" src={appleimg} className="theme-light-show h-15px me-3" />
											{/* <img alt="Logo" src={appleimg} className="theme-dark-show h-15px me-3" /> */}
                                            Sign in with Apple</Link>
											{/* <!--end::Google link=--> */}
										</div>
										{/* <!--end::Col--> */}
									</div>
									{/* <!--end::Login options--> */}
									{/* <!--begin::Separator--> */}
									<div className="separator separator-content my-14">
										<span className="w-125px text-gray-500 fw-semibold fs-7">Or with email</span>
									</div>
									{/* <!--end::Separator-->
									<!--begin::Input group=--> */}
									<div className="fv-row mb-8">
										{/* <!--begin::Email--> */}
										<input
										type="text"
										placeholder="Email"
										name="email"
										autoComplete="off"
										className="form-control bg-transparent"
										value={register.email}
										
										{...register('email', { required: true,pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}(?:\.[A-Z]{2,})?$/i })}
										/>
										{/* Display error message if validation fails */}
										{errors.email && errors.email.type == "required" && (<span className='error_text'>Email Is Required.</span>)}
										{errors.email && errors.email.type == "pattern" && (<span className='error_text'>Enter Valid Email.</span>)}
										{/* <!--end::Email--> */}
									</div>
									{/* <!--end::Input group=--> */}
									<div className="fv-row mb-3">
										{/* <!--begin::Password--> */}
										<input 
										type="password" 
										placeholder="Password" 
										name="password" 
										autoComplete="off" 
										className="form-control bg-transparent" 
										value={register.password}  
										
										{...register('password', { required: true,
											pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/ })}
										/>
										{/* Display error message if validation fails */}
										{errors.password && errors.password.type === "required" && (<span className='error_text'>Password Is Required.</span>)}
										{errors.password && errors.password.type === "pattern" && (<span className='error_text'>Use 8 or more characters with a mix of letters, numbers & symbols.</span>)}
										{/* <!--end::Password--> */}
									</div>
									{/* <!--end::Input group=-->
									<!--begin::Wrapper--> */}
									<div className="d-flex flex-stack flex-wrap gap-3 fs-base fw-semibold mb-8">
										<div></div>
										{/* <!--begin::Link--> */}
										<Link to="/forgotpassword" className="link-primary">Forgot Password ?</Link>
										{/* <!--end::Link--> */}
									</div>
									{/* <!--end::Wrapper-->
									<!--begin::Submit button--> */}
									<div className="d-grid mb-10">
										<button className="form-control bg-primary" type='Submit' style={{color: 'white'}}>
											{/* <!--begin::Indicator label--> */}
											<span className="indicator-label">Sign In</span>
											{/* <!--end::Indicator label--> */}
											{/* <!--begin::Indicator progress--> */}
											<span className="indicator-progress">Please wait...
											<span className="spinner-border spinner-border-sm align-middle ms-2"></span></span>
											{/* <!--end::Indicator progress--> */}
										</button>
									</div>
									{/* <!--end::Submit button--> */}
									{/* <!--begin::Sign up--> */}
									<div className="text-gray-500 text-center fw-semibold fs-6">Not a Member yet?
									<Link to="/signup" className="link-primary">Sign up</Link></div>
									{/* <!--end::Sign up--> */}
								</form>
								{/* <!--end::Form--> */}
							</div>
							{/* <!--end::Wrapper--> */}
						</div>
						{/* <!--end::Content--> */}
					</div>
					{/* <!--end::Wrapper--> */}
				</div>
				{/* <!--end::Body--> */}
			</div>
			{/* <!--end::Authentication - Sign-in--> */}
		</div>
		{/* <!--end::Root--> */}
    </>

  )
}
