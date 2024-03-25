import CircularProgressBar from "./CircularProgressBar"

export default function InsightCards({studentInsightsData}){


    const insights = studentInsightsData?.map((record, index)=>{
        return (
            <div key={record.courseName} className="col-xl-3 col-lg-4 col-md-6 col-xs-12">
                <div id={`course-${index+1}-card`} className='insight-card'>
                    <div className="d-flex align-items-center justify-content-between">
                        <div className='text-center'>
                            <h5>{record.courseName}</h5>
                        </div>
                        <div>
                            <CircularProgressBar progressValue={record.score?record.score:0} />
                        </div>
                    </div>
                </div>
            </div>
        )
    })

    return (
        <div id='insight-cards' className={studentInsightsData.length <= 4?"four-insights":studentInsightsData.length === 0?"no-insights":""}>
            <div className="row justify-content-center">
                {insights}
                {/* <div className="col-xl-3 col-lg-4 col-md-6 col-xs-12">
                    <div id="course-1-card" className='insight-card'>
                        <div className="d-flex align-items-center justify-content-between">
                            <div className='text-center'>
                                <h5>History</h5>
                            </div>
                            <div>
                                <CircularProgressBar progressValue={85} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-lg-4 col-md-6 col-xs-12">
                    <div id="course-2-card" className='insight-card'>
                        <div className="d-flex align-items-center justify-content-between">
                            <div className='text-center'>
                                <h5>Biology</h5>
                            </div>
                            <div>
                                <CircularProgressBar progressValue={70} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-lg-4 col-md-6 col-xs-12">
                    <div id="course-3-card" className='insight-card'>
                        <div className="d-flex align-items-center justify-content-between">
                            <div className='text-center'>
                                <h5>Computer</h5>
                            </div>
                            <div>
                                <CircularProgressBar progressValue={89} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-lg-4 col-md-6 col-xs-12">
                    <div id="course-4-card" className='insight-card'>
                        <div className="d-flex align-items-center justify-content-between">
                            <div className='text-center'>
                                <h5>Astrology</h5>
                            </div>
                            <div>
                                <CircularProgressBar progressValue={65} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-lg-4 col-md-6 col-xs-12">
                    <div id="course-5-card" className='insight-card'>
                        <div className="d-flex align-items-center justify-content-between">
                            <div className='text-center'>
                                <h5>Histology</h5>
                            </div>
                            <div>
                                <CircularProgressBar progressValue={95} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-lg-4 col-md-6 col-xs-12">
                    <div id="course-6-card" className='insight-card'>
                        <div className="d-flex align-items-center justify-content-between">
                            <div className='text-center'>
                                <h5>Himatology</h5>
                            </div>
                            <div>
                                <CircularProgressBar progressValue={45} />
                            </div>
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    )
}