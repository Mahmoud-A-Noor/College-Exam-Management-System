import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import '../../assets/css/ContactUs/ContactUs.css'
import ContactUsImage from '../../assets/images/ContactUs.png'

export default function ContactUs(){
    return (
        <>
            <Navbar />
            <div id="contact-us">
                <div></div>
                <div className='container'>
                    <div id="contact-us-header">
                        <h1>Have Some Question?</h1>
                        <p>
                            Thanks for your interest in our services. 
                            Please fill out the form below or e-mail us at <span>support@m_team.com </span> 
                            and we will get back to you promptly regarding your request
                        </p>
                    </div>
                    <div className='row justify-content-evenly align-items-center'>
                        <div className='col-lg-6 col-md-12'>
                            <div id='contact-us-form'>
                                <h3>Contact Us</h3>
                                <form method='post'>
                                    <div className='row'>
                                        <div className='col-lg-6 col-md-12'>
                                            <input className='my-form-control' type='text' placeholder='First Name' />
                                        </div>
                                        <div className='col-lg-6 col-md-12'>
                                            <input className='my-form-control' type='text' placeholder='Last Name' />
                                        </div>
                                        <div className='col-12'>
                                            <input className='my-form-control' type='email' placeholder='Email' />
                                        </div>
                                        <div className='col-12'>
                                            <input className='my-form-control' type='tel' placeholder='Phone Number' />
                                        </div>
                                        <div className='col-12'>
                                            <textarea className='my-form-control' placeholder='Message' rows={4}></textarea>
                                        </div>
                                        <div className='col-lg-4 col-md-12'>
                                            <button type='submit'>Send Message</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            
                        </div>
                        <div className='col-lg-6 col-md-12'>
                            <img src={ContactUsImage}  alt='' className='img-fluid'/>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
        
    )
}