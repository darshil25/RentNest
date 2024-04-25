import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/image/Logo2.svg'
import { fetchData } from '../reusable';
import { useFormik } from "formik";
import * as Yup from "yup";
import '../assets/style/style.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for styling
import '../pages/authPages/forgotpassword'

export default function Login() {

  const navigate = useNavigate();
  const [loader, setloder] = useState(false)

  document.title = "Rentnest | Login";

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  // const login = async (event) =>{
  //   console.log("**********",event);
  //   var res = await fetchData("admin/login", {
  //     email: "uchihaitachi@gmail.com",
  //     password: "Ghoul23@12",
  //   });
  //   console.log("---------",res);
  // }

const formik = useFormik({
  initialValues: {
    email: "",
    password: "",
  },
  validationSchema,
  onSubmit: async (values) => {
    setloder(true);
      if (navigator.onLine) {
        // online

        var res = await fetchData("login", values);
        if (res.status == "200") {
          setTimeout(() => {
            window.sessionStorage.setItem("route", "dashboard");
            window.sessionStorage.setItem("admin", JSON.stringify(res.data[0]));
            navigate("../dashboard");
          }, 1000);
        } else {
          // console.log("Form submitted:", res);
          toast.error(res.message, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
      } else {
        // setisonline(true);
        window.sessionStorage.setItem("route", "login");
        window.location.href = "error";

      }

  },
});

useEffect(() => {
    if (navigator.onLine) {
      // online
    } else {
      // setisonline(true);
      window.location.href = "error";
      window.sessionStorage.setItem("route", "login");
    }
  }, [])

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
                {/* <img alt="Logo" src={logo} /> */}
                <p className='logintext'>RentNest</p>
                {/* </a> */}

                {/* <h2 className="text-white fw-normal m-0">Branding tools designed for your business</h2> */}
              </div>
            </div>

            <div className="d-flex flex-column-fluid flex-lg-row-auto justify-content-center justify-content-lg-end p-12 p-lg-20">
              <div className="bg-body d-flex flex-column align-items-stretch flex-center rounded-4 w-md-600px p-20">
                <div className="d-flex flex-center flex-column flex-column-fluid px-lg-10 pb-15 pb-lg-20">
                  <form onSubmit={formik.handleSubmit} className="form w-100">
                    <div className="text-center mb-11">
                      <h1 className="text-dark fw-bolder mb-3">Sign In</h1>
                    </div>

                    <div className="fv-row mb-8">
                      <input
                        type="text"
                        placeholder="Email"
                        name="email"
                        // autocomplete="off"
                        className="form-control bg-transparent h-40px"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.email && formik.errors.email ? (
                        <div className="text-danger">{formik.errors.email}</div>
                      ) : null}
                    </div>

                    <div className="fv-row mb-3">
                      <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        // autocomplete="off"
                        className="form-control bg-transparent h-40px"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.password && formik.errors.password ? (
                        <div className="text-danger">
                          {formik.errors.password}
                        </div>
                      ) : null}
                    </div>

                    <div className="d-flex flex-stack flex-wrap gap-3 fs-base fw-semibold mt-5 mb-2">
                      <div></div>

                      <Link to="../../../forgot" className='text-primary'>
                        Forgot Password ?
                      </Link>
                    </div>

                    <div className="d-grid">
                      <button
                        type="submit"
                        id="kt_sign_in_submit"
                        className="btn btnButton"
                        // onClick={() => navigate("dashboard")}
                      >
                        <span className="indicator-label">Sign In</span>

                        {loader && (
                          <span className="spinner-border spinner-border-sm align-middle ms-2 "></span>
                        )}
                      </button>
                    </div>
                  </form>
                </div>

                <div className="d-flex flex-stack px-lg-10">
                  {/* <div className="d-flex fw-semibold text-primary fs-base gap-5">
                    <a href="#">Terms</a>
                    <a href="#">Plans</a>
                    <a href="#">Contact Us</a>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
