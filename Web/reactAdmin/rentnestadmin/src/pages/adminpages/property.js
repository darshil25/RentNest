import React, { useEffect, useState } from "react";
import Sidebar from "../sidebar/sidebar";
import Header from "../header/header";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCancel, faCheck, faTrash } from "@fortawesome/free-solid-svg-icons";
import { fetchData, fetchFormData } from "../../reusable";
import Swal from "sweetalert2";
import Select from "react-select";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../footer/footer";

export default function Property() {
  document.title = "Rentnest | Setting";

  const location = useLocation();
  const propertEdit = location.state ? location.state.propertEdit : "";
  const [typevalue,settypevalue] = useState("$");
  const[showImage ,setshowImage] = useState('');
    const [PreviewImage, setPreviewImage] = useState("");
    const [propertyType, setpropertyType] = useState("");
    const [bhk, setbhk] = useState("");
    const [furniture, setfurniture] = useState("");
    const [bath, setbath] = useState("");

  const navigate = useNavigate();
  

  // const handleImageChange = (event) => {
  //   if (event.currentTarget.files) {
  //     formik.setFieldValue("image", event.currentTarget.files[0]);
  //   }
  // };

   const handleChangepropertyType = (e) => {
    
     setpropertyType(e.target.value);
   };

   const handleChangebhk = (e) => {
    
     setbhk(e.target.value);
   };

   const handleChangefurniture = (e) => {
    
     setfurniture(e.target.value);
   };

   const handleChangebath = (e) => {
    
     setbath(e.target.value);
   };

  const handleImageChange = (event) => {
    const selectedImage = event.currentTarget.files[0] || "";
    const reader = new FileReader();
    if (
      reader.result == "" ||
      reader.result == null ||
      reader.result == undefined
    ) {
      reader.onload = (e) => {
        const imageDataUrl = e.target?.result;
        setPreviewImage(imageDataUrl);
      };
      reader.readAsDataURL(selectedImage);
    } else {
    }

    if (event.currentTarget.files) {
      formik.setFieldValue("image", event.currentTarget.files[0]);
    }
    setshowImage(event.currentTarget.files[0]["name"]);
  };

  const options = [
    { value: "Rajkot", label: "Rajkot" },
    { value: "Junagadh", label: "Junagadh" },
    { value: "Surat", label: "Surat" },
    { value: "Ahmedabad", label: "Ahmedabad" },
    { value: "Bhavnagar", label: "Bhavnagar" },
    { value: "Jamnagar", label: "Jamnagar" },
    { value: "Vadodara", label: "Vadodara" },
    { value: "Delhi", label: "Delhi" },
    { value: "Bengaluru", label: "Bengaluru" },
    { value: "Mumbai", label: "Mumbai" },
    { value: "Chennai", label: "Chennai" },
    { value: "Kolkata", label: "Kolkata" },
    { value: "Jaipur", label: "Jaipur" },
    { value: "Kashmir", label: "Kashmir" },
    { value: "Bhopal", label: "Bhopal" },
    { value: "Srinagar", label: "Srinagar" },
    { value: "Cochin", label: "Cochin" },
    { value: "Goa", label: "Goa" },
  ];

  const validationSchema = Yup.object().shape({
    propertyName: Yup.string().required("PropertyName is required"),
    price: Yup.string().required("Price is required"),
    description: Yup.string().required("Description is required"),
    mobileNumber: Yup.string().required("mobileNumber is required"),
    builtUpArea: Yup.string().required("builtUpArea is required"),
  });

   const handleSelectChange = (selectedOption) => {
     // Formik setFieldValue function to update the field value
     formik.setFieldValue("location", selectedOption.value);
     settypevalue(selectedOption.value);
   };

   const initialValues= {
      propertyName: propertEdit._id == "" || propertEdit._id == null ? "" : propertEdit.propertyName,
      location: propertEdit._id == "" || propertEdit._id == null ? "" : propertEdit.location,
      image: "",
      price: propertEdit._id == "" || propertEdit._id == null ? "" : propertEdit.price,
      description: propertEdit._id == "" || propertEdit._id == null ? "" : propertEdit.description,
      // mobileNumber:propertEdit._id == "" || propertEdit._id == null ? "" : propertEdit.mobileNumber,
      mobileNumber:"",
      // builtUpArea:propertEdit._id == "" || propertEdit._id == null ? "" : propertEdit.builtUpArea,
      builtUpArea:"",
    }
     if (propertEdit._id != "" && propertEdit._id != null && propertEdit._id != undefined) {
    initialValues["propertyId"] = propertEdit._id;
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      var formdata = new FormData();
    
      formdata.append("propertyName", values.propertyName);
      formdata.append("location", values.location);
      formdata.append("price", values.price);
      formdata.append("description", values.description);
      formdata.append("propertyType",propertyType);
      formdata.append("bhk",bhk);
      formdata.append("furniture",furniture);
      formdata.append("builtUpArea",values.builtUpArea);
      formdata.append("mobileNumber",values.mobileNumber);
      formdata.append("bath",bath);

      if (values.propertyId) {
        // formdata.append("image", values.profile);
        formdata.append("propertyId", values.propertyId);
      }
     
      if (values.image) {
        formdata.append("image", values.image);
      }
      console.log(values);
      var res = await fetchFormData("addProperty", formdata);
      
      if (res.status == "200") {
        //   console.log("Form submitted:", res);
        toast.success(res.message, {
          position: "top-right",
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        navigate("../viewproperty");
      } else {
        //   console.log("Form submitted:", res);
        toast.error(res.message, {
          position: "top-right",
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
    //    login();
  }, []);

  return (
    <>
      <ToastContainer />
      <div className="d-flex">
        <Sidebar menuId={4} />
        <div className="container-fluid">
          <Header />
          <div className="card mb-5 mb-xl-10" id="kt_profile_details_view">
            {/* <!--begin::Card header--> */}
            <div className="card-header cursor-pointer">
              {/* <!--begin::Card title--> */}
              <div className="card-title m-0">
                <h3 className="fw-bold m-0">Property</h3>
              </div>
              {/* <!--end::Card title--> */}
            </div>
            {/* <!--begin::Card header--> */}
            {/* <!--begin::Card body--> */}
            <div className="card-body p-9">
              {/* <!--begin::Row--> */}
              <div className="row mb-7">
                {/* <!--begin::Label--> */}
                <h3 className="col-lg-4  text-muted">Add Property</h3>
                {/* <!--end::Label--> */}
                {/* <!--begin::Col--> */}
                <div className="col-lg-8">
                  <span className="fw-bold fs-6 text-gray-800">
                    {/* {server.firstName} {server.middleName} {server.lastName} */}
                  </span>
                </div>
                {/* <!--end::Col--> */}
              </div>

              <div className="row mb-7 p-5">
                <form
                  id="kt_account_profile_details_form"
                  onSubmit={formik.handleSubmit}
                  className="form fv-plugins-bootstrap5 fv-plugins-framework"
                >
                  <div className="card-body border-top p-9">
                    <div className="row mb-6">
                      <label className="col-lg-4 col-form-label required fw-semibold fs-6">
                        Property Image
                      </label>

                      <div className="col-lg-8">
                        <div
                          className="image-input image-input-outline image-input-empty blankIMG"
                          data-kt-image-input="true"
                        >
                          <div
                            className="image-input-wrapper w-125px h-125px"
                            style={{ backgroundImage: `url(${PreviewImage})` }}
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
                        Property Name
                      </label>

                      <div className="col-lg-8">
                        <div className="row">
                          <div className="col-lg-12 fv-row fv-plugins-icon-container fv-plugins-bootstrap5-row-invalid">
                            <input
                              type="text"
                              name="propertyName"
                              className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                              placeholder="Property Name"
                              value={formik.values.propertyName}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                            />
                            {formik.touched.propertyName &&
                            formik.errors.propertyName ? (
                              <div className="text-danger mt-0">
                                {formik.errors.propertyName}
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row mb-6">
                      <label className="col-lg-4 col-form-label required fw-semibold fs-6">
                        Location
                      </label>
                      <div className="col-lg-3">
                        <Select
                          name="location"
                          value={options.find(
                            (option) => option.value === formik.values.location
                          )}
                          onChange={handleSelectChange}
                          options={options}
                        />
                        {formik.touched.location && formik.errors.location ? (
                          <div className="text-danger mt-2">
                            {formik.errors.location}
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <div className="row mb-6">
                      <label className="col-lg-4 col-form-label fw-semibold fs-6">
                        <span className="required">Property Type</span>
                        <span
                          className="ms-1"
                          data-bs-toggle="tooltip"
                          aria-label="Phone number must be active"
                          data-bs-original-title="Phone number must be active"
                          data-kt-initialized="1"
                        ></span>
                      </label>

                      <div className="col-lg-8 fv-row fv-plugins-icon-container">
                        <select
                          className="form-control form-control-lg form-control-solid"
                          name="propertyType"
                          value={propertyType}
                          onChange={handleChangepropertyType}
                        >
                          <option>Select Property Type</option>
                          <option>Apartment</option>
                          <option>Row House</option>
                          <option>Bungalow</option>
                          <option>Single Family house</option>
                          <option>duplex</option>
                          <option>Townhouse</option>
                          <option>Cottage</option>
                        </select>
                      </div>
                    </div>

                    <div className="row mb-6">
                      <label className="col-lg-4 col-form-label fw-semibold fs-6">
                        <span className="required">BHK</span>
                        <span
                          className="ms-1"
                          data-bs-toggle="tooltip"
                          aria-label="Phone number must be active"
                          data-bs-original-title="Phone number must be active"
                          data-kt-initialized="1"
                        ></span>
                      </label>

                      <div className="col-lg-8 fv-row fv-plugins-icon-container">
                        <select
                          className="form-control form-control-lg form-control-solid"
                          name="bhk"
                          value={bhk}
                          onChange={handleChangebhk}
                        >
                          <option>Select BHK Types</option>
                          <option>1 BHK</option>
                          <option>2 BHK</option>
                          <option>3 BHK</option>
                          <option>4 BHK</option>
                        </select>
                      </div>
                    </div>

                    <div className="row mb-6">
                      <label className="col-lg-4 col-form-label fw-semibold fs-6">
                        <span className="required">Furniture</span>
                        <span
                          className="ms-1"
                          data-bs-toggle="tooltip"
                          aria-label="Phone number must be active"
                          data-bs-original-title="Phone number must be active"
                          data-kt-initialized="1"
                        ></span>
                      </label>

                      <div className="col-lg-8 fv-row fv-plugins-icon-container">
                        <select
                          className="form-control form-control-lg form-control-solid"
                          name="furniture"
                          value={furniture}
                          onChange={handleChangefurniture}
                        >
                          <option>Select Furniture Types</option>
                          <option>Fully furnished</option>
                          <option>Unfurnished</option>
                          <option>Semi-Furnished</option>
                          <option>Custom furnished</option>
                          <option>Basic furnished</option>
                        </select>
                      </div>
                    </div>

                    <div className="row mb-6">
                      <label className="col-lg-4 col-form-label fw-semibold fs-6">
                        <span className="required">Bath</span>
                        <span
                          className="ms-1"
                          data-bs-toggle="tooltip"
                          aria-label="Phone number must be active"
                          data-bs-original-title="Phone number must be active"
                          data-kt-initialized="1"
                        ></span>
                      </label>

                      <div className="col-lg-8 fv-row fv-plugins-icon-container">
                        <select
                          className="form-control form-control-lg form-control-solid"
                          name="bath"
                          value={bath}
                          onChange={handleChangebath}
                        >
                          <option>Select Bath Types</option>
                          <option>1 Bath</option>
                          <option>2 Bath</option>
                          <option>3 Bath</option>
                          <option>4 Bath</option>
                        </select>
                      </div>
                    </div>

                    <div className="row mb-6">
                      <label className="col-lg-4 col-form-label fw-semibold fs-6">
                        <span className="required">Built-up Area</span>
                        <span
                          className="ms-1"
                          data-bs-toggle="tooltip"
                          aria-label="Phone number must be active"
                          data-bs-original-title="Phone number must be active"
                          data-kt-initialized="1"
                        ></span>
                      </label>

                      <div className="col-lg-8 fv-row fv-plugins-icon-container">
                        <input
                          type="text"
                          name="builtUpArea"
                          className="form-control form-control-lg form-control-solid"
                          placeholder="Built-up Area"
                          value={formik.values.builtUpArea}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.touched.builtUpArea &&
                        formik.errors.builtUpArea ? (
                          <div className="text-danger">
                            {formik.errors.builtUpArea}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="row mb-6">
                      <label className="col-lg-4 col-form-label fw-semibold fs-6">
                        <span className="required">mobileNumber</span>
                        <span
                          className="ms-1"
                          data-bs-toggle="tooltip"
                          aria-label="Phone number must be active"
                          data-bs-original-title="Phone number must be active"
                          data-kt-initialized="1"
                        ></span>
                      </label>

                      <div className="col-lg-8 fv-row fv-plugins-icon-container">
                        <input
                          type="text"
                          name="mobileNumber"
                          className="form-control form-control-lg form-control-solid"
                          placeholder="mobileNumber"
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

                    <div className="row mb-6">
                      <label className="col-lg-4 col-form-label fw-semibold fs-6">
                        <span className="required">Price</span>
                        <span
                          className="ms-1"
                          data-bs-toggle="tooltip"
                          aria-label="Phone number must be active"
                          data-bs-original-title="Phone number must be active"
                          data-kt-initialized="1"
                        ></span>
                      </label>

                      <div className="col-lg-8 fv-row fv-plugins-icon-container">
                        <input
                          type="tel"
                          name="price"
                          className="form-control form-control-lg form-control-solid"
                          placeholder="Price"
                          value={formik.values.price}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.touched.price && formik.errors.price ? (
                          <div className="text-danger">
                            {formik.errors.price}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="row mb-6">
                      <label className="col-lg-4 col-form-label fw-semibold fs-6">
                        <span className="required">Description</span>
                        <span
                          className="ms-1"
                          data-bs-toggle="tooltip"
                          aria-label="Phone number must be active"
                          data-bs-original-title="Phone number must be active"
                          data-kt-initialized="1"
                        ></span>
                      </label>

                      <div className="col-lg-8 fv-row fv-plugins-icon-container">
                        <textarea
                          type="tel"
                          name="description"
                          className="form-control form-control-lg form-control-solid"
                          placeholder="Description"
                          value={formik.values.description}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.touched.description &&
                        formik.errors.description ? (
                          <div className="text-danger">
                            {formik.errors.description}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 d-flex justify-content-center">
                    <button
                      className="btn btnButton text-white fs-5"
                      type="submit"
                    >
                      <span className=" mx-2">Save</span>
                    </button>
                    <Link
                      className="btn btnButtongrey text-white fs-5 ml-3"
                      to={"../viewproperty"}
                    >
                      <span className=" mx-2">Cancel</span>
                    </Link>
                  </div>
                </form>
              </div>
            </div>
            <div className="h-300px"></div>
            {/* <!--end::Card body--> */}
            <Footer></Footer>
          </div>
        </div>
      </div>
    </>
  );
}
