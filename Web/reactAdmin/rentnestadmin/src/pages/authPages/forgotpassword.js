import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/image/Logo2.svg";
import { fetchData } from "../../reusable";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../../assets/style/style.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import CSS for styling

export default function ForgotPassword() {
  const navigate = useNavigate();

  document.title = "Rentnest | ForgotPassword";

  const validationSchema = Yup.object().shape({
     email: Yup.string()
      .required('Email is required')
      .matches(
        /^(?!.*\.\.)[A-Za-z0-9]+(\.[A-Za-z0-9]+)*@[A-Za-z0-9]+\.[A-Za-z0-9]+$/,
        'Please Enter valid Email'
      ),
  });


  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: async (values) => {
     
      if (navigator.onLine) {
        // online

        var res = await fetchData("/admin/forgotpassword", values);
        
        if (res.status == "200") {
            navigate("/otpverification");
            
            window.sessionStorage.setItem("adminId", res.data[0]["id"]);
            toast.success(res.message, {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
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
                <p className="logintext">RentNest</p>
                {/* </a> */}

                {/* <h2 className="text-white fw-normal m-0">Branding tools designed for your business</h2> */}
              </div>
            </div>

            <div className="d-flex flex-column-fluid flex-lg-row-auto justify-content-center justify-content-lg-end p-12 p-lg-20">
              <div className="bg-body d-flex flex-column align-items-stretch flex-center rounded-4 w-md-600px p-20">
                <div className="d-flex flex-center flex-column flex-column-fluid px-lg-10 pb-15 pb-lg-20">
                  <form onSubmit={formik.handleSubmit} className="form w-100">
                    <div className="text-center mb-11">
                      <h1 className="text-dark fw-bolder mb-3">
                        Forgot Password
                      </h1>
                      <p className="text-secondary">
                        Enter Your Email To Reset Your Password
                      </p>
                    </div>

                    <div className="fv-row mb-8 ">
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
                    <div className="row d-flex justify-content-center mt-5">
                      <button
                        type="submit"
                        id="kt_sign_in_submit"
                        className="btn btnButton col-sm-3 mr-sm-5"
                        // onClick={() => navigate("dashboard")}
                      >
                        <span className="indicator-label ">Submit</span>
                      </button>
                      <Link
                        id="kt_sign_in_submit"
                        className="btn border border-secondary col-sm-3"
                        to="/login"
                      >
                        <span className="indicator-label">Cancel</span>
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
