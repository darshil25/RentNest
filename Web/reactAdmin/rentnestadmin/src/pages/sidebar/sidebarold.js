import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "../../assets/style/style.css";
import logo1 from "../../assets/image/bluelogo.png";

import "../../assets/plugins/custom/datatables/datatables.bundle.css";
import "../../assets/plugins/custom/vis-timeline/vis-timeline.bundle.css";
import "../../assets/plugins/global/plugins.bundle.css";

import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

import $ from "jquery";
import { fetchData } from "../../reusable";

export default function Sidebar(menuId) {


  const toggle_menu_accordian = (event) => {
    const clickedElement = event.target;
    $(clickedElement).closest(".menu-accordion").toggleClass("show");
  };

  const sidebarclose = () => {
   
      const toggle = document.getElementById("kt_app_sidebar_navs");
      const toggle1 = document.getElementById("imgg1");
      const toggle2 = document.getElementById("kt_app_sidebar"); 
    
      if (toggle.style.display === "none") {
        toggle.style.display = "block";
        toggle1.style.display = "block";
        toggle2.style.width = "280px";
        // toggle2.style.transition = "width 2s";
        // toggle.style.transition = "width 2s";
      } else {
         toggle.style.display = "none";
         toggle1.style.display = "none";
         toggle2.style.width = "70px";
        //  toggle2.style.transition = "width 2s";
        //  toggle.style.transition = "width 2s";
         
      }

  };

  /**
   * SET MENUS
   */
  //use state starts
  const [menus, setMenus] = useState([]);

  const menulist_api = async () => {
    // const data = {
    //     adminId: 1
    // };
    // console.log(
    //   "API Response: ==================++++======== Menu List Api Calll"
    // );
    const response = await fetchData("/menulist", {});
    if (response.status == "200") {
      //   console.log("---------",response);
      setMenus(response.data);
    }
  };

  // const stylechange = (id) =>{
  //   // $(".menu-link").removeClass("menulinkhover");
  //   // var element = document.getElementById(id);
  //   // element.classList.add("menulinkhover");
  //   // document.getElementById(id).classList.add("menulinkhover");
  //   // $("#sp1").addClassName("menulinkhover");
  // }

  useEffect(() => {
    menulist_api();
    // stylechange(menuId);
  }, []);

  return (
    <>
      {/* <!--begin::Sidebar--> */}
      <div
        id="kt_app_sidebar"
        className="app-sidebar flex-column boxshodow "
        data-kt-drawer="true"
        data-kt-drawer-name="app-sidebar"
        data-kt-drawer-activate="{default: true, lg: false}"
        data-kt-drawer-overlay="true"
        data-kt-drawer-width="250px"
        data-kt-drawer-direction="start"
        data-kt-drawer-toggle="#kt_app_sidebar_mobile_toggle"
        // style={{ height: "900px" }}
      >
        <div
          className="app-sidebar-header d-flex flex-stack d-none d-lg-flex pt-8 pb-2"
          id="kt_app_sidebar_header"
        >
          {/* <!--begin::Logo--> */}
          <a href="#" className="app-sidebar-logo" id="imgg1">
            <img
              id="imgg"
              alt="Logo"
              src={logo1}
              className="h-50px d-none d-sm-inline app-sidebar-logo-default theme-light-show"
            />
          </a>
          {/* <!--end::Logo--> */}
          {/* <!--begin::Sidebar toggle--> */}
          <div
            id="kt_app_sidebar_toggle"
            className="app-sidebar-toggle btn btn-sm btn-icon bg-light btn-color-gray-700 btn-active-color-primary d-none d-lg-flex rotate"
            data-kt-toggle="true"
            data-kt-toggle-state="active"
            data-kt-toggle-target="body"
            data-kt-toggle-name="app-sidebar-minimize"
            onClick={() => sidebarclose()}
          >
            <i className="ki-outline ki-text-align-right rotate-180 fs-1 linkhover"></i>
          </div>
          {/* <!--end::Sidebar toggle--> */}
        </div>
        <div className="app-sidebar-separator separator"></div>
        {/* <!--begin::Navs--> */}
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

              {menus.map((val) => {
                if (val.mainMenuId != 0) {
                  return (
                    <div
                      data-kt-menu-trigger="click"
                      className="menu-item menu-accordion"
                      key={val.menuId}
                    >
                      <span
                        className="menu-link"
                        onClick={toggle_menu_accordian}
                      >
                        {/* <span className="menu-icon">
                          <i className={"fs-3 " + val.icon}></i>
                        </span>
                        <span className="menu-title">{val.menuName}</span>
                        <span className="menu-arrow"></span> */}
                      </span>

                      <div className="menu-sub menu-sub-accordion">
                        <div
                          data-kt-menu-trigger="click"
                          className="menu-item menu-accordion"
                        >
                          {
                            // val.mainMenuId.map((subval, index) => {
                            //     return(
                            //         <span className="menu-link">
                            //             <Link className="menu-bullet" to={subval.path}>
                            //                 <span className="bullet bullet-dot"></span>
                            //             </Link>
                            //             <Link className="menu-title" to={subval.path}>{subval.menuName}</Link>
                            //             {
                            //                 (subval.add == "YES") ? <Link className="menu-icon"><i className="fa fa-plus-square fs-3" to={subval.addPath}></i></Link> : ""
                            //             }
                            //         </span>
                            //     )
                            // })
                          }
                        </div>
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div
                      data-kt-menu-trigger="click"
                      className="menu-item here"
                      key={val.menuId}
                    >
                      <li
                        id={"sp" + val.menuId}
                        className={`menu-link ${
                          menuId.menuId === val.menuId ? `menulinkhover` : ``
                        }`}
                        // onClick={()=> stylechange("sp" + val.menuId)}
                        // onClick={() => $(`#sp${val.menuId}`).addClass("menulinkhover")}
                      >
                        {/* <label>{val.menuName}</label> */}
                        <Link
                          className="menu-icon text-decoration-none-underline"
                          to={val.path}
                        >
                          {/* <i className={"fs-3 " + val.icon}></i> */}
                          {/* <i className="ki-outline ki-home-2 fs-2"></i> */}
                          <span className="material-symbols-outlined">
                            {val.icon}
                          </span>
                        </Link>
                        <Link
                          className="menu-title text-decoration-none-underline"
                          to={val.path}
                        >
                          {val.menuName}
                        </Link>
                        {/* { 
                                                        (val.add == "YES") ? <Link className="menu-icon"><i className="fa fa-plus-square fs-3" to={val.addPath}></i></Link> : ""
                                                    } */}
                      </li>
                    </div>
                  );
                }
              })}
            </div>
            {/* <!--end::Sidebar menu--> */}
          </div>
        </div>
        {/* <!--end::Navs--> */}
      </div>

      {/* <!--end::Sidebar--> */}
    </>
  );
}
