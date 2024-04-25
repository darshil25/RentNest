import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/image/Logo2.svg";
import { fetchData } from "../../reusable";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../../assets/style/style.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import CSS for styling

export default function OtpVerification() {
  const navigate = useNavigate();

  const [otp, setOTP] = useState(["", "", "", ""]);
  const inputRefs = [useRef(null),useRef(null),useRef(null),useRef(null),
useRef(null),]
   

  document.title = "Rentnest | OTP Verification";

    const otpVerficationfun = async (otpArr) => {
      const otpstr = otpArr.join("") || "";
      
      console.log();

      const data = {
        adminId: `${window.sessionStorage.getItem("adminId")}`,
        otp: otpstr,
      };
      

      var response = await fetchData("/admin/otpverification", data);

      if (response.status === 200) {
        navigate("/resetpassword");

        toast.success(response.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          limit:1
        });
        // navigate("/resetpassword");
      } else {
        toast.error(response.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          limit:1
        });
      }
    };


  const handleInputChange = (e, index) => {
  // console.log(index, '---------', e.target.value)
  // setOTP()
  const value = e.target.value

  if (value.length === 1 && index < 4) {
    inputRefs[index + 1].current?.focus()
  }
  const newOTP = [...otp]
  newOTP[index] = value
  setOTP(newOTP)
}


const handleBackspace = (e, index) => {
  if (e.key === 'Backspace' && index > 0) {
    inputRefs[index - 1].current?.focus()
  }
}

  useEffect(() => {
   
  }, []);

  return (
    <>
      <ToastContainer />
      <div className="loginmaindiv">
        <div className="d-flex flex-column flex-root " id="kt_app_root">
          {/* <style>body { backgroundImage: url('assets/media/auth/bg4.jpg') } [data-bs-theme="dark"] body { background-image: url('assets/media/auth/bg4-dark.jpg') }</style> */}

          <div className="d-flex flex-column flex-column-fluid flex-lg-row">
            <div className="d-flex flex-center w-lg-50 pt-15 pt-lg-0 px-10 ">
              <div className="d-flex flex-center flex-lg-start flex-column">
                {/* <a href="../../demo38/dist/index.html" className="mb-7"> */}
                <img alt="Logo" src={logo} />
                {/* </a> */}

                {/* <h2 className="text-white fw-normal m-0">Branding tools designed for your business</h2> */}
              </div>
            </div>

            <div className="d-flex flex-column-fluid flex-lg-row-auto justify-content-center justify-content-lg-end p-12 p-lg-20">
              <div className="bg-body d-flex flex-column align-items-stretch flex-center rounded-4 w-md-600px p-20">
                <div className="d-flex flex-center flex-column flex-column-fluid px-lg-10 pb-15 pb-lg-20">
                  <div className="w-100">
                    <div className="text-center mb-11">
                      <h1 className="text-dark fw-bolder mb-3">
                        OTP Verification
                      </h1>
                      <p className="text-primary">
                        Sent otp. Please check your email.
                      </p>
                    </div>

                    <div className="fv-row mb-8">
                      <label className="form-label fw-bolder fw-center my-3 text-gray-900 fs-6">
                        OTP
                      </label>
                      <div className="d-flex justify-content-center ">
                        {otp.map((digit, index) => (
                          <input
                            id="otps"
                            key={index}
                            type="text"
                            style={{ textAlign: "center" }}
                            className="form-control form-control-solid border border-secondary border-2 mb-3 mb-lg-0 h-45px w-70px mx-4 "
                            value={digit}
                            onChange={(e) => handleInputChange(e, index)}
                            onKeyUp={(e) => handleBackspace(e, index)}
                            ref={inputRefs[index]}
                            maxLength={1}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="row d-flex justify-content-center mt-5">
                      <button
                        type="submit"
                        id="kt_sign_in_submit"
                        className="btn btnButton col-3 mr-3"
                        onClick={() => otpVerficationfun(otp)}
                      >
                        <span className="indicator-label fs-5">Submit</span>
                      </button>
                      <Link
                        id="kt_sign_in_submit"
                        className="btn border border-secondary col-3 ml-2"
                        to="/login"
                      >
                        <span className="indicator-label">Cancel</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
