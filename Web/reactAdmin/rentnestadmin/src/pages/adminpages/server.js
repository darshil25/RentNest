import { faEye, faLock, faMagnifyingGlass, faTrash, faUnlock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { fetchData } from '../../reusable';
import Sidebar from '../sidebar/sidebar';
import Header from '../header/header';
import DataTable from 'react-data-table-component';
import '../adminpages/viewserver'
import { Link } from 'react-router-dom';
import Footer from "../footer/footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 
import { StyleSheetManager } from "styled-components";
import Swal from "sweetalert2";

export default function Server() {
     document.title = "Rentnest | Server";

     const shouldForwardProp = (prop) => (prop === "sortActive" ? false : true);

    const [server, setserver] = useState([]);
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
              title: "Are You Sure? You Want to Block This Server.",
              icon: "warning",
              showCancelButton: true,
            }
          : {
              title: "Are You Sure? You Want to Unblock This Server.",
              icon: "warning",
              showCancelButton: true,
            }
      ).then(async (result) => {
        if (result.isConfirmed) {
          var res = await fetchData("/admin/serverblock", {
            adminId: "1",
            serverId: `${id}`,
            block: block,
          });
          
          if (res.status === 200) {
            Swal.fire(
              block == "1"
                ? {
                    title: "Customer Block Successfully !",
                    icon: "success",
                  }
                : {
                    title: "Customer Unblock Successfully !",
                    icon: "success",
                  }
            ).then((res) => {
              if (res.isConfirmed) {
                // window.location.href = "viewcustomer";
                viewserver();
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
        {
          name: "Srno",
          selector: (row) => row.srNo,
          sortable: true,
          filter: true,
        },
        {
          name: "ServerName",
          selector: (row) => row.firstName + " " + row.lastName,
          sortable: true,
          filter: true,
        },
        {
          name: "email",
          selector: (row) => row.email,
          sortable: true,
          filter: true,
        },
        {
          name: "mobileNumber",
          selector: (row) => row.mobileNumber,
          sortable: true,
          filter: true,
        },

        {
          name: "status",
          selector: (row) => (
            <span
              className={`${row.status == "0" ? 'text-warning' : row.status == "1" ? 'text-success' : 'text-danger' } `}
            >
              {row.status == "0"
                ? "Pending"
                : row.status == "1"
                ? "Approve"
                : "Reject"}
            </span>
          ),
          sortable: true,
          filter: true,
        },

        {
          name: "Action",
          cell: (row) => (
            <div className="d-flex justify-content-between">
            

              <Link
                to="../serverdetails"
                className="btn btnButton btn-sm mx-1"
                state={{ serverDetails: row }}
                onClick={()=>(window.sessionStorage.setItem("route","serverdetails"))}
              >
                <FontAwesomeIcon icon={faEye} className="fs-6 text-white" />
              </Link>
              <button
              className={`btn btn-sm mx-1 ${row.block == 0 ? `btnButtonwarn` : `btnButtongrey`}`}
              onClick={() => {
                blockstatus(row.serverId,row.block == 0 ? '1' : '0');
              }}
            >
              <FontAwesomeIcon icon={row.block == 0 ? faUnlock : faLock} className='fs-5' />
            </button>
            </div>
          ),
        },
      ],
      []
    );

    const handlePageChange = (page) => {
      // viewserver(page);
      setcurrentPage(page);
    };

    const handlePerRowsChange = async (newPerPage,page) => {
      setPerPage(newPerPage);
      setcurrentPage(page);
      // viewserver(1, newPerPage);
    };

    function searchData(e) {
      const str = e.target.value.toLowerCase();
      setissearch(true)
      setSearchText(str);
      // setcurrentPage(1);
    }

     const viewserver = useCallback(
       async (page, size = perPage) => {
         setsrno(page);
         setLoading(true);
         let data = {
           // offset: startIndex,
           // limit: lastIndex,
         };

         var response = await fetchData(
           `/serverlist?&keyword=${searchText}`,
           data
         );
         if (response.status === 200) {
          setTimeout(() => {
            
            setserver(response.data);
            // console.log(response.data.length);
            setTotalRows(response.data.length == "0" ? '0' : response.data[0]["Count"]);
            setLoading(false);
          }, 500);

         } else {
          //  console.log(response);
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

     const paginatedData = server.slice(
       (currentPage - 1) * perPage,
       currentPage * perPage
     );

    useEffect(() => {
      viewserver(1);
       if (navigator.onLine) {
         // online
       } else {
          setisonline(true)
        //  toast.error("No internet connection", {
        //    position: "top-right",
        //    //  autoClose: 2000,
        //    hideProgressBar: false,
        //    closeOnClick: true,
        //    pauseOnHover: true,
        //    draggable: true,
        //    progress: undefined,
        //    theme: "dark",
        //  });
       }

    }, [currentPage, viewserver, searchText]);



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
                      Server List
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
                      <li className="breadcrumb-item text-muted">Server</li>
                      {/* <!--end::Item--> */}
                    </ul>
                  </div>
                </div>
              </div>
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
                        className="form-control  w-250px ps-14"
                        placeholder="Search user"
                        // value={searchText}
                        onChange={(e) => searchData(e)}
                      />
                    </div>
                  </div>
                  {/* <!--begin::Toolbar--> */}

                  <div
                    className="d-flex justify-content-end align-items-center d-none"
                    data-kt-customer-table-toolbar="selected"
                  >
                    <div className="fw-bold me-5">
                      <span
                        className="me-2"
                        data-kt-customer-table-select="selected_count"
                      ></span>
                      Selected
                    </div>
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

              <div className="card-body pt-0">
                {issearch && server.length <= 0 ? (
                  <div className="d-flex text-center w-100 align-content-center justify-content-center">
                    No server found
                  </div>
                ) : (
                  <StyleSheetManager shouldForwardProp={shouldForwardProp}>
                    <DataTable
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
                      // progressComponent={
                      //   loading ? (
                      //     <div className="d-flex text-center w-100 align-content-center justify-content-center">
                      //       No matching records found
                      //     </div>
                      //   ) : (
                      //     <div>No data record</div>
                      //   )
                      // }
                      pagination
                      paginationServer
                      paginationPerPage={perPage}
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
