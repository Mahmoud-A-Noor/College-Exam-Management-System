import { useEffect, useState } from 'react';
import '../../assets/css/Home/Partners.css'

import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

import CairoUniversity from '../../assets/images/Cairo University.png'
import HelwanUniversity from '../../assets/images/kyoto university.png'
import ArizonaUniversity from '../../assets/images/Arizona University.png'
import HarvardUniversity from '../../assets/images/Harvard University.png'
import MIT from '../../assets/images/Massachusetts Institute of Technology (MIT).png'
import StanfordUniversity from '../../assets/images/Stanford University.png'
import TokyoInternationalUniversity from '../../assets/images/Tokyo International University.png'
import CentralFloridaUniversity from '../../assets/images/University of Central Florida.png'
import NotreDameUniversity from '../../assets/images/University of Notre Dame.png'
import WashingtonUniversity from '../../assets/images/Washington University.png'
import KyotoUniversity from '../../assets/images/kyoto university.png'
import FukuiUniversity from '../../assets/images/university of fukui.png'


export default function Partner(){

    const [itemsToShow, setItemsToShow] = useState(4);

    const handleResize = () => {
      if (window.innerWidth >= 1200) {
        setItemsToShow(4);
      } else if (window.innerWidth >= 992) {
        setItemsToShow(3);
      } else if (window.innerWidth >= 768) {
        setItemsToShow(2);
      } else {
        setItemsToShow(1);
      }
    };
  
    useEffect(() => {
      handleResize();
  
      window.addEventListener('resize', handleResize);
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);



    return (
        <div id="partners">
            <OwlCarousel className='owl-theme' loop={true} autoplay={true} margin={10} items={itemsToShow}>
                <div className='item'>
                    <img className='carousel-img' src={CairoUniversity} alt='' />
                </div>
                <div className='item'>
                    <img className='carousel-img' src={HelwanUniversity} alt='' />
                </div>
                <div className='item'>
                    <img className='carousel-img' src={ArizonaUniversity} alt='' />
                </div>
                <div className='item'>
                    <img className='carousel-img' src={HarvardUniversity} alt='' />
                </div>
                <div className='item'>
                    <img className='carousel-img' src={MIT} alt='' />
                </div>
                <div className='item'>
                    <img className='carousel-img' src={StanfordUniversity} alt='' />
                </div>
                <div className='item'>
                    <img className='carousel-img' src={TokyoInternationalUniversity} alt='' />
                </div>
                <div className='item'>
                    <img className='carousel-img' src={CentralFloridaUniversity} alt='' />
                </div>
                <div className='item'>
                    <img className='carousel-img' src={NotreDameUniversity} alt='' />
                </div>
                <div className='item'>
                    <img className='carousel-img' src={WashingtonUniversity} alt='' />
                </div>
                <div className='item'>
                    <img className='carousel-img' src={KyotoUniversity} alt='' />
                </div>
                <div className='item'>
                    <img className='carousel-img' src={FukuiUniversity} alt='' />
                </div>
            </OwlCarousel>;
        </div>
    )
}