import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { ToastContainer } from "react-toastify";
import { fetchDataPrivate,toasterrormsg,toastsuccessmsg } from '../config/Reausable';
export default function Register() {
    const navigate = useNavigate();

    const [errors,setErrors]  = useState([{
        firstName:"",
        lastName:"",
        email:"",
        password:"",
        repeatPassword:"",
        }]);

   const  [firstName,setFirstName] = useState("")
   const  [lastName,setLastName] = useState("")
   const  [repeatPassword,setRepeatPassword] = useState("")
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
    
    if (firstName == "" || firstName == undefined || firstName == null) {
        errorTmp[0].firstName = 'FirstName is required.';
        isValid = false;
    } 
    if (lastName == "" || lastName == undefined || lastName == null) {
        errorTmp[0].lastName = 'LastName is required.';
        isValid = false;
    } 
    if (email == "" || email == undefined || email == null) {
        errorTmp[0].email = 'Email is required.';
        isValid = false;
    } 
    if (password == "" || password == undefined || password == null) {
        errorTmp[0].password = 'Password is required.';
        isValid = false;
    } 
    if (repeatPassword == "" || repeatPassword == undefined || repeatPassword == null) {
        errorTmp[0].repeatPassword = 'RepeatPassword is required.';
        isValid = false;
    } else if (password != repeatPassword) {
        errorTmp[0].repeatPassword = 'Password & RepeatPassword not matched.';
        isValid = false;
    }
    setErrors(errorTmp);
    return isValid;

}
//    Sign In Api Call Function
const signUpApiCall = async () => {
    if (handlevalidation()) {
        
        let data = {
            "firstName": firstName,
            "lastName": lastName,
            "email": email,
			"password": password,
			"repeatPassword": repeatPassword
        };
        
		var response = await fetchDataPrivate('post',"user/register",data);
        console.log("response =",response);
		
		if(response.status === 200){
			// window.localStorage.setItem('userId',response.data._id);
            // window.localStorage.setItem('email',response.data.email);
            navigate("/home");
            // toastsuccessmsg(response.message);

		}else{
			toasterrormsg(response.message);
		}
    }
		
};
  return (
    <>
    
    {/* <!-- Register modal --> */}
	<div className="apartment-modal" id="register-modal">
		<div className="modal-dialog p-5 bg-white">
			<div className="modal-content">
				<div className='modal-body'>
					<div className="modal-title">
						<h2>REGISTER<span>.</span></h2>
						<div className="short-title-separator"></div>
					</div>
					<input name="first-name" type="text" className="input-full main-input mb-0 mt-4" placeholder="First name" value={firstName} onChange={(e) => {setFirstName(e.target.value);removeError("firstName")}}/>
                    <p className='error_text'>{errors[0].firstName}</p>
					<input name="last-name" type="text" className="input-full main-input mb-0" placeholder="Last name" value={lastName} onChange={(e) => {setLastName(e.target.value);removeError("lastName")}}/>
                    <p className='error_text'>{errors[0].lastName}</p>
					<input name="email" type="email" className="input-full main-input mb-0" placeholder="Email" value={email} onChange={(e) => {setEmail(e.target.value);removeError("email")}}s/>
                    <p className='error_text'>{errors[0].email}</p>
					<input name="password" type="password" className="input-full main-input mb-0" placeholder="Password" value={password} onChange={(e) => {setPassword(e.target.value);removeError("password")}}/>
                    <p className='error_text'>{errors[0].password}</p>
					<input name="repeat-password" type="password" className="input-full main-input mb-0" placeholder="Repeat Password" value={repeatPassword} onChange={(e) => {setRepeatPassword(e.target.value);removeError("repeatPassword")}}/>
                    <p className='error_text'>{errors[0].repeatPassword}</p>
					<Link onClick={signUpApiCall} className="button-primary button-shadow button-full mt-5">
						<span>Sing Up</span>
						<div className="button-triangle"></div>
						<div className="button-triangle2"></div>
						
					</Link>
					<div className="clearfix"></div>
					<p className="login-or mb-0">OR</p>
					<p className="modal-bottom mt-3">Don't have an account? <Link to="/login" className="register-link">Login</Link></p>
				</div>
			</div>
            {/* <!-- /.modal-content --> */}
		</div>
        {/* <!-- /.modal-dialog --> */}
	</div>
    {/* <!-- /.modal --> */}
    
    </>
  )
}
