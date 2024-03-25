import { useState, useEffect, useContext } from "react"

import useAuthToken from '../../../../hooks/useAuthToken'
import useAxios from '../../../../hooks/useAxios'
import AuthContext from '../../../../context/AuthContext';

import Question from "./Question"

export default function ExamQuestions({exam_id, setEnteredExam, getTodayExams}){
    const { authToken, updateAuthToken } = useAuthToken();
    const axiosInstance = useAxios(authToken, updateAuthToken);
    const { user, error, setError } = useContext(AuthContext)

    const [examQuestions, setExamQuestions] = useState([])    
    const [examAttempId, setExamAttempId] = useState([])    
    const [answers, setAnswers] = useState([""])

    // const questions = [
    //     {
    //         "header": "question 1",
    //         "isMCQ": false,
    //         "falseAnswers": "false",
    //         "trueAnswer": "true"
    //     },
    //     {
    //         "header": "question 2",
    //         "isMCQ": false,
    //         "falseAnswers": "true",
    //         "trueAnswer": "false"
    //     },
    //     {
    //         "header": "question 3",
    //         "isMCQ": true,
    //         "falseAnswers": [
    //             "false answer 1",
    //             "false answer 2",
    //             "false answer "
    //         ],
    //         "trueAnswer": "the true answer"
    //     }
    // ]



    useEffect(()=>{
        setError("")
        axiosInstance.get(`/api/exams/${exam_id}/`)
        .then((response)=>{
            const response_data = response.data
            setAnswers(Array(response_data.examRelatedInfo.numQuestions).fill({
                "question_id": -1,
                "answer": ""
            }))
            setExamQuestions(()=>response_data.examQuestions)
        }).then(()=>{
            axiosInstance.post(`/api/exam-attempt/${exam_id}/start/`, {
                user_id: user.user_id
              })
            .then((response)=>{
                const response_data = response.data
                setExamAttempId(response_data.exam_attempt_id)
                console.log("Exam Started")
            }).catch((error)=>{
                setError("Error starting the Exam: ", error)
            })
        })
        .catch((error)=>{
            setError("Couldn't load Exam Data : ", error)
        })
    },[])

    const handleAnswersSubmit = (e)=>{
        e.preventDefault();
        if(answers.every(answer => answer.question_id !== -1)){
            axiosInstance.post('/api/exams/submit-answers/', {
                exam_attempt_id: examAttempId,
                student_id: user.user_id,
                student_answers: answers
            }).then(()=>{
                getTodayExams()
                setEnteredExam(false)
            })
        }else{
            setError("Please Answer All Questions before Submitting Answers")
        }
    }

    return (
        <>
            {examQuestions && 
                <form onSubmit={handleAnswersSubmit}>
                    {error && (
                        <div className="alert alert-danger" role="alert">
                            {error}
                        </div>
                    )}
                    {examQuestions.map((question, index) => (
                        <Question
                            key={question.id}
                            questionNumber={index + 1}
                            question={question}
                            setAnswers={setAnswers}
                        />
                    ))}
                    <div className="row text-center">
                        <div className="col-lg-6 col-md-9 col-sm-12 mx-auto">
                            <button className="primary-default-btn mb-2 w-100 mt-3">
                                Submit Answers
                            </button>
                        </div>
                    </div>
                </form>
            }
        </>
        
    )
}