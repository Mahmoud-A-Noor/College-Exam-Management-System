// import StudentWhiteImg from '../../../../assets/images/student-white.png'
import StudentWhiteImg from '../../../../assets/images/student-filled.png'
import ExamWhiteImg from '../../../../assets/images/exam-white-without-pen.png'
import SuccessfulStudentImg from '../../../../assets/images/successful-student.png'
import FailedStudentImg from '../../../../assets/images/failed-student.png'

export default function InsightCards({lecturerInsights}){
    return (
        <div id='insight-cards'>
            <div className="row">
                <div className="col-lg-3 col-md-6 col-xs-12">
                    <div id="student-card" className='insight-card'>
                        <div className="d-flex align-items-center justify-content-between">
                            <div className='text-center'>
                                <h4>{lecturerInsights.enrollment_requests_count}</h4>
                                <h5>Student</h5>
                            </div>
                            <div>
                                <img src={StudentWhiteImg} alt='' style={{"width":"60px", "height":"60px"}} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6 col-xs-12">
                    <div id="exam-card" className='insight-card'>
                        <div className="d-flex align-items-center justify-content-between">
                            <div className='text-center'>
                                <h4>{lecturerInsights.exams_count}</h4>
                                <h5>Exams</h5>
                            </div>
                            <div>
                                <img src={ExamWhiteImg} alt='' style={{"width":"50px", "height":"60px"}} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6 col-xs-12">
                    <div id="successful-student-card" className='insight-card'>
                        <div className="d-flex align-items-center justify-content-between">
                            <div>
                                <h4>{lecturerInsights.successful_students_count}</h4>
                                <h5>Successful Student</h5>
                            </div>
                            <div>
                                <img src={SuccessfulStudentImg} alt='' style={{"width":"60px", "height":"60px"}} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6 col-xs-12">
                    <div id="failed-student-card" className='insight-card'>
                        <div className="d-flex align-items-center justify-content-between">
                            <div>
                                <h4>{lecturerInsights.failed_students_count}</h4>
                                <h5>Failed Student</h5>
                            </div>
                            <div>
                                <img src={FailedStudentImg} alt='' style={{"width":"80px", "height":"60px"}} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}