import React, { useEffect } from 'react'
import Sidebar from '../sidebar/sidebar';
import Header from '../header/header';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCancel, faCheck, faTrash } from '@fortawesome/free-solid-svg-icons';
import { fetchData } from '../../reusable';
import Swal from "sweetalert2";

export default function Viewserver() {
       document.title = "Rentnest | ServerDetails";

         const location = useLocation();
      const server = location.state ? location.state.serverDetails : ''

       const statusChange = async (status,reason) => {
         const swal = Swal.fire(
          status == '2' ? {
           title: "Are You Sure? You Want to Reject This Server.",
           icon: "warning",
           showCancelButton: true,
           input: "text",
           inputLabel: "Reason",
           inputPlaceholder: "Enter Reject Reason",
         }:{
          title: "Are You Sure? You Want to Approve This Server.",
           icon: "warning",
           showCancelButton: true,
         }
         
         ).then(async (result) => {
           if (result.isConfirmed) {
             var res = await fetchData("/admin/serverstatus", {
               adminId: "1",
               serverId: `${server.serverId}`,
               status: status,
               rejectReason: reason,
             });
             if (res.status === 200) {
               Swal.fire({
                 title: "Status Change Successfully !",
                 icon: "success",
               }).then((res) => {
                // console.log("--------",res);
                 if (res.isConfirmed) {
                    window.location.href = "viewserver";
                   // setstatus(e.target.checked)
                 }
               });
             } else {
               //  console.log(response);
               Swal.fire({
                 title: "Something went Wrong !",
                 icon: "error",
               });
             }
           }
         });
       };

useEffect(() => {
//    login();
 }, []);

  return (
    <>
      <div className="d-flex">
        <Sidebar />
        <div className="container">
          <Header />
          <div className="card mb-5 mb-xl-10" id="kt_profile_details_view">
            {/* <!--begin::Card header--> */}
            <div className="card-header cursor-pointer">
              {/* <!--begin::Card title--> */}
              <div className="card-title m-0">
                <h3 className="fw-bold m-0">Server Details</h3>
              </div>
              {/* <!--end::Card title--> */}
            </div>
            {/* <!--begin::Card header--> */}
            {/* <!--begin::Card body--> */}
            <div className="card-body p-9">
              {/* <!--begin::Row--> */}
              <div className="row mb-7">
                {/* <!--begin::Label--> */}
                <label className="col-lg-4 fw-semibold text-muted">
                  Full Name
                </label>
                {/* <!--end::Label--> */}
                {/* <!--begin::Col--> */}
                <div className="col-lg-8">
                  <span className="fw-bold fs-6 text-gray-800">
                    {server.firstName} {server.middleName} {server.lastName}
                  </span>
                </div>
                {/* <!--end::Col--> */}
              </div>
              {/* <!--end::Row--> */}
              {/* <!--begin::Input group--> */}
              <div className="row mb-7">
                {/* <!--begin::Label--> */}
                <label className="col-lg-4 fw-semibold text-muted">Email</label>
                {/* <!--end::Label--> */}
                {/* <!--begin::Col--> */}
                <div className="col-lg-8 fv-row">
                  <span className="fw-semibold text-gray-800 fs-6">
                    {server.email}
                  </span>
                </div>
                {/* <!--end::Col--> */}
              </div>
              {/* <!--end::Input group--> */}
              {/* <!--begin::Input group--> */}
              <div className="row mb-7">
                {/* <!--begin::Label--> */}
                <label className="col-lg-4 fw-semibold text-muted">
                  Contact Phone
                  <span
                    className="ms-1"
                    data-bs-toggle="tooltip"
                    title="Phone number must be active"
                  >
                    {/* <i className="ki-outline ki-information fs-7"></i> */}
                  </span>
                </label>
                {/* <!--end::Label--> */}
                {/* <!--begin::Col--> */}
                <div className="col-lg-8 d-flex align-items-center">
                  <span className="fw-bold fs-6 text-gray-800 me-2">
                    {server.mobileNumber}
                  </span>
                  {/* <span className="badge badge-success">Verified</span> */}
                </div>
                {/* <!--end::Col--> */}
              </div>
              {/* <!--end::Input group--> */}
              {/* <!--begin::Input group--> */}
              <div className="row mb-7">
                {/* <!--begin::Label--> */}
                <label className="col-lg-4 fw-semibold text-muted">
                  Social Security Number
                </label>
                {/* <!--end::Label--> */}
                {/* <!--begin::Col--> */}
                <div className="col-lg-8">
                  <span className="fw-bold fs-6 text-gray-800 me-2">
                    {server.socialSecurityNumber}
                  </span>
                </div>
                {/* <!--end::Col--> */}
              </div>
              {/* <!--end::Input group--> */}
              {/* <!--begin::Input group--> */}

              {/* <!--end::Input group--> */}
              {/* <!--begin::Input group--> */}
              <div className="row mb-7">
                {/* <!--begin::Label--> */}
                <label className="col-lg-4 fw-semibold text-muted">
                  Birth Date
                </label>
                {/* <!--end::Label--> */}
                {/* <!--begin::Col--> */}
                <div className="col-lg-8">
                  <span className="fw-bold fs-6 text-gray-800">
                    {server.birthDate == "0000-00-00" || server.birthDate == null ? '---- -- --':server.birthDate}
                  </span>
                </div>
                {/* <!--end::Col--> */}
              </div>
              {/* <!--end::Input group--> */}
              {/* <!--begin::Input group--> */}
              <div className="row mb-10">
                {/* <!--begin::Label--> */}
                <label className="col-lg-4 fw-semibold text-muted">
                  Address
                </label>
                {/* <!--begin::Label--> */}
                {/* <!--begin::Label--> */}
                <div className="col-lg-8">
                  <span className="fw-semibold fs-6 text-gray-800">
                    {" "}
                    {server.address}
                  </span>
                </div>
                {/* <!--begin::Label--> */}
              </div>
              <div className="d-flex justify-content my-5">
                <button
                  className="btn btnButtonDanger btn-sm mx-1 text-white fs-5"
                  onClick={() => {
                    statusChange("2", "Test");
                  }}
                >
                  <span className="text-white mx-2">Reject</span>
                  <FontAwesomeIcon icon={faCancel} className="text-white" />
                </button>
                <button
                  className="btn btnButton btn-sm mx-1 text-white fs-5"
                  onClick={() => {
                    statusChange("1", "");
                  }}
                >
                  <span className=" mx-2">Approve</span>
                  <FontAwesomeIcon icon={faCheck} className="text-white" />
                  {/* <FontAwesomeIcon icon={faTrash} /> */}
                </button>
              </div>
              {/* <!--end::Input group--> */}
            </div>
            {/* <!--end::Card body--> */}
          </div>
        </div>
      </div>
    </>
  );
}
