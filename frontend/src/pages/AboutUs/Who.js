import '../../assets/css/AboutUs/Who.css'
import WhoImage from '../../assets/images/who.png'

export default function Who(){
    return (
        <div id="who">
            <h1 className='reverse-gradient-text'>Who Are We</h1>
            <div className='container'>
                <div className='row'>
                    <div className='col-lg-6 col-md-12 d-flex flex-column justify-content-center'>
                        <p>
                            We are developers on a mission to revolutionize exam management.
                        </p>
                        <p>
                            Passionate about innovation, we create impactful solutions.
                        </p>
                        <p>
                            Our commitment to excellence drives us to exceed expectations.
                        </p>
                        <p>
                            Join us on this journey towards a brighter future.
                        </p>
                    </div>
                    <div className='col-lg-6 col-md-12 text-center'>
                        <img src={WhoImage} alt='' className='img-fluid' />
                    </div>
                </div>
            </div>
        </div>
    )
}