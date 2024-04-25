import React,{useEffect, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "../assest/css/bootstrap.min.css"
import "../assest/css/apartment-layout.css"
import "../assest/css/apartment-colors-blue.css"
import "../assest/css/plugins.css"
import "../assest/css/font-awesome.min.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import SweetAlert from "react-bootstrap-sweetalert";



export default function Header() {
const navigate = useNavigate()
const [showLogout, setshowLogout] = useState(false)
const [chkLogin, setchkLogin] = useState(false);
  
const logOut = () => {
    setshowLogout(true)
  }

  // Cancel Click
  const onCancel = () => {
    setshowLogout(false)
}
	 ;
const signOut = () => {
		setshowLogout(false)
		window.localStorage.removeItem('email');
		window.localStorage.removeItem('userId');
		navigate("/home");
	}

	 useEffect(() => {
     const userId = window.localStorage.getItem("userId");
     if (userId == "" || userId == null || userId == undefined) {
       setchkLogin(true);
     }
   }, []);
  return (
    <>
      {showLogout && (
        <SweetAlert
          show={showLogout}
          //   custom
          showCancel
          showCloseButton
          confirmBtnText="Yes"
          cancelBtnText="No"
          confirmBtnBsStyle="primary"
          cancelBtnBsStyle="light"
          title="Logout!"
          onConfirm={signOut}
          onCancel={onCancel}
        >
          Are you sure you want to logout?
        </SweetAlert>
      )}

      <header>
        <div className="top-bar-wrapper">
          <div className="container top-bar">
            <div className="row">
              <div className="col-xs-5 col-sm-8">
                <div className="top-mail pull-left hidden-xs">
                  <span className="top-icon-circle">
                    <i className="fa fa-envelope fa-sm"></i>
                  </span>
                  <span className="top-bar-text">smitp6875@gmail.com</span>
                </div>
                <div className="top-phone pull-left hidden-xxs">
                  <span className="top-icon-circle">
                    <i className="fa fa-phone"></i>
                  </span>
                  <span className="top-bar-text"> +91 9265934440</span>
                </div>
                <div className="top-localization pull-left hidden-sm hidden-md hidden-xs">
                  <span className="top-icon-circle pull-left">
                    <i className="fa fa-map-marker"></i>
                  </span>
                  <span className="top-bar-text">
                  Cozy Courtyard, Nana mava main
                  road, Rajkot, Gujarat, India
                  </span>
                </div>
              </div>
              <div className="col-xs-7 col-sm-4">
                <div
                  className="top-social-last top-dark pull-right"
                  data-toggle="tooltip"
                  data-placement="bottom"
                >
                  {chkLogin ? (
                    <>
                      {/* <div className='row mt-2'>
                        <Link onClick={logOut} className="top-icon-circle">
                          <i className="fa fa-user"></i>
                        </Link>
                      <div className=" text-white col-5">LogIn</div>
                    </div> */}
                      <Link to={"../login"} title='Login' className="top-icon-circle">
                        <i className="fa fa-user"></i>
                      </Link>
                    </>
                  ) : (
                    <Link onClick={logOut} className="top-icon-circle">
                      <i className="fa fa-user"></i>
                    </Link>
                  )}
                </div>

                {chkLogin ? (
                  <div
                    className="top-social-last top-dark pull-right mx-2"
                    data-toggle="tooltip"
                    data-placement="bottom"
                  >
                    <Link to={"../register"} title='Register' className="top-icon-circle">
                      <i className="fa fa-user-plus"></i>
                    </Link>
                  </div>
                ) : (
                  ""
                )}

                {/* <div className="mx-1 top-social-last top-dark pull-right" data-toggle="tooltip" data-placement="bottom" >
							<Link onClick={logOut} className="top-icon-circle"  >
								<i className="fa fa-home"></i>
							</Link>
						</div>	 */}
              </div>
            </div>
          </div>
          {/* <!-- /.top-bar -->	 */}
        </div>
        {/* <!-- /.Page top-bar-wrapper -->	 */}
        <nav className="navbar main-menu-cont pr-0 pt-0 pb-0 p-4">
          <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#navbar"
            aria-expanded="false"
            aria-controls="navbar"
          >
            <span className="sr-only">Toggle navigation</span>
            <FontAwesomeIcon icon={faBars} />
          </button>
          <div className="container p-3">
            <div id="navbar p-5">
              <ul className="nav navbar-right">
                <li className="nav_item">
                  <Link className="nav_item_text fs-5" to="../home">
                    Home
                  </Link>
                </li>
                <li className="nav_item disable">
                  <Link className="nav_item_text fs-5" to={"../myproperty"}>
                    My Property
                  </Link>
                </li>
                {/* <li className="nav_item">
                        <Link className="nav_item_text fs-5" to=""></Link>
                    </li> */}
              </ul>
            </div>
          </div>
        </nav>
        {/* <!-- /.mani-menu-cont -->	 */}
      </header>
    </>
  );
}
