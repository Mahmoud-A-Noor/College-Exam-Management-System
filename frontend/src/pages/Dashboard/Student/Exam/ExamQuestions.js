import { useState } from "react"

import Question from "./Question"

export default function ExamQuestions({exam_id}){

    const questions = [
        {
            "header": "question 1",
            "isMCQ": false,
            "falseAnswers": "false",
            "trueAnswer": "true"
        },
        {
            "header": "question 2",
            "isMCQ": false,
            "falseAnswers": "true",
            "trueAnswer": "false"
        },
        {
            "header": "question 3",
            "isMCQ": true,
            "falseAnswers": [
                "false answer 1",
                "false answer 2",
                "false answer "
            ],
            "trueAnswer": "the true answer"
        }
    ]
    const [answers, setAnswers] = useState(["", "", ""])


    const handleAnswersSubmit = (e)=>{
        e.preventDefault();
        console.log(answers)
    }

    return (
        <form onSubmit={handleAnswersSubmit}>
            {questions.map((question, index) => (
                <Question
                    key={index}
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
    )
}