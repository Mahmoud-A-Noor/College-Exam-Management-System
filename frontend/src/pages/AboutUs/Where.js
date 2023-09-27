import '../../assets/css/AboutUs/Where.css'
import WhereImage from '../../assets/images/where.png'

export default function Where(){
    return (
        <div id="where">
            <h1 className='gradient-text'>Where Are We</h1>
            <div className='container'>
                <div className='row d-flex justify-content-center align-items-center'>
                    <div className='col-lg-4 col-md-12 text-center'>
                        <p>
                            We are headquartered in Egypt, a vibrant hub of innovation and technology.
                        </p>
                    </div>
                    <div className='col-lg-4 col-md-12 text-center'>
                        <p>
                            Our physical presence enables us to connect with our community and partners effectively.
                        </p>
                    </div>
                    <div className='col-lg-4 col-md-12 text-center'>
                        <p>
                            While we operate from Egypt, our reach extends globally through our online platform.
                        </p>
                    </div>
                    <div className='col-12 '>
                        <div className='row'>
                            <div className='col-lg-6 col-md-10 mx-auto'>
                                <img src={WhereImage} alt='' className='img-fluid' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}