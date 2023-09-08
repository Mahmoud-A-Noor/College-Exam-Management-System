
import "../../../../../assets/css/Dashboard/Lecturer/Exam/AddExam/MultiStepIndicator.css"

export default function MultiStepIndicator({currentStep}){
    return(
        <div id="multi-step-indicator">
            <div className={currentStep >1 ? "indicator-point rounded-5 passed":currentStep === 1 ? "indicator-point rounded-5 active":"indicator-point rounded-5"} data-step="Informations"></div>
            <div className={currentStep >= 2 ? "indicator-line active":"indicator-line"}>
                <div className="filler"></div>
            </div>
            <div className={currentStep >2 ? "indicator-point rounded-5 passed":currentStep === 2 ? "indicator-point rounded-5 active":"indicator-point rounded-5"} data-step="Questions"></div>
            <div className={currentStep >= 3 ? "indicator-line active":"indicator-line"}>
                <div className="filler"></div>
            </div>
            <div className={currentStep >3 ? "indicator-point rounded-5 passed":currentStep === 3 ? "indicator-point rounded-5 active":"indicator-point rounded-5"} data-step="Confirmation"></div>
        </div>
    )
}