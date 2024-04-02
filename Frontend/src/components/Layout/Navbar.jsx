import React, { useContext, useState } from 'react'
import { Context } from '../../main'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isAuthorized,setIsAuthorized,user,setUser] = useContext(Context);
  const [show, setShow] = useState(false);

  const navigateTo = useNavigate()
  const handleLogout = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/v1/user/logout", { withCredentials: true })
      setIsAuthorized(false)
      toast.success(response.data.message)
      navigateTo('/login')
    } catch (error) {
      toast.error(error.response.data.message)
      setIsAuthorized(true)
    }
  }
  return (
    <>
      <nav className={isAuthorized ? "navbarShow" : "navbarHide"}>
        <div className="container">
          <div className="logo">
            <img src="JobZee-logos__white.png" alt="logo" />
          </div>
          <ul className={!show ? "menu" : "show-menu menu"}>
            <li>
              <Link to={"/"} onClick={() => setShow(false)} >Home</Link>
            </li>
            <li>
              <Link to={"/job/getall"} onClick={() => setShow(false)}>ALL JOBS</Link>
            </li>
            <li>
              <Link to={"/applications/me"} onClick={() => setShow(false)}>
                {user && user.role === "Employer"
                  ? "APPLICANT'S APPLICATIONS"
                  : "MY APPLICATIONS"}
              </Link>
            </li>
            {user && user.role == "Employer" ?
              (<>
                <li>
                  <Link to={"/job/post"} onClick={() => setShow(false)}>
                    POST NEW JOB
                  </Link>
                </li>
                <li>
                  <Link to={"/job/me"} onClick={() => setShow(false)}>
                    VIEW YOUR JOBS
                  </Link>
                </li>
              </>) : (
                <></>
              )}

            <button onClick={handleLogout}>LOGOUT</button>
          </ul>
          <div className="hamburger">
            <GiHamburgerMenu onClick={() => setShow(!show)} />
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar
