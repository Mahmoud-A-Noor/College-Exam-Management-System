import useUpdateExamStates from "../../../../hooks/useUpdateExamStates"

import "../../../../assets/css/Dashboard/Lecturer/Exam/AddExam/AddExam.css"

// eslint-disable-next-line
import MultiStepIndicator from "./AddExam/MultiStepIndicator"

export default function UpdateExam({examEditURL, getExams}){

    const { currentStep, stepContent, examRelatedInfo } = useUpdateExamStates(examEditURL, getExams);

    return (
        <>
            {examRelatedInfo &&
                <div id="update-exam">
                    <MultiStepIndicator currentStep={currentStep} />
                    {stepContent}
                </div>
            }
        </>
    )
}