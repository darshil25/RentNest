import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { ToastContainer } from "react-toastify";
import { fetchDataPrivate,toasterrormsg,toastsuccessmsg } from '../config/Reausable';
export default function ForgotPassword() {
    const navigate = useNavigate();

    const [errors,setErrors]  = useState([{
        email:"",
       
        }]);

   const  [email,setEmail] = useState("")

   const removeError = (err) =>{
    var tmp = [...errors];
    tmp[0][err] = "";
    setErrors(tmp);
}
   const handlevalidation = () =>{
       var isValid = true;
       var errorTmp = [...errors];
    
    if (email == "" || email == undefined || email == null) {
        errorTmp[0].email = 'Email is required.';
        isValid = false;
    } 
   
    setErrors(errorTmp);
    return isValid;

}
//    Sign In Api Call Function
const signInApi = async () => {
    if (handlevalidation()) {
        
        let data = {
            "email": email,
			
        };
        
		var response = await fetchDataPrivate('post',"user/forgotpassword",data);
       
        
		if(response.status === 200){
            
			window.sessionStorage.setItem("userId", response.message[0].userId);
            window.sessionStorage.setItem("email", response.message[0].email);
            navigate("/otpverify");
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
						<h2>Forgot Password<span>.</span></h2>
						<div className="short-title-separator"></div>
					</div>
					<input name="login" type="email" className="input-full main-input mb-0 mt-4" placeholder="Email" value={email} onChange={(e) => {setEmail(e.target.value);removeError("email")}} />
                    <p className='error_text'>{errors[0].email}</p>
					
					<Link onClick={signInApi} className="button-primary button-shadow button-full mt-5">
						<span>Forgot Password</span>
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
  )
}
