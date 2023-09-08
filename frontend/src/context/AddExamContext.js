import { createContext, useState } from 'react'


const AddExamContext = createContext();
export default AddExamContext;


export function AddExamProvider({children}){

    const [examRelatedInfo, setExamRelatedInfo] = useState({})
    const [examQuestions, setExamQuestions] = useState([])
    const [currentStep, setCurrentStep] = useState(1);
    const [stepContent, setStepContent] = useState("")



    let contextData = {
        examRelatedInfo: examRelatedInfo,
        setExamRelatedInfo: setExamRelatedInfo,
        examQuestions: examQuestions,
        setExamQuestions: setExamQuestions,
        currentStep: currentStep,
        setCurrentStep: setCurrentStep,
        stepContent: stepContent,
        setStepContent: setStepContent
    }

    return(
        <AddExamContext.Provider value={contextData} >
            {children}
        </AddExamContext.Provider>
    )
}