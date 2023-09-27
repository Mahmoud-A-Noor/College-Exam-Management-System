import "../../../../../assets/css/Dashboard/Lecturer/Exam/AddExam/Step3.css"

export default function Step3({setCurrentStep, step1, step2}){

    
    return (
        <>
            {step1}
            {step2}

            <div className="row">
                <div className="col-lg-6">
                    <button className="step3-back-button" onClick={()=>{
                        setCurrentStep(()=>2)
                    }}>
                        Back
                    </button>
                </div>
                <div className="col-lg-6">
                    <button className="step3-create-exam-button">
                        Create Exam
                    </button>
                </div>
            </div>
        </>
    )
}