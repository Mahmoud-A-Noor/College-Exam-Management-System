import { useState } from "react";

import "../../../../../assets/css/Dashboard/Lecturer/Exam/AddExam/Step2.css"

import Question from "./Question"

export default function Step2({setCurrentStep, examRelatedInfo, examQuestions, setExamQuestions, disableFields, displayButtons}){

    const numberOfQuestions = examRelatedInfo.numQuestions;
    const [tempExamQuestions, setTempExamQuestions] = useState(() =>{
        if(examQuestions.length > 0){
            return examQuestions
        }else{
            return Array.from({ length: numberOfQuestions }, (_, index) => ({
                questionHeader: '',
                isMCQ: false,
                falseAnswers: "false",
                trueAnswer: 'true',
            }))
        }
    });

    const handleNextClick = (e) => {
        e.preventDefault();

        setExamQuestions(tempExamQuestions);
        setCurrentStep(3);
    };

    return (
        <div id="step2">
            <form onSubmit={handleNextClick}>
                {tempExamQuestions.map((tempQuestion, index) => (
                    <Question
                        key={index}
                        questionNumber={index + 1}
                        tempExamQuestions={tempExamQuestions}
                        setTempExamQuestions={setTempExamQuestions}
                        disableFields={disableFields}
                    />
                ))}
                {displayButtons && 
                <div className="row">
                    <div className="col-lg-6">
                        <button className="step2-back-button" onClick={()=>{
                            setCurrentStep(()=>1)
                        }}>
                            Back
                        </button>
                    </div>
                    <div className="col-lg-6">
                        <button type="submit" className="step2-next-button">
                            Next
                        </button>
                    </div>
                </div>}
            </form>
        </div>
    )
}