import { useState, useEffect } from 'react';

import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';

import "../../../../assets/css/Dashboard/Lecturer/Exam/AddExam/Question.css"

export default function Question({question, questionNumber, setAnswers}){

    const [choices, setChoices] = useState([])

    useEffect(() => {
        // Combine true and false answers into a single array
        let combinedAnswers = [];
        
        if (question.isMCQ) {
            combinedAnswers = [...question.falseAnswers, question.trueAnswer];
        } else {
            combinedAnswers = [question.falseAnswers, question.trueAnswer];
        }

        combinedAnswers = shuffleArray(combinedAnswers);

        setChoices(combinedAnswers);
        // eslint-disable-next-line
    }, [question]);

    const shuffleArray = (array) => {
        const shuffledArray = [...array];
        for (let i = shuffledArray.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
    };

    const QuestionFieldStyle = {
        '& .MuiOutlinedInput-root': {
            '&.Mui-focused': {
            '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#333399',
            },
            },
        },
        '& .MuiInputLabel-root': {
            '&.Mui-focused': {
            color: '#333399', // Change label color on focus
            },
        },
        '& .MuiOutlinedInput-root, & .MuiInputLabel-root': {
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#333399', // Set default outline color
            },
            '& .MuiInputLabel-root': {
              color: '#333399', // Set default label color
            },
          },
    }

    return (
        <div className="question">
            <div className='question-question-type-container'>
                <div className="question-container">
                    <TextField
                        label={"Question " + questionNumber}
                        variant="outlined"
                        type="text"
                        fullWidth
                        multiline
                        minRows={3}
                        value={question.header}
                        disabled={true}
                        margin="normal"
                        sx={QuestionFieldStyle}
                    />
                </div>
            </div>
            <div className='question-answers-container'>
                <RadioGroup row={true} onChange={
                    (e)=>{
                        setAnswers((prevAnswers)=>{
                            const updatedAnswers = prevAnswers;
                            updatedAnswers[questionNumber-1] = {
                                "question_id": question.id,
                                "answer": e.target.value
                            };
                            return updatedAnswers
                        })
                    }
                }>
                    {choices.map((choice, index) => (
                    <FormControlLabel
                        key={index}
                        value={choice}
                        control={<Radio sx={{
                        '&.Mui-checked': {
                            color: 'rgb(17, 185, 17)',
                        },
                        }} />}
                        label={choice}
                    />
                    ))}
                </RadioGroup>
            </div>
            
            <div className="custom-divider2"></div>
        </div>
    )
}