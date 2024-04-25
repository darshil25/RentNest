import React, { useRef, useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import { fetchDataPrivate,toasterrormsg,toastsuccessmsg } from '../config/Reausable';
export default function OTPVerify() {
    const navigate = useNavigate();

     const [otp, setOTP] = useState(["", "", "", ""]);
  const inputRefs = [useRef(null),useRef(null),useRef(null),useRef(null),
useRef(null),]
   

  document.title = "Rentnest | OTP Verification";

    const otpVerficationfun = async (otpArr) => {
      const otpstr = otpArr.join("") || "";

      const data = {
        userId: `${window.sessionStorage.getItem("userId")}`,
        otp: otpstr,
      };
      console.log(data);
      var response = await fetchDataPrivate('post',"user/otpverification",data);
      console.log(response);

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
        navigate("/resetpassword");
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


//    Sign In Api Call Function
// const signInApi = async () => {
//     if (handlevalidation()) {
        
//         let data = {
//             "email": email,
			
//         };
        
// 		var response = await fetchDataPrivate('post',"user/forgotpassword",data);
//         console.log("response =",response);
        
// 		if(response.status === 200){
// 			window.localStorage.setItem('userId',response.data._id);
//             window.localStorage.setItem('email',response.data.email);
//             navigate("/");
//             toastsuccessmsg(response.message);

// 		}else{
// 			toasterrormsg(response.message);
// 		}
//     }
		
// };

  return (
    (
      // <!-- Login modal -->
      <>
        <div className="apartment-modal" id="login-modal">
          <div className="modal-dialog p-5 bg-white">
            <div className="modal-content">
              <div>
                <div className="modal-title">
                  <h2>
                    OTP Verification<span>.</span>
                  </h2>
                  <div className="short-title-separator"></div>
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
                        style={{ textAlign: "center", height:"43px"}}
                        className="form-control form-control-solid border border-secondary border-2 mb-3 mb-lg-0  w-70px mx-4 "
                        value={digit}
                        onChange={(e) => handleInputChange(e, index)}
                        onKeyUp={(e) => handleBackspace(e, index)}
                        ref={inputRefs[index]}
                        maxLength={1}
                      />
                    ))}
                  </div>
                </div>

                <Link
                  onClick={() => otpVerficationfun(otp)}
                  className="button-primary button-shadow button-full mt-5"
                >
                  <span>Otp Check</span>
                  <div className="button-triangle"></div>
                  <div className="button-triangle2"></div>
                </Link>
              </div>
            </div>
            {/* <!-- /.modal-content --> */}
          </div>
          {/* <!-- /.modal-dialog --> */}
        </div>
        <ToastContainer />
      </>
    )
  );
  // <!-- /.modal -->
}
