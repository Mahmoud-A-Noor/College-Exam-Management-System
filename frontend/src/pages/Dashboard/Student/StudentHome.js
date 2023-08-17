import "../../../assets/css/Dashboard/Student/StudentHome.css"
import CircularProgressBar from "./CircularProgressBar"

export default function StudentHome(){
    return (
        <div id="student-home">
            <div className="row">
                <div className="col-md-4 col-sm-12">
                    <CircularProgressBar progressValue={70} progressValueColor="#000000" progressBarColor="#7d2eee" remainingProgressBarColor="#ededdd" progressText="HTML2" progressTextColor="#600000" />
                </div>
                <div className="col-md-4 col-sm-12">
                    <CircularProgressBar />
                </div>
                <div className="col-md-4 col-sm-12">
                    <CircularProgressBar />
                </div>
            </div>
        </div>
    )
}