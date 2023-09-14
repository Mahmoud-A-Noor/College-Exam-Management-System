import useAddExamStates from "../../../../../hooks/useAddExamStates"

import "../../../../../assets/css/Dashboard/Lecturer/Exam/AddExam/AddExam.css"

// eslint-disable-next-line
import MultiStepIndicator from "./MultiStepIndicator"

export default function AddExam(){

    const { currentStep, setCurrentStep, stepContent } = useAddExamStates();

    
    // const formSteps = [
    //     { title: 'This is step 1', fields: ['email', 'password'], buttons: ['Next'] },
    //     { title: 'This is step 2', fields: ['address', 'city', 'zipcode'], buttons: ['Previous', 'Next'] },
    //     { title: 'This is step 3', fields: ['firstName', 'lastName'], buttons: ['Previous', 'Submit'] },
    // ];

    // const handleButtonClick = (incrementor) => {
    //     const inputs = formSteps[currentStep].fields.map((fieldName) => document.getElementById(fieldName));
    //     const allValid = inputs.every((input) => input.checkValidity());

    //     if (allValid) {
    //     setCurrentStep(currentStep + incrementor);
    //     }
    // };

    return (
        <div id="add-exam">
            <MultiStepIndicator currentStep={currentStep} />
            {stepContent}
            {/* <button onClick={()=>{
                setCurrentStep(()=>currentStep+1)
            }}>
                Next
            </button>
            <button onClick={()=>{
                setCurrentStep(()=>currentStep-1)
            }}>
                Back
            </button> */}
        </div>
    )
}