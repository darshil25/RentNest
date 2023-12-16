import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { ToastContainer } from "react-toastify";
import { fetchDataPrivate,toasterrormsg,toastsuccessmsg } from '../config/Reausable';
export default function Login() {
    const navigate = useNavigate();

    const [errors,setErrors]  = useState([{
        email:"",
        password:""
        }]);

   const  [email,setEmail] = useState("")
   const  [password,setPassword] = useState("")
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
            "email": email,
			"password": password
        };
        
		var response = await fetchDataPrivate('post',"/signIn",data);
        console.log("response =",response);
		
		if(response.status === 200){
			window.localStorage.setItem('userId',response.data._id);
            window.localStorage.setItem('email',response.data.email);
            navigate("/home");
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
						<h2>Login<span>.</span></h2>
						<div className="short-title-separator"></div>
					</div>
					<input name="login" type="email" className="input-full main-input mb-0 mt-4" placeholder="Email" value={email} onChange={(e) => {setEmail(e.target.value);removeError("email")}} />
                    <p className='error_text'>{errors[0].email}</p>
					<input name="password" type="password" className="input-full main-input mb-0" placeholder="Your Password"  value={password} onChange={(e) => {setPassword(e.target.value);removeError("password")}}/>
                    <p className='error_text'>{errors[0].password}</p>
					<Link onClick={signInApi} className="button-primary button-shadow button-full mt-5">
						<span>Sing In</span>
						<div className="button-triangle"></div>
						<div className="button-triangle2"></div>
						
					</Link>
					<Link to="" className="forgot-link pull-right mt-2">Forgot your password?</Link>
					<div className="clearfix"></div>
					<p className="login-or mb-0">OR</p>
					<p className="modal-bottom mt-3">Don't have an account? <Link to="/register" className="register-link">Register</Link></p>
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
