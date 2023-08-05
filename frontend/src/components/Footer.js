import { NavLink } from 'react-router-dom';
import '../assets/css/Components/Footer.css'
import logo from '../assets/images/logo.png'


export default function Footer(){
    return (
        <div id='footer'>
            <div className='container'>
                <div className='row justify-content-between'>
                <div className='col-lg-2 col-md-12'>
                    <ul id="footer-nav-items">
                    <li className="nav-item">
                        <NavLink exact="true" to="/" className="footer-nav-link gradient-text">
                        <i className="bi bi-chevron-right"></i>Home
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/about-us" className="footer-nav-link gradient-text">
                        <i className="bi bi-chevron-right"></i>About Us
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/contact-us" className="footer-nav-link reverse-gradient-text">
                        <i className="bi bi-chevron-right"></i>Contact Us
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/request-demo" className="footer-nav-link gradient-text">
                        <i className="bi bi-chevron-right"></i>Request Demo
                        </NavLink>
                    </li>
                    </ul>
                </div>
                <div className='col-lg-3 col-md-12'>
                    <div id='footer-logo'>
                    <img src={logo} alt='' />
                    </div>
                </div>
                </div>
                <div className='divider'></div>
                <ul id='footer-social'>
                <li><a href='/' className='gradient-text'><i className="bi bi-facebook"></i></a></li>
                <li><a href='/' className='reverse-gradient-text'><i className="bi bi-twitter"></i></a></li>
                <li><a href='/' className='gradient-text'><i className="bi bi-google"></i></a></li>
                <li><a href='/' className='reverse-gradient-text'><i className="bi bi-skype"></i></a></li>
                <li><a href='/' className='gradient-text'><i className="bi bi-linkedin"></i></a></li>
                </ul>
                <p id='copyright'>
                Copyright © 2023. <span>M Team</span>. All rights reserved.
                </p>
            </div>
            </div>
    );
} 