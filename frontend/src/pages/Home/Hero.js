import hero_image from "../../assets/images/Online test-pana.png";
import '../../assets/css/Home/Hero.css'

export default function Hero(){
    return (
        <div id="hero">
          <div className="container">
            <div className="row justify-content-between">
              <div id="hero-text" className="col-lg-4 col-md-12">
                <h1>Examination <br /> Management System</h1>
                <p>An end-to-end automated Examination Management System that conducts, proctors, and evaluates exams, under a unified platform.</p>
                <a href="/request-demo">Get Your Demo Now</a>
              </div>
              <div className="col-lg-6 col-md-12">
                <img src={hero_image} alt="" className="img-fluid" />
              </div>
            </div>
          </div>
        </div>
    )
}