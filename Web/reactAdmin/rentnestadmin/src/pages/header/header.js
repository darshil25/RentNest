import React, { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "../../assets/style/style.css";
import logo1 from "../../assets/image/venom.jpg";

import "../../assets/plugins/custom/datatables/datatables.bundle.css";
import "../../assets/plugins/custom/vis-timeline/vis-timeline.bundle.css";
import "../../assets/plugins/global/plugins.bundle.css";
import Swal from "sweetalert2";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link,useNavigate } from "react-router-dom";

import $ from "jquery";
import { fetchData } from "../../reusable";


export default function Header(menuId) {
  const [admin, setadmin] = useState({});
  const menuToggleRef = useRef(null);
  const [isonline, setisonline] = useState(false);
  const navigate = useNavigate();

  var session = window.sessionStorage.getItem("admin");
  var adminDetails = null;
  const adminViewDetails = () => {
    if (session !== null) {
      setadmin(adminDetails);
      // console.log("========================", adminDetails);
    }
  };

  const toggle_menu_accordian = (event) => {
    const clickedElement = event.target;
    $(clickedElement).closest(".menu-accordion").toggleClass("show");
  };

  const toggle_menu_profile = (event) => {
    $("#profilemenu_1").toggleClass("show menu-dropdown");
    $("#profilemenu_2").toggleClass("show showprofilemenu");
  };

  const handleClickOutsideMenu = (event) => {
    if (
      menuToggleRef.current &&
      !menuToggleRef.current.contains(event.target)
    ) {
      // Click occurred outside the menu, close the menu
      $("#profilemenu_1").removeClass("show menu-dropdown");
      $("#profilemenu_2").removeClass("show showprofilemenu");
    }
  };

  const toggle_menu_profilem = (event) => {
    $("#mprofilemenu_1").toggleClass("show menu-dropdown");
    $("#mprofilemenu_2").toggleClass("show showprofilemenu");
  };
  const toggle = document.getElementById("navvvv");

  const toggle_sidebarrr = () => {
    if (toggle.style.display === "none") {
      toggle.style.display = "block";
      toggle.style.zIndex = "1";
      // toggle1.style.display = "block";
      // toggle2.style.width = "280px";
    } else {
      toggle.style.display = "none";
      //  toggle1.style.display = "none";
      //  toggle2.style.width = "70px";
    }
  };

  const signout = () => {
    const swal = Swal.fire({
      title: "Do you want to Sign Out this ?",
      text: "You clicked the button.",
      icon: "warning",
      showCancelButton: true,
      // cancelButtonText: 'Cancel',
    }).then(async (result) => {
      if (result.isConfirmed) {
        navigate("../login");
      }
    });
  };

  const [menus, setMenus] = useState([]);

  const menulist_api = async () => {
    const response = await fetchData("/menulist", {});
    if (response.status == "200") {
      setMenus(response.data);
    }
  };

  const intervalId = setInterval(() => {
    navigator.onLine ? console.log() : (window.location.href = "error");
  }, 2000);

  useEffect(() => {
    if (navigator.onLine) {
      // online
    } else {
      setisonline(true);
      window.location.href = "error";
    }

    menulist_api();
    adminViewDetails();
    document.removeEventListener("click", handleClickOutsideMenu);
    return () => {
      document.removeEventListener("click", handleClickOutsideMenu);
    };
  }, []);

  const pathstore = (path) => {
    window.sessionStorage.setItem("route", path);
  };

  return (
    <>
      <div
        className="d-flex align-items-center d-lg-none ms-n2 me-2"
        title="Show sidebar menu"
      >
        <div className="container d-flex ">
          <div
            className="btn btn-icon btn-active-color-primary w-35px h-35px mr-auto"
            id="kt_app_header_menu_toggle"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasExample"
            aria-controls="offcanvasExample"
          >
            <i className="ki-outline ki-abstract-14 fs-2"></i>
          </div>
          <div
            className="navbar-brand"
            to=""
            onMouseEnter={toggle_menu_profilem}
            onMouseLeave={toggle_menu_profilem}
            >
            <div
              className="cursor-pointer symbol symbol-circle symbol-35px symbol-md-45px w-100"
              data-kt-menu-trigger="{default: 'click', lg: 'hover'}"
              data-kt-menu-attach="parent"
              data-kt-menu-placement="bottom-end"
              id="mprofilemenu_1"
            >
              <img src={logo1} alt="user" />

              <div
                className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg menu-state-color fw-semibold py-4 fs-6 w-275px"
                data-kt-menu="true"
                id="mprofilemenu_2"
              >
                <div className="menu-item px-3">
                  <div className="menu-content d-flex align-items-center px-3">
                    <div className="symbol symbol-50px me-5">
                      {/* <img alt="Logo" src={admin.profile} /> */}
                    </div>
                    <div className="d-flex flex-column">
                      <div className="fw-bold d-flex align-items-center fs-5">
                        {/* {admin.name} */}
                      </div>
                      <Link
                        to=""
                        className="fw-semibold text-muted text-hover-primary fs-7 text-decoration-none-underline"
                      >
                        {/* {admin.email} */}
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="separator my-2"></div>
                <div className="menu-item px-5">
                  <Link
                    to="../adminpages/viewadmindeatil"
                    className="menu-link linkhover px-5 text-decoration-none-underline"
                  >
                    My Profile
                  </Link>
                </div>
                <div className="separator my-2"></div>
                {/**/}

                <div className="menu-item px-5 my-1">
                  <Link
                    to=""
                    className="menu-link px-5 text-decoration-none-underline"
                  >
                    Account Settings
                  </Link>
                </div>
                <div className="menu-item px-5">
                  <Link
                    to=""
                    className="menu-link px-5 text-decoration-none-underline"
                    onClick={(e) => signout()}
                  >
                    Sign Out
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* {/ <!--end::Header mobile toggle--> /} */}
      <div
        className="offcanvas offcanvas-start flex-grow-1 flex-lg-grow-0 me-lg-18"
        style={{ width: "50%" }}
        tabIndex="-1"
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div
          data-kt-menu-placement="bottom-start"
          className="menu-item here show menu-here-bg menu-lg-down-accordion me-0 me-lg-2"
        >
          <div className="d-flex justify-content-end p-4 pb-0">
            <button
              type="button"
              className="btn-close text-reset"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-header pt-0">
            {/* {/ <!--begin:Menu link--> /} */}
            <div
              className="app-sidebar-navs flex-column-fluid py-6"
              id="kt_app_sidebar_navs"
            >
              <div
                id="kt_app_sidebar_navs_wrappers"
                className="app-sidebar-wrapper hover-scroll-y my-2"
                data-kt-scroll="true"
                data-kt-scroll-activate="true"
                data-kt-scroll-height="auto"
                data-kt-scroll-dependencies="#kt_app_sidebar_header"
                data-kt-scroll-wrappers="#kt_app_sidebar_navs"
                data-kt-scroll-offset="5px"
              >
                {/* <!--begin::Sidebar menu--> */}
                <div
                  id="#kt_app_sidebar_menu"
                  data-kt-menu="true"
                  data-kt-menu-expand="false"
                  className="app-sidebar-menu-primary menu menu-column menu-rounded menu-sub-indention menu-state-bullet-primary"
                >
                  <div className="menu-item mb-2">
                    <div className="menu-heading text-uppercase fs-7 fw-bold">
                      Menu
                    </div>
                    <div className="app-sidebar-separator separator"></div>
                  </div>

                  {/* Dashboard */}
                  <div data-kt-menu-trigger="click" className="menu-item here">
                    <li
                      className={`menu-link ${
                        menuId.menuId === 1 ? `menulinkhover` : ``
                      }`}
                    >
                      <Link
                        className="menu-icon text-decoration-none-underline"
                        to={"../dashboard"}
                        onClick={() => pathstore("dashboard")}
                      >
                        <span className="material-symbols-outlined">
                          dashboard
                        </span>
                      </Link>
                      <Link
                        className="menu-title text-decoration-none-underline"
                        to={"../dashboard"}
                        onClick={() => pathstore("dashboard")}
                      >
                        Dashboard
                      </Link>
                    </li>
                  </div>
                 
                </div>
                {/* <!--end::Sidebar menu--> */}
              </div>
            </div>
            {/* {/ <!--end:Menu link--> /} */}
          </div>
        </div>
      </div>

      {/* New Code TOp */}

      <div className="app-container container-fluid  align-items-stretch flex-stack position-relative mynav1">
        {/* <!--begin::Sidebar--> */}
        <div id="kt_app_header" className="app-header">
          {/* <!--begin::Header container--> */}
          <div
            className="app-container container-fluid d-flex justify-content-flex-end; align-items-stretch flex-stack"
            id="kt_app_header_container"
          >
            {/* <!--begin::Sidebar toggle--> */}
            {/* <div
              className="d-flex align-items-center d-block d-lg-none ms-n3"
              title="Show sidebar menu"
            >
              <div
                className="btn btn-icon btn-active-color-primary w-35px h-35px me-2"
                id="kt_app_sidebar_mobile_toggle"
                onClick={() => toggle_sidebarrr()}
              >
                <i className="ki-outline ki-abstract-14 fs-2"></i>
              </div>
            </div> */}
            {/* <!--end::Sidebar toggle--> */}

            {/* <!--begin::Navbar--> */}
            <div
              className="app-navbar flex-lg-grow-1 "
              id="kt_app_header_navbar"
            >
              <div className="app-navbar-item d-flex align-items-stretch flex-lg-grow-1">
                {/* <!--begin::Search--> */}

                {/* <!--end::Search--> */}
              </div>
              {/* <!--begin::Notifications--> */}
              <div className="app-navbar-item ms-1 ms-md-3">
                {/* <!--begin::Menu- wrapper--> */}

                {/* <!--begin::Menu--> */}
                <div
                  className="menu menu-sub menu-sub-dropdown menu-column w-350px w-lg-375px"
                  data-kt-menu="true"
                  id="kt_menu_notifications"
                >
                  {/* <!--begin::Heading--> */}
                  <div className="d-flex flex-column bgi-no-repeat rounded-top testdiv">
                    {/* <!--begin::Title--> */}
                    <h3 className="text-white fw-semibold px-9 mt-10 mb-6">
                      Notifications
                      <span className="fs-8 opacity-75 ps-3">24 reports</span>
                    </h3>
                    {/* <!--end::Title--> */}
                    {/* <!--begin::Tabs--> */}
                    <ul
                      className="nav nav-line-tabs nav-line-tabs-2x nav-stretch fw-semibold px-9"
                      role="tablist"
                    >
                      <li className="nav-item" role="presentation">
                        <Link
                          className="nav-link text-white opacity-75 opacity-state-100 pb-4"
                          data-bs-toggle="tab"
                          to="#kt_topbar_notifications_1"
                          aria-selected="false"
                          tabIndex="-1"
                          role="tab"
                        >
                          Alerts
                        </Link>
                      </li>
                      <li className="nav-item" role="presentation">
                        <Link
                          className="nav-link text-white opacity-75 opacity-state-100 pb-4 active"
                          data-bs-toggle="tab"
                          to="#kt_topbar_notifications_2"
                          aria-selected="true"
                          role="tab"
                        >
                          Updates
                        </Link>
                      </li>
                      <li className="nav-item" role="presentation">
                        <Link
                          className="nav-link text-white opacity-75 opacity-state-100 pb-4"
                          data-bs-toggle="tab"
                          to="#kt_topbar_notifications_3"
                          aria-selected="false"
                          tabIndex="-1"
                          role="tab"
                        >
                          Logs
                        </Link>
                      </li>
                    </ul>
                    {/* <!--end::Tabs--> */}
                  </div>
                  {/* <!--end::Heading--> */}
                  {/* <!--begin::Tab content--> */}
                  <div className="tab-content">
                    {/* <!--begin::Tab panel--> */}
                    <div
                      className="tab-pane fade"
                      id="kt_topbar_notifications_1"
                      role="tabpanel"
                    >
                      {/* <!--begin::Items--> */}
                      <div className="scroll-y mh-325px my-5 px-8">
                        {/* <!--begin::Item--> */}
                        <div className="d-flex flex-stack py-4">
                          {/* <!--begin::Section--> */}
                          <div className="d-flex align-items-center">
                            {/* <!--begin::Symbol--> */}
                            <div className="symbol symbol-35px me-4">
                              <span className="symbol-label bg-light-primary">
                                <i className="ki-outline ki-abstract-28 fs-2 text-primary"></i>
                              </span>
                            </div>
                            {/* <!--end::Symbol--> */}
                            {/* <!--begin::Title--> */}
                            <div className="mb-0 me-2">
                              <Link
                                to=""
                                className="fs-6 text-gray-800 text-hover-primary fw-bold"
                              >
                                Project Alice
                              </Link>
                              <div className="text-gray-400 fs-7">
                                Phase 1 development
                              </div>
                            </div>
                            {/* <!--end::Title--> */}
                          </div>
                          {/* <!--end::Section--> */}
                          {/* <!--begin::Label--> */}
                          <span className="badge badge-light fs-8">1 hr</span>
                          {/* <!--end::Label--> */}
                        </div>
                        {/* <!--end::Item--> */}
                        {/* <!--begin::Item--> */}
                        <div className="d-flex flex-stack py-4">
                          {/* <!--begin::Section--> */}
                          <div className="d-flex align-items-center">
                            {/* <!--begin::Symbol--> */}
                            <div className="symbol symbol-35px me-4">
                              <span className="symbol-label bg-light-danger">
                                <i className="ki-outline ki-information fs-2 text-danger"></i>
                              </span>
                            </div>
                            {/* <!--end::Symbol--> */}
                            {/* <!--begin::Title--> */}
                            <div className="mb-0 me-2">
                              <Link
                                to=""
                                className="fs-6 text-gray-800 text-hover-primary fw-bold"
                              >
                                HR Confidential
                              </Link>
                              <div className="text-gray-400 fs-7">
                                Confidential staff documents
                              </div>
                            </div>
                            {/* <!--end::Title--> */}
                          </div>
                          {/* <!--end::Section--> */}
                          {/* <!--begin::Label--> */}
                          <span className="badge badge-light fs-8">2 hrs</span>
                          {/* <!--end::Label--> */}
                        </div>
                        {/* <!--end::Item--> */}
                        {/* <!--begin::Item--> */}
                        <div className="d-flex flex-stack py-4">
                          {/* <!--begin::Section--> */}
                          <div className="d-flex align-items-center">
                            {/* <!--begin::Symbol--> */}
                            <div className="symbol symbol-35px me-4">
                              <span className="symbol-label bg-light-warning">
                                <i className="ki-outline ki-briefcase fs-2 text-warning"></i>
                              </span>
                            </div>
                            {/* <!--end::Symbol--> */}
                            {/* <!--begin::Title--> */}
                            <div className="mb-0 me-2">
                              <Link
                                to=""
                                className="fs-6 text-gray-800 text-hover-primary fw-bold"
                              >
                                Company HR
                              </Link>
                              <div className="text-gray-400 fs-7">
                                Corporeate staff profiles
                              </div>
                            </div>
                            {/* <!--end::Title--> */}
                          </div>
                          {/* <!--end::Section--> */}
                          {/* <!--begin::Label--> */}
                          <span className="badge badge-light fs-8">5 hrs</span>
                          {/* <!--end::Label--> */}
                        </div>
                        {/* <!--end::Item--> */}
                        {/* <!--begin::Item--> */}
                        <div className="d-flex flex-stack py-4">
                          {/* <!--begin::Section--> */}
                          <div className="d-flex align-items-center">
                            {/* <!--begin::Symbol--> */}
                            <div className="symbol symbol-35px me-4">
                              <span className="symbol-label bg-light-success">
                                <i className="ki-outline ki-abstract-12 fs-2 text-success"></i>
                              </span>
                            </div>
                            {/* <!--end::Symbol--> */}
                            {/* <!--begin::Title--> */}
                            <div className="mb-0 me-2">
                              <Link
                                to=""
                                className="fs-6 text-gray-800 text-hover-primary fw-bold"
                              >
                                Project Redux
                              </Link>
                              <div className="text-gray-400 fs-7">
                                New frontend admin theme
                              </div>
                            </div>
                            {/* <!--end::Title--> */}
                          </div>
                          {/* <!--end::Section--> */}
                          {/* <!--begin::Label--> */}
                          <span className="badge badge-light fs-8">2 days</span>
                          {/* <!--end::Label--> */}
                        </div>
                        {/* <!--end::Item--> */}
                        {/* <!--begin::Item--> */}
                        <div className="d-flex flex-stack py-4">
                          {/* <!--begin::Section--> */}
                          <div className="d-flex align-items-center">
                            {/* <!--begin::Symbol--> */}
                            <div className="symbol symbol-35px me-4">
                              <span className="symbol-label bg-light-primary">
                                <i className="ki-outline ki-colors-square fs-2 text-primary"></i>
                              </span>
                            </div>
                            {/* <!--end::Symbol--> */}
                            {/* <!--begin::Title--> */}
                            <div className="mb-0 me-2">
                              <Link
                                to=""
                                className="fs-6 text-gray-800 text-hover-primary fw-bold"
                              >
                                Project Breafing
                              </Link>
                              <div className="text-gray-400 fs-7">
                                Product launch status update
                              </div>
                            </div>
                            {/* <!--end::Title--> */}
                          </div>
                          {/* <!--end::Section--> */}
                          {/* <!--begin::Label--> */}
                          <span className="badge badge-light fs-8">21 Jan</span>
                          {/* <!--end::Label--> */}
                        </div>
                        {/* <!--end::Item--> */}
                        {/* <!--begin::Item--> */}
                        <div className="d-flex flex-stack py-4">
                          {/* <!--begin::Section--> */}
                          <div className="d-flex align-items-center">
                            {/* <!--begin::Symbol--> */}
                            <div className="symbol symbol-35px me-4">
                              <span className="symbol-label bg-light-info">
                                <i className="ki-outline ki-picture fs-2 text-info"></i>
                              </span>
                            </div>
                            {/* <!--end::Symbol--> */}
                            {/* <!--begin::Title--> */}
                            <div className="mb-0 me-2">
                              <Link
                                to=""
                                className="fs-6 text-gray-800 text-hover-primary fw-bold"
                              >
                                Banner Assets
                              </Link>
                              <div className="text-gray-400 fs-7">
                                Collection of banner images
                              </div>
                            </div>
                            {/* <!--end::Title--> */}
                          </div>
                          {/* <!--end::Section--> */}
                          {/* <!--begin::Label--> */}
                          <span className="badge badge-light fs-8">21 Jan</span>
                          {/* <!--end::Label--> */}
                        </div>
                        {/* <!--end::Item--> */}
                        {/* <!--begin::Item--> */}
                        <div className="d-flex flex-stack py-4">
                          {/* <!--begin::Section--> */}
                          <div className="d-flex align-items-center">
                            {/* <!--begin::Symbol--> */}
                            <div className="symbol symbol-35px me-4">
                              <span className="symbol-label bg-light-warning">
                                <i className="ki-outline ki-color-swatch fs-2 text-warning"></i>
                              </span>
                            </div>
                            {/* <!--end::Symbol--> */}
                            {/* <!--begin::Title--> */}
                            <div className="mb-0 me-2">
                              <Link
                                to=""
                                className="fs-6 text-gray-800 text-hover-primary fw-bold"
                              >
                                Icon Assets
                              </Link>
                              <div className="text-gray-400 fs-7">
                                Collection of SVG icons
                              </div>
                            </div>
                            {/* <!--end::Title--> */}
                          </div>
                          {/* <!--end::Section--> */}
                          {/* <!--begin::Label--> */}
                          <span className="badge badge-light fs-8">
                            20 March
                          </span>
                          {/* <!--end::Label--> */}
                        </div>
                        {/* <!--end::Item--> */}
                      </div>
                      {/* <!--end::Items--> */}
                      {/* <!--begin::View more--> */}
                      <div className="py-3 text-center border-top">
                        <Link
                          to="../../demo38/dist/pages/user-profile/activity.html"
                          className="btn btn-color-gray-600 btn-active-color-primary"
                        >
                          View All
                          <i className="ki-outline ki-arrow-right fs-5"></i>
                        </Link>
                      </div>
                      {/* <!--end::View more--> */}
                    </div>
                    {/* <!--end::Tab panel--> */}
                    {/* <!--begin::Tab panel--> */}
                    <div
                      className="tab-pane fade show active"
                      id="kt_topbar_notifications_2"
                      role="tabpanel"
                    >
                      {/* <!--begin::Wrapper--> */}
                      <div className="d-flex flex-column px-9">
                        {/* <!--begin::Section--> */}
                        <div className="pt-10 pb-0">
                          {/* <!--begin::Title--> */}
                          <h3 className="text-dark text-center fw-bold">
                            Get Pro Access
                          </h3>
                          {/* <!--end::Title--> */}
                          {/* <!--begin::Text--> */}
                          <div className="text-center text-gray-600 fw-semibold pt-1">
                            Outlines keep you honest. They stoping you from
                            amazing poorly about drive
                          </div>
                          {/* <!--end::Text--> */}
                          {/* <!--begin::Action--> */}
                          <div className="text-center mt-5 mb-9">
                            <Link
                              to=""
                              className="btn btn-sm btn-primary px-6"
                              data-bs-toggle="modal"
                              data-bs-target="#kt_modal_upgrade_plan"
                            >
                              Upgrade
                            </Link>
                          </div>
                          {/* <!--end::Action--> */}
                        </div>
                        {/* <!--end::Section--> */}
                        {/* <!--begin::Illustration--> */}
                        <div className="text-center px-4">
                          <img
                            className="mw-100 mh-200px"
                            alt="image"
                            // src={admin.profile}
                          />
                        </div>
                        {/* <!--end::Illustration--> */}
                      </div>
                      {/* <!--end::Wrapper--> */}
                    </div>
                    {/* <!--end::Tab panel--> */}
                    {/* <!--begin::Tab panel--> */}
                    <div
                      className="tab-pane fade"
                      id="kt_topbar_notifications_3"
                      role="tabpanel"
                    >
                      {/* <!--begin::Items--> */}
                      <div className="scroll-y mh-325px my-5 px-8">
                        {/* <!--begin::Item--> */}
                        <div className="d-flex flex-stack py-4">
                          {/* <!--begin::Section--> */}
                          <div className="d-flex align-items-center me-2">
                            {/* <!--begin::Code--> */}
                            <span className="w-70px badge badge-light-success me-4">
                              200 OK
                            </span>
                            {/* <!--end::Code--> */}
                            {/* <!--begin::Title--> */}
                            <Link
                              to=""
                              className="text-gray-800 text-hover-primary fw-semibold"
                            >
                              New order
                            </Link>
                            {/* <!--end::Title--> */}
                          </div>
                          {/* <!--end::Section--> */}
                          {/* <!--begin::Label--> */}
                          <span className="badge badge-light fs-8">
                            Just now
                          </span>
                          {/* <!--end::Label--> */}
                        </div>
                        {/* <!--end::Item--> */}
                        {/* <!--begin::Item--> */}
                        <div className="d-flex flex-stack py-4">
                          {/* <!--begin::Section--> */}
                          <div className="d-flex align-items-center me-2">
                            {/* <!--begin::Code--> */}
                            <span className="w-70px badge badge-light-danger me-4">
                              500 ERR
                            </span>
                            {/* <!--end::Code--> */}
                            {/* <!--begin::Title--> */}
                            <Link
                              to=""
                              className="text-gray-800 text-hover-primary fw-semibold"
                            >
                              New customer
                            </Link>
                            {/* <!--end::Title--> */}
                          </div>
                          {/* <!--end::Section--> */}
                          {/* <!--begin::Label--> */}
                          <span className="badge badge-light fs-8">2 hrs</span>
                          {/* <!--end::Label--> */}
                        </div>
                        {/* <!--end::Item--> */}
                        {/* <!--begin::Item--> */}
                        <div className="d-flex flex-stack py-4">
                          {/* <!--begin::Section--> */}
                          <div className="d-flex align-items-center me-2">
                            {/* <!--begin::Code--> */}
                            <span className="w-70px badge badge-light-success me-4">
                              200 OK
                            </span>
                            {/* <!--end::Code--> */}
                            {/* <!--begin::Title--> */}
                            <Link
                              to=""
                              className="text-gray-800 text-hover-primary fw-semibold"
                            >
                              Payment process
                            </Link>
                            {/* <!--end::Title--> */}
                          </div>
                          {/* <!--end::Section--> */}
                          {/* <!--begin::Label--> */}
                          <span className="badge badge-light fs-8">5 hrs</span>
                          {/* <!--end::Label--> */}
                        </div>
                        {/* <!--end::Item--> */}
                        {/* <!--begin::Item--> */}
                        <div className="d-flex flex-stack py-4">
                          {/* <!--begin::Section--> */}
                          <div className="d-flex align-items-center me-2">
                            {/* <!--begin::Code--> */}
                            <span className="w-70px badge badge-light-warning me-4">
                              300 WRN
                            </span>
                            {/* <!--end::Code--> */}
                            {/* <!--begin::Title--> */}
                            <Link
                              to=""
                              className="text-gray-800 text-hover-primary fw-semibold"
                            >
                              Search query
                            </Link>
                            {/* <!--end::Title--> */}
                          </div>
                          {/* <!--end::Section--> */}
                          {/* <!--begin::Label--> */}
                          <span className="badge badge-light fs-8">2 days</span>
                          {/* <!--end::Label--> */}
                        </div>
                        {/* <!--end::Item--> */}
                        {/* <!--begin::Item--> */}
                        <div className="d-flex flex-stack py-4">
                          {/* <!--begin::Section--> */}
                          <div className="d-flex align-items-center me-2">
                            {/* <!--begin::Code--> */}
                            <span className="w-70px badge badge-light-success me-4">
                              200 OK
                            </span>
                            {/* <!--end::Code--> */}
                            {/* <!--begin::Title--> */}
                            <Link
                              to=""
                              className="text-gray-800 text-hover-primary fw-semibold"
                            >
                              API connection
                            </Link>
                            {/* <!--end::Title--> */}
                          </div>
                          {/* <!--end::Section--> */}
                          {/* <!--begin::Label--> */}
                          <span className="badge badge-light fs-8">1 week</span>
                          {/* <!--end::Label--> */}
                        </div>
                        {/* <!--end::Item--> */}
                        {/* <!--begin::Item--> */}
                        <div className="d-flex flex-stack py-4">
                          {/* <!--begin::Section--> */}
                          <div className="d-flex align-items-center me-2">
                            {/* <!--begin::Code--> */}
                            <span className="w-70px badge badge-light-success me-4">
                              200 OK
                            </span>
                            {/* <!--end::Code--> */}
                            {/* <!--begin::Title--> */}
                            <Link
                              to=""
                              className="text-gray-800 text-hover-primary fw-semibold"
                            >
                              Database restore
                            </Link>
                            {/* <!--end::Title--> */}
                          </div>
                          {/* <!--end::Section--> */}
                          {/* <!--begin::Label--> */}
                          <span className="badge badge-light fs-8">Mar 5</span>
                          {/* <!--end::Label--> */}
                        </div>
                        {/* <!--end::Item--> */}
                        {/* <!--begin::Item--> */}
                        <div className="d-flex flex-stack py-4">
                          {/* <!--begin::Section--> */}
                          <div className="d-flex align-items-center me-2">
                            {/* <!--begin::Code--> */}
                            <span className="w-70px badge badge-light-warning me-4">
                              300 WRN
                            </span>
                            {/* <!--end::Code--> */}
                            {/* <!--begin::Title--> */}
                            <Link
                              to=""
                              className="text-gray-800 text-hover-primary fw-semibold"
                            >
                              System update
                            </Link>
                            {/* <!--end::Title--> */}
                          </div>
                          {/* <!--end::Section--> */}
                          {/* <!--begin::Label--> */}
                          <span className="badge badge-light fs-8">May 15</span>
                          {/* <!--end::Label--> */}
                        </div>
                        {/* <!--end::Item--> */}
                        {/* <!--begin::Item--> */}
                        <div className="d-flex flex-stack py-4">
                          {/* <!--begin::Section--> */}
                          <div className="d-flex align-items-center me-2">
                            {/* <!--begin::Code--> */}
                            <span className="w-70px badge badge-light-warning me-4">
                              300 WRN
                            </span>
                            {/* <!--end::Code--> */}
                            {/* <!--begin::Title--> */}
                            <Link
                              to=""
                              className="text-gray-800 text-hover-primary fw-semibold"
                            >
                              Server OS update
                            </Link>
                            {/* <!--end::Title--> */}
                          </div>
                          {/* <!--end::Section--> */}
                          {/* <!--begin::Label--> */}
                          <span className="badge badge-light fs-8">Apr 3</span>
                          {/* <!--end::Label--> */}
                        </div>
                        {/* <!--end::Item--> */}
                        {/* <!--begin::Item--> */}
                        <div className="d-flex flex-stack py-4">
                          {/* <!--begin::Section--> */}
                          <div className="d-flex align-items-center me-2">
                            {/* <!--begin::Code--> */}
                            <span className="w-70px badge badge-light-warning me-4">
                              300 WRN
                            </span>
                            {/* <!--end::Code--> */}
                            {/* <!--begin::Title--> */}
                            <Link
                              to=""
                              className="text-gray-800 text-hover-primary fw-semibold"
                            >
                              API rollback
                            </Link>
                            {/* <!--end::Title--> */}
                          </div>
                          {/* <!--end::Section--> */}
                          {/* <!--begin::Label--> */}
                          <span className="badge badge-light fs-8">Jun 30</span>
                          {/* <!--end::Label--> */}
                        </div>
                        {/* <!--end::Item--> */}
                        {/* <!--begin::Item--> */}
                        <div className="d-flex flex-stack py-4">
                          {/* <!--begin::Section--> */}
                          <div className="d-flex align-items-center me-2">
                            {/* <!--begin::Code--> */}
                            <span className="w-70px badge badge-light-danger me-4">
                              500 ERR
                            </span>
                            {/* <!--end::Code--> */}
                            {/* <!--begin::Title--> */}
                            <Link
                              to=""
                              className="text-gray-800 text-hover-primary fw-semibold"
                            >
                              Refund process
                            </Link>
                            {/* <!--end::Title--> */}
                          </div>
                          {/* <!--end::Section--> */}
                          {/* <!--begin::Label--> */}
                          <span className="badge badge-light fs-8">Jul 10</span>
                          {/* <!--end::Label--> */}
                        </div>
                        {/* <!--end::Item--> */}
                        {/* <!--begin::Item--> */}
                        <div className="d-flex flex-stack py-4">
                          {/* <!--begin::Section--> */}
                          <div className="d-flex align-items-center me-2">
                            {/* <!--begin::Code--> */}
                            <span className="w-70px badge badge-light-danger me-4">
                              500 ERR
                            </span>
                            {/* <!--end::Code--> */}
                            {/* <!--begin::Title--> */}
                            <Link
                              to=""
                              className="text-gray-800 text-hover-primary fw-semibold"
                            >
                              Withdrawal process
                            </Link>
                            {/* <!--end::Title--> */}
                          </div>
                          {/* <!--end::Section--> */}
                          {/* <!--begin::Label--> */}
                          <span className="badge badge-light fs-8">Sep 10</span>
                          {/* <!--end::Label--> */}
                        </div>
                        {/* <!--end::Item--> */}
                        {/* <!--begin::Item--> */}
                        <div className="d-flex flex-stack py-4">
                          {/* <!--begin::Section--> */}
                          <div className="d-flex align-items-center me-2">
                            {/* <!--begin::Code--> */}
                            <span className="w-70px badge badge-light-danger me-4">
                              500 ERR
                            </span>
                            {/* <!--end::Code--> */}
                            {/* <!--begin::Title--> */}
                            <Link
                              to=""
                              className="text-gray-800 text-hover-primary fw-semibold"
                            >
                              Mail tasks
                            </Link>
                            {/* <!--end::Title--> */}
                          </div>
                          {/* <!--end::Section--> */}
                          {/* <!--begin::Label--> */}
                          <span className="badge badge-light fs-8">Dec 10</span>
                          {/* <!--end::Label--> */}
                        </div>
                        {/* <!--end::Item--> */}
                      </div>
                      {/* <!--end::Items--> */}
                      {/* <!--begin::View more--> */}
                      <div className="py-3 text-center border-top">
                        <Link
                          to="../../demo38/dist/pages/user-profile/activity.html"
                          className="btn btn-color-gray-600 btn-active-color-primary"
                        >
                          View All
                          <i className="ki-outline ki-arrow-right fs-5"></i>
                        </Link>
                      </div>
                      {/* <!--end::View more--> */}
                    </div>
                    {/* <!--end::Tab panel--> */}
                  </div>
                  {/* <!--end::Tab content--> */}
                </div>
                {/* <!--end::Menu--> */}
                {/* <!--end::Menu wrapper--> */}
              </div>
              {/* <!--end::Notifications--> */}
              {/* <!--begin::Quick links--> */}
              <div className="app-navbar-item ms-1 ms-md-3">
                {/* <!--begin::Menu- wrapper--> */}

                {/* <!--begin::Menu--> */}
                <div
                  className="menu menu-sub menu-sub-dropdown menu-column w-250px w-lg-325px"
                  data-kt-menu="true"
                >
                  {/* <!--begin::Heading--> */}
                  <div className="d-flex flex-column flex-center bgi-no-repeat rounded-top px-9 py-10 testdiv">
                    {/* <!--begin::Title--> */}
                    <h3 className="text-white fw-semibold mb-3">Quick Links</h3>
                    {/* <!--end::Title--> */}
                    {/* <!--begin::Status--> */}
                    <span className="badge bg-primary text-inverse-primary py-2 px-3">
                      25 pending tasks
                    </span>
                    {/* <!--end::Status--> */}
                  </div>
                  {/* <!--end::Heading--> */}
                  {/* <!--begin:Nav--> */}
                  <div className="row g-0">
                    {/* <!--begin:Item--> */}
                    <div className="col-6">
                      <Link
                        to="../../demo38/dist/apps/projects/budget.html"
                        className="d-flex flex-column flex-center h-100 p-6 bg-hover-light border-end border-bottom"
                      >
                        <i className="ki-outline ki-dollar fs-3x text-primary mb-2"></i>
                        <span className="fs-5 fw-semibold text-gray-800 mb-0">
                          Accounting
                        </span>
                        <span className="fs-7 text-gray-400">eCommerce</span>
                      </Link>
                    </div>
                    {/* <!--end:Item--> */}
                    {/* <!--begin:Item--> */}
                    <div className="col-6">
                      <Link
                        to="../../demo38/dist/apps/projects/settings.html"
                        className="d-flex flex-column flex-center h-100 p-6 bg-hover-light border-bottom"
                      >
                        <i className="ki-outline ki-sms fs-3x text-primary mb-2"></i>
                        <span className="fs-5 fw-semibold text-gray-800 mb-0">
                          Administration
                        </span>
                        <span className="fs-7 text-gray-400">Console</span>
                      </Link>
                    </div>
                    {/* <!--end:Item--> */}
                    {/* <!--begin:Item--> */}
                    <div className="col-6">
                      <Link
                        to="../../demo38/dist/apps/projects/list.html"
                        className="d-flex flex-column flex-center h-100 p-6 bg-hover-light border-end"
                      >
                        <i className="ki-outline ki-abstract-41 fs-3x text-primary mb-2"></i>
                        <span className="fs-5 fw-semibold text-gray-800 mb-0">
                          Projects
                        </span>
                        <span className="fs-7 text-gray-400">
                          Pending Tasks
                        </span>
                      </Link>
                    </div>
                    {/* <!--begin:Item--> */}
                    <div className="col-6">
                      <Link
                        to="../../demo38/dist/apps/projects/users.html"
                        className="d-flex flex-column flex-center h-100 p-6 bg-hover-light"
                      >
                        <i className="ki-outline ki-briefcase fs-3x text-primary mb-2"></i>
                        <span className="fs-5 fw-semibold text-gray-800 mb-0">
                          Customers
                        </span>
                        <span className="fs-7 text-gray-400">Latest cases</span>
                      </Link>
                    </div>
                  </div>
                  <div className="py-2 text-center border-top">
                    <Link
                      to="../../demo38/dist/pages/user-profile/activity.html"
                      className="btn btn-color-gray-600 btn-active-color-primary"
                    >
                      View All
                      <i className="ki-outline ki-arrow-right fs-5"></i>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="app-navbar-item ms-1 ms-md-3 "></div>
              <div className="poistion-relative mt-3 realivestyle">
                <div
                  className="app-navbar-item ms-5 tooltip1"
                  id="kt_header_user_menu_toggle"
                  onClick={toggle_menu_profile}
                  ref={menuToggleRef}
                  // onMouseLeave={toggle_menu_profile}
                >
                  <div
                    className="cursor-pointer symbol symbol-circle symbol-35px symbol-md-45px w-100"
                    data-kt-menu-trigger="{default: 'click', lg: 'hover'}"
                    data-kt-menu-attach="parent"
                    data-kt-menu-placement="bottom-end"
                    id="profilemenu_1"
                  >
                    <img src={logo1} alt="user" />
                  </div>
                  <div
                    className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg menu-state-color fw-semibold  my-4 fs-6 w-275px profileshodow tooltiptext1 pp"
                    data-kt-menu="true"
                    id="profilemenu_2"
                  >
                    <div className="menu-item px-3 ">
                      <div className="menu-content d-flex align-items-center px-3 ">
                        <div className="symbol symbol-50px me-3">
                          {/* <img alt="Logo" src={admin.profile} /> */}
                        </div>
                        <div className="d-flex flex-column ">
                          <div className="fw-bold d-flex align-items-center fs-5">
                            {/* {admin.name} */}
                          </div>
                          <Link
                            to=""
                            className="fw-semibold text-muted text-hover-primary fs-7 text-decoration-none-underline"
                          >
                            {/* {admin.email} */}
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="separator my-2"></div>
                    <div className="menu-item px-5 linkhover">
                      <Link
                        to=""
                        className="menu-link linkhover px-5 text-decoration-none-underline"
                      >
                        Hi, Admin
                      </Link>
                    </div>

                    {/* <div className="menu-item px-5 my-1 linkhover">
                      <Link
                        to=""
                        className="menu-link px-5 text-decoration-none-underline"
                      >
                        Account Settings
                      </Link>
                    </div> */}
                    <div className="menu-item px-5 linkhover">
                      <Link
                        to=""
                        className="menu-link px-5 text-decoration-none-underline"
                        onClick={(e) => signout()}
                      >
                        Sign Out
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="app-navbar-separator separator d-none d-lg-flex"></div>
          </div>
        </div>
        {/* <div
          id="kt_app_sidebar"
          className="app-sidebar flex-column border border-danger"
          data-kt-drawer="true"
          data-kt-drawer-name="app-sidebar"
          data-kt-drawer-activate="{default: true, lg: false}"
          data-kt-drawer-overlay="true"
          data-kt-drawer-width="250px"
          data-kt-drawer-direction="start"
          data-kt-drawer-toggle="#kt_app_sidebar_mobile_toggle"
          onClick={toggle_sidebar}
        ></div> */}
      </div>
      <div className="app-sidebar-separator separator"></div>
    </>
  );
}
