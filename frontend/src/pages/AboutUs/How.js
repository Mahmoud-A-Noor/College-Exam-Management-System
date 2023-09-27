import '../../assets/css/AboutUs/How.css'

export default function How(){
    return (
        <div id="how">
            <h1 className='gradient-text'>How We Do Things</h1>
            <div className='container'>
                <div className='row align-items-end'>
                    <div className='col-lg-3 col-md-12'>
                        <div className='how-card'>
                            <div className='how-card-icon'>
                                <i class="bi bi-pie-chart-fill"></i>
                            </div>
                            <h4>Analytics & Insights</h4>
                            <p>
                                With powerful analytics tools, we offer valuable insights into exam data and performance metrics. 
                                Our system provides detailed reports, statistical analysis, and visualizations to help educators and administrators identify trends, 
                                strengths, and areas of improvement, ultimately enhancing the assessment process and student outcomes.
                            </p>
                        </div>
                    </div>
                    <div className='col-lg-3 col-md-12'>
                        <div className='how-card'>
                            <div className='how-card-icon'>
                                <i class="bi bi-speedometer"></i>
                            </div>
                            <h4>Performance</h4>
                            <p>
                                Our software is optimized for high-performance, ensuring smooth navigation and quick response times even during peak usage. 
                                Exams run seamlessly, providing a reliable and efficient experience for both administrators and participants.
                            </p>
                        </div>
                    </div>
                    <div className='col-lg-3 col-md-12'>
                        <div className='how-card'>
                            <div className='how-card-icon'>
                                <i class="bi bi-shield-lock-fill"></i>
                            </div>
                            <h4>Security</h4>
                            <p>
                                We prioritize data protection and exam integrity. 
                                Our robust security measures safeguard against unauthorized access and ensure the confidentiality of sensitive information, 
                                allowing users to conduct exams with complete peace of mind.
                            </p>
                        </div>  
                    </div>
                    <div className='col-lg-3 col-md-12'>
                        <div className='how-card'>
                            <div className='how-card-icon'>
                                <i class="bi bi-hand-thumbs-up-fill"></i>
                            </div>
                            <h4>User-Friendly Interface</h4>
                            <p>
                                Intuitively designed, our platform ensures ease of use for all stakeholders. 
                                From exam creation to result management, administrators and participants can navigate the system with minimal training, 
                                streamlining the entire exam process.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}