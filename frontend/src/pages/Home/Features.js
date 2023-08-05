import '../../assets/css/Home/Features.css'
import deadline from '../../assets/images/Deadline-pana.png'
import schedule from '../../assets/images/schedule.png'
import report from '../../assets/images/report.png'

export default function Features(){
    return (
        <div id="features">
            <div className='feature'>
                <div className='container'>
                    <div className='row justify-content-around'>
                        <div className='col-lg-6 col-md-12'>
                            <img className='img-fluid feature-img' src={deadline} alt='' />
                        </div>
                        <div className='col-lg-4 col-md-12 feature-text'>
                            <h3 className='reverse-gradient-text'>Maximum gain <br /> <span className='gradient-text'>Minimum effort</span></h3>
                            <p>Our System Eliminates physical transfer of forms and papers, redundant printing of multiple sets of question papers, saving significant time, cost, and effort.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='feature'>
                <div className='container'>
                    <div className='row justify-content-between'>
                        <div className='col-lg-4 col-md-12 feature-text'>
                            <h3 className='gradient-text'>Efficient Exam <span className='reverse-gradient-text'>Scheduling</span></h3>
                            <p>Our System allows administrators of colleges and institutes to create exam schedules easily, making it easier to manage exams.</p>
                        </div>
                        <div className='col-lg-6 col-md-12'>
                            <img className='img-fluid feature-img' src={schedule} alt='' />
                        </div>
                    </div>
                </div>
            </div>
            <div className='feature'>
                <div className='container'>
                    <div className='row justify-content-around'>
                        <div className='col-lg-6 col-md-12'>
                            <img className='img-fluid feature-img' src={report} alt='' />
                        </div>
                        <div className='col-lg-4 col-md-12 feature-text'>
                            <h3 className='reverse-gradient-text'>Faster and Accurate <br /> <span className='gradient-text'>Results Processing</span></h3>
                            <p>Our System can process results quickly and accurately, making it easy to generate reports, grade sheets, and other documents required for analyzing student performance.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}