import React, { useState, useEffect } from 'react';

import dayjs from 'dayjs';

import Step1 from "../pages/Dashboard/Lecturer/Exam/AddExam/Step1"
import Step2 from "../pages/Dashboard/Lecturer/Exam/AddExam/Step2"
import Step3 from "../pages/Dashboard/Lecturer/Exam/AddExam/Step3"

export default function useAddExamStates() {
    const [examRelatedInfo, setExamRelatedInfo] = useState({
        "courseName": "",
        "isFinal": false,
        "examDateTime": dayjs(),
        "numQuestions": "",
        "totalDegree": "",
        "duration": ""
    })
    const [examQuestions, setExamQuestions] = useState([])
    const [currentStep, setCurrentStep] = useState(1);
    const [stepContent, setStepContent] = useState(<Step1 />)

    useEffect(()=> {

        if (currentStep === 1) {
            setStepContent(<Step1 
                setCurrentStep={setCurrentStep} 
                examRelatedInfo={examRelatedInfo} 
                setExamRelatedInfo={setExamRelatedInfo} 
                disableFields={false} 
                displayButtons={true} />)
        }
        else if (currentStep === 2){
            setStepContent(<Step2 
                setCurrentStep={setCurrentStep} 
                examRelatedInfo={examRelatedInfo} 
                examQuestions={examQuestions} 
                setExamQuestions={setExamQuestions} 
                disableFields={false} 
                displayButtons={true} />)
        }
        else if (currentStep === 3){
            setStepContent(<Step3 
                examRelatedInfo={examRelatedInfo}
                setExamRelatedInfo={setExamRelatedInfo} 
                examQuestions={examQuestions} 
                setExamQuestions={setExamQuestions}
                setCurrentStep={setCurrentStep}
                step1={<Step1 setCurrentStep={setCurrentStep} examRelatedInfo={examRelatedInfo} setExamRelatedInfo={setExamRelatedInfo} disableFields={true} displayButtons={false} />}
                step2={<Step2 setCurrentStep={setCurrentStep} examRelatedInfo={examRelatedInfo} examQuestions={examQuestions} setExamQuestions={setExamQuestions} disableFields={true} displayButtons={false} />}
                 />)        
        }
        else{
            setCurrentStep(1)
        }
        // eslint-disable-next-line
    }, [currentStep])

    
    return {
        examRelatedInfo: examRelatedInfo,
        setExamRelatedInfo: setExamRelatedInfo,
        examQuestions: examQuestions,
        setExamQuestions: setExamQuestions,
        currentStep: currentStep,
        setCurrentStep: setCurrentStep,
        stepContent: stepContent,
        setStepContent: setStepContent
    }
}
