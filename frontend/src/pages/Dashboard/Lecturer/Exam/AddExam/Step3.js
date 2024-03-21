import React from 'react';
import { useContext, useEffect } from 'react';

import dayjs from 'dayjs';

import useAuthToken from '../../../../../hooks/useAuthToken'
import useAxios from '../../../../../hooks/useAxios'
import AuthContext from '../../../../../context/AuthContext';

import "../../../../../assets/css/Dashboard/Lecturer/Exam/AddExam/Step3.css"

export default function Step3({examRelatedInfo, setExamRelatedInfo, examQuestions, setExamQuestions, setCurrentStep, isUpdate, ExamEditURL, getExams, step1, step2}){

    const { authToken, updateAuthToken } = useAuthToken();
    const axiosInstance = useAxios(authToken, updateAuthToken);
    const { setError, setSuccess } = useContext(AuthContext)

    useEffect(() => {
      setError("")
      setSuccess("")
    }, [])
    

    const handleCreateExam = ()=>{
        setError("")
        setSuccess("")

        axiosInstance.post('/api/exams/create/', {
            examRelatedInfo: {
                "course": examRelatedInfo.courseName,
                "duration": examRelatedInfo.duration,
                "exam_datetime": examRelatedInfo.examDateTime,
                "is_final": examRelatedInfo.isFinal,
                "num_questions": examRelatedInfo.numQuestions,
                "total_degree": examRelatedInfo.totalDegree
            },
            examQuestions: examQuestions
        })
        .then((response)=>{
          if(response.data){
            setExamRelatedInfo({
                "courseName": "",
                "isFinal": false,
                "examDateTime": dayjs(),
                "numQuestions": "",
                "totalDegree": "",
                "duration": ""
            })
            setExamQuestions([])
            setSuccess("Exam Created Successfully")
            setCurrentStep(()=>1)
          }
        })
        .catch((error=>{
          setError(`Error Couldn't Create Exam : ${error}`)
        }))

    }

    const handleUpdateExam = ()=>{
        setError("")
        setSuccess("")

        axiosInstance.put(ExamEditURL, {
            "examRelatedInfo": examRelatedInfo,
            "examQuestions": examQuestions
        }).then((response)=>{
            setSuccess("Exam Updated Successfully")
        }).catch((error)=>{
            setError("Error Couldn't Update Exam : ", error)
        })
        setCurrentStep(()=>1)
        getExams()
    }

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
                    <button className="step3-create-exam-button" data-bs-dismiss={isUpdate ? "modal" : undefined} onClick={isUpdate?handleUpdateExam:handleCreateExam}>
                        {isUpdate?"Update Exam":"Create Exam"}
                    </button>
                </div>
            </div>
        </>
    )
}