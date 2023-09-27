import '../../assets/css/AboutUs/What.css'
import WhatImage from '../../assets/images/What.png'

export default function What(){
    return (
        <div id="what">
            <h1 className='reverse-gradient-text'>What We Do</h1>
            <div className='container'>
                <div className='row'>
                    <div className='col-lg-6 col-md-12 text-center'>
                        <img src={WhatImage} alt='' className='img-fluid' />
                    </div>
                    <div className='col-lg-6 col-md-12 d-flex flex-column justify-content-center align-items-center'>
                        <div className='about-us-section-content'>
                            <p>
                                we revolutionize exam management, providing a comprehensive platform for streamlined processes. 
                            </p>
                            <p>
                                Our user-friendly interface simplifies exam creation, 
                                secure administration, and result management, 
                                empowering educators and learners alike.
                            </p>
                            <p>
                                Experience efficiency and effectiveness in exam management for a better learning experience.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}