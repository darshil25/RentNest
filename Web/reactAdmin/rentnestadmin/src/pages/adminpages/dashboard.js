import { faUser,faHouse } from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import '../../assets/style/style.css'
import Sidebar from '../sidebar/sidebar';
import Header from '../header/header';
import Footer from '../footer/footer';
import { fetchData } from '../../reusable';
import { Link } from 'react-router-dom';


export default function Dashboard() {
   document.title = "Rentnest | Dashboard";

  const [customer, setcustomer] = useState('');
  const [server, setserver] = useState("");

   const serverlist = async () => {
     var res = await fetchData("/viewPropertyList", {});
    
     setserver(res.data.length);
   };

  //  const customerlist = async () => {
  //    var res = await fetchData("/customerlist", {});
  //   //  console.log("---------", res.data.length);
  //    setcustomer(res.data.length);
  //  };

   useEffect(() => {
    //  customerlist();
     serverlist();
   }, []);

  return (
    <>
      <div className="d-flex">
        <Sidebar menuId={1} />
        <div className="container mb-5">
          <div className="">
            <Header />
            <div className="d-flex justify-content">
              <div className="col-xl-3 my-5">
                {/* <!--begin::Stats Widget 30--> */}
                <div
                  className="card card-custom boxdiv card-stretch gutter-b"
                  // style="cursor: pointer;"
                >
                  <Link
                    className="text-decoration-none-underline"
                    to="../viewproperty"
                  >
                    {/* <!--begin::Body--> */}
                    <div className="card-body">
                      <FontAwesomeIcon
                        icon={faHouse}
                        className="text-white fs-4"
                      />
                      <span className="card-title font-weight-bolder text-white font-size-h2 mb-0 mt-6 d-block fs-3">
                        {customer}
                      </span>
                      <span className="font-weight-bold text-white font-size-sm">
                        Number Of Property {server}
                      </span>
                    </div>
                  </Link>
                  {/* <!--end::Body--> */}
                </div>
              </div>
            </div>
            <div className="h-300px"></div>
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}
