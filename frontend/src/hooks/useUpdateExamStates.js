import React, { useState, useEffect } from 'react';

import useAuthToken from '../hooks/useAuthToken'
import useAxios from '../hooks/useAxios'

import Step1 from "../pages/Dashboard/Lecturer/Exam/AddExam/Step1"
import Step2 from "../pages/Dashboard/Lecturer/Exam/AddExam/Step2"
import Step3 from "../pages/Dashboard/Lecturer/Exam/AddExam/Step3"

export default function useUpdateExamStates(examEditURL, getExams) {
    const [examRelatedInfo, setExamRelatedInfo] = useState(null)
    const [examQuestions, setExamQuestions] = useState([])
    const [currentStep, setCurrentStep] = useState(1);
    const [stepContent, setStepContent] = useState(<></>)

    const { authToken, updateAuthToken } = useAuthToken();
    const axiosInstance = useAxios(authToken, updateAuthToken);
    // eslint-disable-next-line
    const isUpdate = true


      useEffect(() => {
        if(isUpdate){
            axiosInstance.get(examEditURL.replace("/edit/", "/"))
            .then((response)=>{
                const response_data = response.data
                setExamRelatedInfo(()=>response_data.examRelatedInfo)
                setExamQuestions(()=>response_data.examQuestions)
            }).catch((error)=>{
                console.error("Couldn't load Exam Data : ", error)
            })
        }
        // eslint-disable-next-line
    }, [])


    useEffect(()=> {
        if(examRelatedInfo && examQuestions){
            if (currentStep === 1) {
                setStepContent(<Step1 setCurrentStep={setCurrentStep} examRelatedInfo={examRelatedInfo} setExamRelatedInfo={setExamRelatedInfo} disableFields={false} displayButtons={true} isUpdate={isUpdate} />)
            }
            else if (currentStep === 2){
                setStepContent(<Step2 setCurrentStep={setCurrentStep} examRelatedInfo={examRelatedInfo} examQuestions={examQuestions} setExamQuestions={setExamQuestions} disableFields={false} displayButtons={true} isUpdate={isUpdate} />)
            }
            else if (currentStep === 3){
                setStepContent(<Step3 
                    examRelatedInfo={examRelatedInfo}
                    setExamRelatedInfo={setExamRelatedInfo} 
                    examQuestions={examQuestions} 
                    setExamQuestions={setExamQuestions}
                    setCurrentStep={setCurrentStep}
                    isUpdate={isUpdate}
                    ExamEditURL={examEditURL}
                    getExams={getExams}
                    step1={<Step1 setCurrentStep={setCurrentStep} examRelatedInfo={examRelatedInfo} setExamRelatedInfo={setExamRelatedInfo} disableFields={true} displayButtons={false} isUpdate={isUpdate} />}
                    step2={<Step2 setCurrentStep={setCurrentStep} examRelatedInfo={examRelatedInfo} examQuestions={examQuestions} setExamQuestions={setExamQuestions} disableFields={true} displayButtons={false} isUpdate={isUpdate} />}
                     />)        
            }
            else{
                setCurrentStep(1)
            }
        }
        
        // eslint-disable-next-line
    }, [currentStep, examRelatedInfo, examQuestions])

    
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
