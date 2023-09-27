import { useContext } from 'react'
import { NavLink } from 'react-router-dom';

import AuthContext from "../context/AuthContext"

import '../assets/css/Components/Navbar.css'
import logo from '../assets/images/logo.png'


export default function Navbar(){

    const { userData } = useContext(AuthContext)
    console.log(userData)

    return (
        <nav id="navbar" className="navbar navbar-expand-lg sticky">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <a className="navbar-brand" href="/">
            <img src={logo} alt='' width={157} height={70} />
          </a>
          <div className="collapse navbar-collapse" id="navbarToggler">
            <ul className="navbar-nav mb-lg-0 align-items-center">
              <li className="nav-item">
                <NavLink exact="true" to="/" className="nav-link gradient-text">Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/about-us" className="nav-link gradient-text">About Us</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/contact-us" className="nav-link reverse-gradient-text">Contact Us</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/request-demo" className="nav-link primary-onhover-btn">Request Demo</NavLink>
              </li>
            </ul>
            {userData? null:
              <div id="nav-login-register">
                <NavLink to="/login" className="nav-link gradient-text">Login</NavLink>
                
                {/* <p> / </p>
                <NavLink to="/register" className="nav-link reverse-gradient-text">Register</NavLink> */}
              </div>
            }
          </div>
        </div>
      </nav>
    )
}