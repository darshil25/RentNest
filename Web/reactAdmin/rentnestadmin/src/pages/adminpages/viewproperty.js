import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Sidebar from '../sidebar/sidebar'
import Header from '../header/header';
import DataTable from "react-data-table-component";
import { fetchData } from '../../reusable';
import {faLock, faMagnifyingGlass, faPencil, faTrash, faUnlock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Footer from '../footer/footer';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 
import { StyleSheetManager } from "styled-components";
import Swal from "sweetalert2";
import { Link } from 'react-router-dom';

export default function ViewProperty() {
  document.title = "Rentnest | Customer";

const shouldForwardProp = (prop) => (prop === "sortActive" ? false : true);
 
  const [customer, setcustomer] = useState([]);
  const [loading, setLoading] = useState(false);
  const [issearch, setissearch] = useState(false);
  const [isonline, setisonline] = useState(false);

  const [srno, setsrno] = useState(1);
  const [perPage, setPerPage] = useState(10); // Number of rows per page
  const [searchText, setSearchText] = useState("");
  const [totalRows, setTotalRows] = useState(0);
  const [currentPage, setcurrentPage] = useState(1);

  const blockstatus = (id,block) =>{
      const swal = Swal.fire(
        block == "1"
          ? {
              title: "Are You Sure? You Want to Block This Customer.",
              icon: "warning",
              showCancelButton: true,
            }
          : {
              title: "Are You Sure? You Want to Unblock This Customer.",
              icon: "warning",
              showCancelButton: true,
            }
      ).then(async (result) => {
        if (result.isConfirmed) {
          var res = await fetchData("/admin/customerblock", {
            adminId: "1",
            customerId: `${id}`,
            block: block,
          });

          if (res.status === 200) {
            Swal.fire(block == "1" ? {
              title: "Customer Block Successfully !",
              icon: "success",
            }:{
              title: "Customer Unblock Successfully !",
              icon: "success",
            }).then((res) => {
              
              if (res.isConfirmed) {
                // window.location.href = "viewcustomer";
                viewcustomer();
              }
            });
          } else {
           
            Swal.fire({
              title: "Something went Wrong !",
              icon: "error",
            });
          }
        }
      });
  


  }


  const column = useMemo(
    () => [
      // {
      //   name: "Srno",
      //   selector: (row) => row.srNo,
      //   sortable: true,
      //   filter: true,
      // },
      {
        name: "PropertyName",
        selector: (row) => row.propertyName,
        sortable: true,
        filter: true,
      },
      {
        name: "Location",
        selector: (row) => row.location,
        sortable: true,
        filter: true,
      },
      {
        name: "Price",
        selector: (row) => row.price,
        sortable: true,
        filter: true,
      },

      {
        name: "Action",
        cell: (row) => (
          <div className="d-flex justify-content-between">
            <Link
              className="btn btn-sm mx-1 btnButton"
              to={"../property"}
              state={{ propertEdit: row }}
            >
              <FontAwesomeIcon icon={faPencil} className="fs-5" />
            </Link>
          </div>
        ),
      },
    ],
    []
  );

    function searchData(e) {
      const str = e.target.value.toLowerCase();
      setissearch(true);
      setSearchText(str);
      setcurrentPage(1);

    }

    const handlePageChange = (page) => {
      // viewcustomer(page);
      setcurrentPage(page);
    };

    const handlePerRowsChange = async (newPerPage,page) => {
      setPerPage(newPerPage);
      setcurrentPage(page);
      // viewcustomer(1, newPerPage);
    };


  const viewcustomer = useCallback(
    async (page, size = perPage) => {
      setsrno(page);
      
      setLoading(true);
      let data = {
        // offset: startIndex,
        // limit: lastIndex,
      };

      var response = await fetchData(
        `/viewPropertyList?keyword=${searchText}`,
        data
      );
      
      if (response.status === 200) {
        setTimeout(() => {
          setcustomer(response.data);
          setTotalRows(response.data.length == "0" ? '0' : response.data[0]["Count"]);
          setLoading(false);
        }, 500);
      } else {
        // console.log(response);
      
        toast.error(response.message, {
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
    [searchText, perPage]
  );


  const paginatedData = customer.slice(
       (currentPage - 1) * perPage,
       currentPage * perPage
     );
     
    // const [isOnline, setIsOnline] = useState(navigator.onLine);
    
  useEffect(() => {
    viewcustomer(1);
  
    if(navigator.onLine){
      // online
    }else{
      setisonline(true);
      
      //  toast.error("No internet connection", {
      //    position: "top-right",
      //   //  autoClose: 2000,
      //    hideProgressBar: false,
      //    closeOnClick: true,
      //    pauseOnHover: true,
      //    draggable: true,
      //    progress: undefined,
      //    theme: "dark",
      //  });
    }

  }, [currentPage, viewcustomer, searchText]);

  return (
    <>
      <ToastContainer />

      <div className="d-flex">
        <Sidebar menuId={2} />
        <div className="container-fluid">
          <Header />
          <div id="kt_app_toolbar" className="app-toolbar pt-7 pt-lg-10">
            {/* <!--begin::Toolbar container--> */}
            <div
              id="kt_app_toolbar_container"
              className="app-container container-fluid d-flex align-items-stretch"
            >
              {/* <!--begin::Toolbar wrapper--> */}
              <div className="app-toolbar-wrapper d-flex flex-stack flex-wrap gap-4 w-100">
                {/* <!--begin::Page title--> */}
                <div className="page-title d-flex flex-column justify-content-center gap-1 me-3 mb-4">
                  {/* <!--begin::Title--> */}
                  <h1 className="page-heading d-flex flex-column justify-content-center text-dark fw-bold fs-3 m-0">
                    Property List
                  </h1>
                  {/* <!--end::Title--> */}
                  {/* <!--begin::Breadcrumb--> */}
                  <ul className="breadcrumb breadcrumb-separatorless fw-semibold fs-7 my-0">
                    {/* <!--begin::Item--> */}
                    <li className="breadcrumb-item text-muted">
                      {/* <a href="../../demo38/dist/index.html" className="text-muted text-hover-primary">Home</a> */}
                      Home
                    </li>
                    {/* <!--end::Item--> */}
                    {/* <!--begin::Item--> */}
                    <li className="breadcrumb-item">
                      <span className="bullet bg-gray-400 w-5px h-2px"></span>
                    </li>

                    {/* <!--end::Item--> */}
                    {/* <!--begin::Item--> */}
                    <li className="breadcrumb-item text-muted">Property</li>
                    {/* <!--end::Item--> */}
                  </ul>
                  {/* <!--end::Breadcrumb--> */}
                </div>
                {/* <!--end::Page title--> */}
              </div>
              {/* <!--end::Toolbar wrapper--> */}
            </div>
            {/* <!--end::Toolbar container--> */}
          </div>
          <div className="card">
            {/* <!--begin::Card header--> */}
            <div className="card-header border-0 pt-6">
              {/* <!--begin::Card title--> */}
              <div className="card-title">
                {/* <!--begin::Search--> */}
                {/* <div className="d-flex align-items-center position-relative my-1">
                  <i className="ki-outline ki-magnifier fs-3 position-absolute ms-5"></i>
                  <input
                    type="text"
                    data-kt-customer-table-filter="search"
                    className="form-control form-control-solid w-250px ps-12"
                    placeholder="Search Customers"
                  />
                </div> */}
                {/* <!--end::Search--> */}
              </div>
              {/* <!--begin::Card title--> */}
              {/* <!--begin::Card toolbar--> */}
              <div className="card-toolbar">
                <div className="row d-flex justify-content-between">
                  <div className="col-4">
                    <FontAwesomeIcon
                      icon={faMagnifyingGlass}
                      className="fs-3 position-absolute p-1 mx-2 text-secondary"
                    />
                    <input
                      type="text"
                      data-kt-user-table-filter="search"
                      className="form-control w-250px ps-14"
                      placeholder="Search user"
                      // value={searchText}
                      onChange={(e) => searchData(e)}
                    />
                  </div>
                  <div className="col-6 ml-5 pl-5">
                    <Link
                      to="../property"
                      className="btn btn-sm fs-5 mx-1 btnButton"
                    >
                      Add Property
                    </Link>
                  </div>
                </div>
                {/* <!--begin::Toolbar--> */}

                {/* <!--end::Toolbar--> */}
                {/* <!--begin::Group actions--> */}
                <div
                  className="d-flex justify-content-end align-items-center d-none"
                  data-kt-customer-table-toolbar="selected"
                >
                  <button
                    type="button"
                    className="btn btn-danger"
                    data-kt-customer-table-select="delete_selected"
                  >
                    Delete Selected
                  </button>
                </div>
                {/* <!--end::Group actions--> */}
              </div>
              {/* <!--end::Card toolbar--> */}
            </div>
            {/* <!--end::Card header--> */}
            {/* <!--begin::Card body--> */}
            <div className="card-body pt-0">
              {issearch && customer.length <= 0 ? (
                <div className="d-flex text-center w-100 align-content-center justify-content-center">
                  No Customer found
                </div>
              ) : (
                <StyleSheetManager shouldForwardProp={shouldForwardProp}>
                  <DataTable
                    $sortActive={true}
                    title=""
                    className="col-12"
                    columns={column}
                    data={paginatedData}
                    progressPending={loading}
                    progressComponent={
                      isonline ? (
                        <div
                          className="alert alert-danger errorMesg"
                          role="alert"
                        >
                          No internet connection! Please check your internet
                          connectivity
                        </div>
                      ) : (
                        <div
                          className="spinner-border"
                          style={{ width: "3rem", height: "3rem" }}
                          role="status"
                        >
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      )
                    }
                    pagination
                    paginationServer
                    paginationPerPage={10}
                    paginationTotalRows={totalRows}
                    paginationDefaultPage={currentPage}
                    onChangeRowsPerPage={handlePerRowsChange}
                    onChangePage={handlePageChange}
                    // subHeader
                    // subHeaderComponent={<SearchComponent handleSearch={handleSearch} searchText={searchText} />}
                  />
                </StyleSheetManager>
              )}

              {/* <!--end::Table--> */}
            </div>
            {/* <!--end::Card body--> */}
          </div>
          {paginatedData.length <= 10 ? <div className="h-300px"></div> : ""}
          <Footer></Footer>
        </div>
      </div>
    </>
  );
}
