import { Sparklines, SparklinesLine, SparklinesCurve, SparklinesBars } from 'react-sparklines';

export default function InsightCards(){
    return (
        <div id='insight-cards'>
            <div className="row">
                <div className="col-lg-3 col-md-6 col-xs-12">
                    <div id="students-card" className='insight-card'>
                        <div className="d-flex align-items-center justify-content-between">
                            <div>
                                <h5 className='text-center'>Student</h5>
                                <h4>+10000</h4>
                            </div>
                            <div>
                                <Sparklines data={[5,8,7,10,9,10,8,6,4,6,8,7,6,8]} svgHeight={35} svgWidth={70}>
                                    <SparklinesBars barWidth={10} style={{ fill: '#fff' }} />
                                </Sparklines>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6 col-xs-12">
                    <div id="lecturer-card" className='insight-card'>
                        <div className="d-flex align-items-center justify-content-between">
                            <div>
                                <h5 className='text-center'>Lecturer</h5>
                                <h4>+5000</h4>
                            </div>
                            <div>
                                <Sparklines data={[0,5,3,7,5,10,3,6,5,10]} svgHeight={40} svgWidth={80}>
                                    <SparklinesLine style={{ strokeWidth: 4, stroke: "#fff", fill: "none" }} />
                                </Sparklines>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6 col-xs-12">
                    <div id="subject-card" className='insight-card'>
                        <div className="d-flex align-items-center justify-content-between">
                            <div>
                                <h5>Course</h5>
                                <h4>+24</h4>
                            </div>
                            <div>
                                <Sparklines data={[2, 4, 16, 256, 16, 4, 2, 4, 16, 256, 16, 4, 2]} svgHeight={40} svgWidth={75}>
                                    <SparklinesCurve style={{ strokeWidth: 4, stroke: '#ffffff', fill:"transparent" }} />
                                </Sparklines>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6 col-xs-12">
                    <div id="exam-card" className='insight-card'>
                        <div className="d-flex align-items-center justify-content-between">
                            <div className='d-flex flex-column align-items-center'>
                                <h5>Exam</h5>
                                <h4>+160</h4>
                            </div>
                            <div>
                                <Sparklines data={[5,6,7,9,9,5,3,2,2,4,6,7]} svgHeight={25} svgWidth={100}>
                                    <SparklinesLine style={{ strokeWidth: 4, stroke: '#ffffff', fill:"transparent" }} />
                                </Sparklines>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}