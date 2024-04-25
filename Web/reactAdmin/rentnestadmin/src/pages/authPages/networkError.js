import React, { useEffect, useState } from 'react'
import '../../assets/style/style.css'
import err from '../../assets/image/err.jpg'
import { faEye, faRedo } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function NetworkError() {

  const [route, setroute] = useState("");

  const redirect = () => {

    if (navigator.onLine) {
      // online
      setroute((window.location.href = sessionStorage.getItem("route")), 100);
      setInterval(window.location.href = sessionStorage.getItem("route"),100)
        
    } else {
        console.clear();
    }

  }

  useEffect(() => {
    redirect();
    
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-center">
        <img src={err} className="w-50 p-5"></img>
      </div>
      <div className="d-flex justify-content-center">
        <Link
          to={route}
          className="btn btnButton btn-sm mx-1 p-3"
          onClick={() => redirect()}
        >
          <span className="fs-5 text-white"> Try Again </span>
          {/* <FontAwesomeIcon icon={faRedo} className="fs-5 text-white mt-2" /> */}
        </Link>
      </div>
    </div>
  );
}
