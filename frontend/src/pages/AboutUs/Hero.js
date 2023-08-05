import '../../assets/css/AboutUs/Hero.css'
import AboutUs from '../../assets/images/banner.png'

export default function Hero(){
    return (
        <div id="about-us-hero">
            <div className="wave-container">
                <img src={AboutUs} alt='' className='img-fluid' />
            </div>
            <a className='hero-bubble' href='#who'>Who</a>
            <a className='hero-bubble' href='#where'>Where</a>
            <a className='hero-bubble' href='#what'>What</a>
            <a className='hero-bubble' href='#how'>How</a>
        </div>
    )
}