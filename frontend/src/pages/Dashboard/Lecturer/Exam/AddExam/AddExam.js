import useAddExamStates from "../../../../../hooks/useAddExamStates"

import "../../../../../assets/css/Dashboard/Lecturer/Exam/AddExam/AddExam.css"

// eslint-disable-next-line
import MultiStepIndicator from "./MultiStepIndicator"

export default function AddExam(){

    const { currentStep, stepContent } = useAddExamStates();

    return (
        <div id="add-exam">
            <MultiStepIndicator currentStep={currentStep} />
            {stepContent}
        </div>
    )
}