import React, { useEffect, useState } from "react";
import Header from "../header/header";
import Sidebar from "../sidebar/sidebar";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { fetchData, fetchFormData } from "../../reusable";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from "../footer/footer";

export default function EditAdmin() {

  document.title = "Rentnest | EditAdmin";
  
  const navigate = useNavigate();
  const[showImage ,setshowImage] = useState('');
  var session = window.sessionStorage.getItem("admin");

  var adminDetails = {
    adminId: "",
    name: "",
    email: "",
    profile: "",
    mobileNumber: "",
  };

    // if (session !== null) {
    //   adminDetails = JSON.parse(session);
    // }




  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Full Name is required"),
    email: Yup.string()
      .required("Email is required")
      .matches(
        /^(?!.*\.\.)[A-Za-z0-9]+(\.[A-Za-z0-9]+)*@[A-Za-z0-9]+\.[A-Za-z0-9]+$/,
        "Please Enter valid Email"
      ),
    mobileNumber: Yup.string()
      .required("Mobile Number is required")
      .matches(/^[1-9]{1}[0-9]{5,15}$/, "Please Enter valid Phone Number"),
  });
  
  var initialValues = {
    adminId: adminDetails.adminId.toString(),
    name: adminDetails.name == "" ? "" : adminDetails.name,
    email: adminDetails.email == "" ? "" : `${adminDetails.email}`,
    profile: adminDetails.profile == "" ? null : null,
    mobileNumber:
      adminDetails.mobileNumber == "" ? "" : `${adminDetails.mobileNumber}`,
  };

  const handleImageChange = (event) => {
    if (event.currentTarget.files) {
      formik.setFieldValue("profile", event.currentTarget.files[0]);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {

      var formdata = new FormData();
      formdata.append("adminId", values.adminId);
      formdata.append("name", values.name);
      formdata.append("email", values.email);
      formdata.append("mobileNumber", values.mobileNumber);
      if (values.profile) {
        formdata.append("profile", values.profile);
      }
      
        var res = await fetchFormData("/admin/adminedit", formdata);
        if (res.status == "200") {
          
          var view = await fetchData("/admin/adminviewdetail", {adminId:adminDetails.adminId.toString()});
          window.sessionStorage.setItem("admin", JSON.stringify(view.data[0]));
          navigate("../viewadmindeatil");
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
    },
  });

   useEffect(() => {
    setshowImage(`${adminDetails.profile}`)
  }, [])

  return (
    <>
      <ToastContainer />
      <div className="d-flex">
        <Sidebar />
        <div className="container">
          <Header />

          <div
            id="kt_account_settings_profile_details"
            className="collapse show"
          >
            <form
              id="kt_account_profile_details_form"
              onSubmit={formik.handleSubmit}
              className="form fv-plugins-bootstrap5 fv-plugins-framework"
            >
              <div className="card-body border-top p-9">
                <div className="row mb-6">
                  <label className="col-lg-4 col-form-label fw-semibold fs-6">
                    Avatar
                  </label>

                  <div className="col-lg-8">
                    <div
                      className="image-input image-input-outline image-input-empty blankIMG"
                      data-kt-image-input="true"
                    >
                      <div
                        className="image-input-wrapper w-125px h-125px"
                        style={{ backgroundImage: `url(${showImage})` }}
                      ></div>

                      <label
                        className="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
                        data-kt-image-input-action="change"
                        data-bs-toggle="tooltip"
                        aria-label="Change avatar"
                        data-bs-original-title="Change avatar"
                        data-kt-initialized="1"
                      >
                        <i className="ki-outline ki-pencil fs-7"></i>

                        <input
                          type="file"
                          name="avatar"
                          accept=".png, .jpg, .jpeg"
                          onChange={(e) => handleImageChange(e)}
                        />
                      </label>

                      <span
                        className="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
                        data-kt-image-input-action="cancel"
                        data-bs-toggle="tooltip"
                        aria-label="Cancel avatar"
                        data-bs-original-title="Cancel avatar"
                        data-kt-initialized="1"
                      >
                        <i className="ki-outline ki-cross fs-2"></i>
                      </span>

                      <span
                        className="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
                        data-kt-image-input-action="remove"
                        data-bs-toggle="tooltip"
                        aria-label="Remove avatar"
                        data-bs-original-title="Remove avatar"
                        data-kt-initialized="1"
                      >
                        <i className="ki-outline ki-cross fs-2"></i>
                      </span>
                    </div>

                    <div className="form-text">
                      Allowed file types: png, jpg, jpeg.
                    </div>
                  </div>
                </div>

                <div className="row mb-6">
                  <label className="col-lg-4 col-form-label required fw-semibold fs-6">
                    Full Name
                  </label>

                  <div className="col-lg-8">
                    <div className="row">
                      <div className="col-lg-12 fv-row fv-plugins-icon-container fv-plugins-bootstrap5-row-invalid">
                        <input
                          type="text"
                          name="name"
                          className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                          placeholder="Full Name"
                          value={formik.values.name}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.touched.name && formik.errors.name ? (
                          <div className="text-danger">
                            {formik.errors.name}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row mb-6">
                  <label className="col-lg-4 col-form-label required fw-semibold fs-6">
                    Email
                  </label>
                  <div className="col-lg-8 fv-row fv-plugins-icon-container">
                    <input
                      type="text"
                      name="email"
                      className="form-control form-control-lg form-control-solid"
                      placeholder="Email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.email && formik.errors.email ? (
                      <div className="text-danger">{formik.errors.email}</div>
                    ) : null}
                  </div>
                </div>

                <div className="row mb-6">
                  <label className="col-lg-4 col-form-label fw-semibold fs-6">
                    <span className="required">Mobile Number</span>
                    <span
                      className="ms-1"
                      data-bs-toggle="tooltip"
                      aria-label="Phone number must be active"
                      data-bs-original-title="Phone number must be active"
                      data-kt-initialized="1"
                    >
                      <i className="ki-outline ki-information-5 text-gray-500 fs-6"></i>
                    </span>
                  </label>

                  <div className="col-lg-8 fv-row fv-plugins-icon-container">
                    <input
                      type="tel"
                      name="mobileNumber"
                      className="form-control form-control-lg form-control-solid"
                      placeholder="Mobile number"
                      value={formik.values.mobileNumber}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.mobileNumber &&
                    formik.errors.mobileNumber ? (
                      <div className="text-danger">
                        {formik.errors.mobileNumber}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="card-footer d-flex justify-content-end py-6 px-9">
                <Link
                  to="../viewadmindeatil"
                  className="btn btnButtongrey me-2 fs-5"
                >
                  Discard
                </Link>
                <button
                  type="submit"
                  className="btn btnButton fs-5"
                  id="kt_account_profile_details_submit"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
          <div className="h-30px"></div>
          <Footer></Footer>
        </div>
      </div>
    </>
  );
}
