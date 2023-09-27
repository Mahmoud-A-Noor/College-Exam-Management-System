import { useEffect } from 'react'

import PureCounter from "@srexi/purecounterjs";

import '../../assets/css/Home/Counter.css'

export default function Counter() {

    useEffect(() => {
        // eslint-disable-next-line
        const pure = new PureCounter({once: false});
    }, []);

    return (
        <div id="counter">
            <div className='container'>
                <div className='row text-center'>
                    <div className='col-lg-3 col-md-6'>
                        <h4 className='reverse-gradient-text'>+</h4><span className="purecounter reverse-gradient-text" data-purecounter-start="0" data-purecounter-end="700" data-purecounter-duration="0.5">0</span>
                        <p>School</p>
                    </div>
                    <div className='col-lg-3 col-md-6'>
                        <h4 className='gradient-text'>+</h4><span className="purecounter reverse-gradient-text" data-purecounter-start="0" data-purecounter-end="12000" data-purecounter-duration="0.5">0</span>
                        <p>Student</p>
                    </div>
                    <div className='col-lg-3 col-md-6'>
                        <h4 className='reverse-gradient-text'>+</h4><span className="purecounter gradient-text" data-purecounter-start="0" data-purecounter-end="140" data-purecounter-duration="0.5">0</span>
                        <p>College</p>
                    </div>
                    <div className='col-lg-3 col-md-6'>
                        <h4 className='gradient-text'>+</h4><span className="purecounter gradient-text" data-purecounter-start="0" data-purecounter-end="5000" data-purecounter-duration="0.5">0</span>
                        <p>Teacher and Professor</p>
                    </div>
                </div>
            </div>
        </div>
    )
}