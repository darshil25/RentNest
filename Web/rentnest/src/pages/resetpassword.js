import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { ToastContainer } from "react-toastify";
import { fetchDataPrivate,toasterrormsg,toastsuccessmsg } from '../config/Reausable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
export default function ResetPassword() {
    const navigate = useNavigate();

    const [errors,setErrors]  = useState([{
        cnfPassword:"",
        password:""
        }]);
    
     const [passwordShown, setPasswordShown] = useState(false);
     const togglePasswordVisibility = () => {
       setPasswordShown(!passwordShown);
     };   

     const [cnfpasswordShown, setPasswordShowncnf] = useState(false);
     const togglePasswordVisibilitycnf = () => {
       setPasswordShowncnf(!cnfpasswordShown);
     }; 

   const  [cnfPassword,setcnfPassword] = useState("")
   const  [password,setPassword] = useState("")
   const removeError = (err) =>{
    var tmp = [...errors];
    tmp[0][err] = "";
    setErrors(tmp);
}
   const handlevalidation = () =>{
       var isValid = true;
       var errorTmp = [...errors];
    
    if (cnfPassword == "" || cnfPassword == undefined || cnfPassword == null) {
        errorTmp[0].cnfPassword = 'Confirm Password is required.';
        isValid = false;
    } 
    if (password == "" || password == undefined || password == null) {
        errorTmp[0].password = 'Password is required.';
        isValid = false;
    } 
    setErrors(errorTmp);
    return isValid;

}
//    Sign In Api Call Function
const signInApi = async () => {
    if (handlevalidation()) {
        
        let data = {
         userId:`${window.sessionStorage.getItem("userId")}`,
          confirmpassword: cnfPassword,
          newpassword: password,
        };
        
		var response = await fetchDataPrivate("post", "user/resetpassword", data);
        console.log("response =",response);
        
		if(response.status === 200){
			window.localStorage.setItem('userId',response.data._id);
           
            navigate("/login");
            toastsuccessmsg(response.message);

		}else{
			toasterrormsg(response.message);
		}
    }
		
};
  return (
    // <!-- Login modal -->
    <>
      <div className="apartment-modal" id="login-modal">
        <div className="modal-dialog p-5 bg-white">
          <div className="modal-content">
            <div>
              <div className="modal-title">
                <h2>
                  Reset Password<span>.</span>
                </h2>
                <div className="short-title-separator"></div>
              </div>
              <div className="my-3" style={{ position: "relative" }}>
                <input
                  name="password"
                  type={passwordShown ? "text" : "password"}
                  className="input-full main-input mb-0"
                  placeholder="New Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    removeError("password");
                  }}
                />
                <FontAwesomeIcon
                  style={{
                    position: "absolute",
                    right: "2%",
                    top: "25%",
                  }}
                  onClick={togglePasswordVisibility}
                  icon={passwordShown ? faEye : faEyeSlash}
                />
                <p className="error_text">{errors[0].password}</p>
              </div>
              <div className="" style={{ position: "relative" }}>
                <input
                  name="login"
                  type={cnfpasswordShown ? "text" : "password"}
                  className="input-full main-input mb-0 mt-4"
                  placeholder="Confirm Password"
                  value={cnfPassword}
                  onChange={(e) => {
                    setcnfPassword(e.target.value);
                    removeError("cnfPassword");
                  }}
                />
                <FontAwesomeIcon
                  style={{
                    position: "absolute",
                    right: "2%",
                    top: "55%",
                  }}
                  onClick={togglePasswordVisibilitycnf}
                  icon={cnfpasswordShown ? faEye : faEyeSlash}
                />
                <p className="error_text">{errors[0].cnfPassword}</p>
              </div>

              <Link
                onClick={signInApi}
                className="button-primary button-shadow button-full mt-5"
              >
                <span>ResetPassword</span>
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
    // <!-- /.modal -->
  );
}
