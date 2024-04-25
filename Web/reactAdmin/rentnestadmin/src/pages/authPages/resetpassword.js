import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/image/Logo2.svg";
import { fetchData } from "../../reusable";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../../assets/style/style.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import CSS for styling

export default function ResetPassword() {
  const navigate = useNavigate();
  document.title = "Rentnest | ResetPassword";

 

  const validationSchema = Yup.object().shape({
    newpassword: Yup.string()
      .required("New Password is required")
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
        "Password must be at least 8 characters long and contain at least one alphabet, one number, and one special character"
      ),
    confirmpassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("newpassword")], "Passwords doesn't match"),
  });

  const formik = useFormik({
    initialValues: {
      adminId: window.sessionStorage.getItem("adminId"),
      newpassword:"",
      confirmpassword:"",
    },
    validationSchema,
    onSubmit: async (values) => {
      if (navigator.onLine) {
        // online

        var res = await fetchData("/admin/resetpassword", values);
        
        if (res.status == "200") {
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
          navigate("../login")
        } else {

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
      }
    },
  });


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
                        Reset Password
                      </h1>
                      <p className="text-primary">
                        Sent otp. Please check your email.
                      </p>
                    </div>

                    <div className="fv-row mb-8 ">
                      <input
                        type="text"
                        placeholder="New Password"
                        name="newpassword"
                        // autocomplete="off"
                        className="form-control bg-transparent h-40px"
                        value={formik.values.newpassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.newpassword &&
                      formik.errors.newpassword ? (
                        <div className="text-danger">
                          {formik.errors.newpassword}
                        </div>
                      ) : null}
                    </div>
                    <div className="fv-row mb-8 ">
                      <input
                        type="text"
                        placeholder="Confirm Password"
                        name="confirmpassword"
                        // autocomplete="off"
                        className="form-control bg-transparent h-40px"
                        value={formik.values.confirmpassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.confirmpassword &&
                      formik.errors.confirmpassword ? (
                        <div className="text-danger">
                          {formik.errors.confirmpassword}
                        </div>
                      ) : null}
                    </div>
                    <div className="row d-flex justify-content-center mt-5">
                      <button
                        type="submit"
                        id="kt_sign_in_submit"
                        className="btn btnButton col-3 mr-3"
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
