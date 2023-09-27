import { useState, useEffect } from 'react';

import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';

import "../../../../../assets/css/Dashboard/Lecturer/Exam/AddExam/Question.css"

export default function Question({questionNumber, tempExamQuestions, setTempExamQuestions, disableFields}){

    const [radioDirection, setRadioDirection] = useState('column');
    const [isMCQ, setIsMCQ] = useState(tempExamQuestions?tempExamQuestions[questionNumber-1].isMCQ:false)
    const [header, setHeader] = useState(tempExamQuestions?tempExamQuestions[questionNumber-1].header:"")
    const [falseAnswers, setFalseAnswers] = useState(tempExamQuestions?tempExamQuestions[questionNumber-1].falseAnswers:"");
    const [trueAnswer, setTrueAnswer] = useState(tempExamQuestions?tempExamQuestions[questionNumber-1].trueAnswer:"true");

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

    const FieldStyle = {
        '& .MuiOutlinedInput-root': {
            '&.Mui-focused': {
            '& .MuiOutlinedInput-notchedOutline': {
                // borderColor: '#333399',
                borderColor: 'rgb(208, 43, 43)',
            },
            },
        },
        '& .MuiInputLabel-root': {
            '&.Mui-focused': {
            color: 'rgb(208, 43, 43)', // Change label color on focus
            },
        },
        '& .MuiOutlinedInput-root, & .MuiInputLabel-root': {
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgb(208, 43, 43)', // Set default outline color
            },
            '& .MuiInputLabel-root': {
              color: 'rgb(208, 43, 43)', // Set default label color
            },
          },
        }

    const TrueAnswerFieldStyle = {
        '& .MuiOutlinedInput-root': {
            '&.Mui-focused': {
            '& .MuiOutlinedInput-notchedOutline': {
                // borderColor: 'rgb(208, 43, 43)', 
                borderColor: 'rgb(17, 185, 17)', 
            },
            },
        },
        '& .MuiInputLabel-root': {
            '&.Mui-focused': {
            color: 'rgb(17, 185, 17)', // Change label color on focus
            },
        },
        '& .MuiOutlinedInput-root, & .MuiInputLabel-root': {
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgb(17, 185, 17)', // Set default outline color
            },
            '& .MuiInputLabel-root': {
              color: 'rgb(17, 185, 17)', // Set default label color
            },
        },
    }


    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 765) {
              setRadioDirection('row');
            } else {
              setRadioDirection('column');
            }
          };
        handleResize();
        window.addEventListener('resize', handleResize);
    
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [])
    

    
    const handleFalseAnswerChange = (index, value) => {
        const updatedFalseAnswers = [...falseAnswers];
        updatedFalseAnswers[index] = value;
        setFalseAnswers(updatedFalseAnswers);
    };

    const handleTrueAnswerChange = (value) => {
        setTrueAnswer(value);
    };

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
                        value={header}
                        onChange={(e)=>{
                            setHeader(e.target.value)
                            setTempExamQuestions((prevTempExamQuestions)=>{
                                const updatedTempExamQuestions = prevTempExamQuestions;
                                updatedTempExamQuestions[questionNumber-1].header = e.target.value
                                return updatedTempExamQuestions
                            })
                        }}
                        disabled={disableFields}
                        required={!disableFields}
                        margin="normal"
                        sx={QuestionFieldStyle}
                    />
                </div>
                <div className="question-type-container">
                    <FormControl>
                        {
                        radioDirection === "column"?
                            <RadioGroup
                                column="true"
                                value={isMCQ.toString()}
                                onChange={(e) => {
                                    if(e.target.value === 'true'){
                                        setFalseAnswers(["", "", ""])
                                        setTrueAnswer("")
                                        setIsMCQ(true)
                                        setTempExamQuestions((prevTempExamQuestions)=>{
                                            const updatedTempExamQuestions = prevTempExamQuestions;
                                            updatedTempExamQuestions[questionNumber-1].isMCQ = true
                                            return updatedTempExamQuestions
                                        })
                                    }else{
                                        setTrueAnswer("true")
                                        setIsMCQ(false)
                                        setTempExamQuestions((prevTempExamQuestions)=>{
                                            const updatedTempExamQuestions = prevTempExamQuestions;
                                            updatedTempExamQuestions[questionNumber-1].isMCQ = false
                                            return updatedTempExamQuestions
                                        })
                                    }
                                }}
                            >
                                <FormControlLabel
                                    value="false"
                                    control={<Radio sx={{
                                        '&.Mui-checked': {
                                            color: '#333399', // Change the color when selected
                                        },
                                        }} />}
                                    label="T/F"
                                    disabled={disableFields}
                                />
                                <FormControlLabel
                                    value="true"
                                    control={<Radio sx={{
                                        '&.Mui-checked': {
                                            color: '#333399', // Change the color when selected
                                        },
                                        }} />}
                                    label="MCQ"
                                    disabled={disableFields}
                                />
                            </RadioGroup>
                            :
                            <RadioGroup
                                row={true}
                                value={isMCQ.toString()}
                                onChange={(e) => {
                                    if(e.target.value === 'true'){
                                        setFalseAnswers(["", "", ""])
                                        setTrueAnswer("")
                                        setIsMCQ(true)
                                    }else{
                                        setIsMCQ(false)
                                    }
                                }}
                                >
                                <FormControlLabel
                                    value="true"
                                    control={<Radio sx={{
                                        '&.Mui-checked': {
                                            color: '#333399', // Change the color when selected
                                        },
                                        }} />}
                                    label="MCQ"
                                    disabled={disableFields}
                                />
                                <FormControlLabel
                                    value="false"
                                    control={<Radio sx={{
                                        '&.Mui-checked': {
                                            color: '#333399', // Change the color when selected
                                        },
                                        }} />}
                                    label="T/F"
                                    disabled={disableFields}
                                />
                            </RadioGroup>
                        }
                    </FormControl>
                </div>
            </div>
            <div className='question-answers-container'>
                {isMCQ ? (
                    <>
                        {falseAnswers.map((answer, index) => (
                        <TextField
                            key={index}
                            label={`False Answer ${index + 1}`}
                            variant="outlined"
                            type="text"
                            fullWidth
                            value={answer}
                            onChange={(e) => {
                                handleFalseAnswerChange(index, e.target.value)
                                setTempExamQuestions((prevTempExamQuestions)=>{
                                    const updatedTempExamQuestions = prevTempExamQuestions;
                                    updatedTempExamQuestions[questionNumber-1].falseAnswers = falseAnswers
                                    return updatedTempExamQuestions
                                })
                            }}
                            disabled={disableFields}
                            required={!disableFields}
                            margin="normal"
                            sx={FieldStyle}
                        />
                        ))}
                        <TextField
                            label="True Answer"
                            variant="outlined"
                            type="text"
                            fullWidth
                            value={trueAnswer}
                            onChange={(e) => {
                                handleTrueAnswerChange(e.target.value)
                                setTempExamQuestions((prevTempExamQuestions)=>{
                                    const updatedTempExamQuestions = prevTempExamQuestions;
                                    updatedTempExamQuestions[questionNumber-1].trueAnswer = e.target.value
                                    return updatedTempExamQuestions
                                })
                            }}
                            disabled={disableFields}
                            required={!disableFields}
                            margin="normal"
                            sx={TrueAnswerFieldStyle}
                        />
                    </>
                    ) : (
                        <>
                            <RadioGroup
                                row={true}
                                value={trueAnswer}
                                onChange={(e) => {
                                    if(e.target.value === 'true'){
                                        setFalseAnswers("false")
                                        setTrueAnswer("true")
                                        setTempExamQuestions((prevTempExamQuestions)=>{
                                            const updatedTempExamQuestions = prevTempExamQuestions;
                                            updatedTempExamQuestions[questionNumber-1].falseAnswers = "false"
                                            updatedTempExamQuestions[questionNumber-1].trueAnswer = "true"
                                            return updatedTempExamQuestions
                                        })
                                    }else{
                                        setFalseAnswers("true")
                                        setTrueAnswer("false")
                                        setTempExamQuestions((prevTempExamQuestions)=>{
                                            const updatedTempExamQuestions = prevTempExamQuestions;
                                            updatedTempExamQuestions[questionNumber-1].falseAnswers = "true"
                                            updatedTempExamQuestions[questionNumber-1].trueAnswer = "false"
                                            return updatedTempExamQuestions
                                        })
                                    }
                                }}
                            >
                                <FormControlLabel
                                    value="true"
                                    control={<Radio sx={{
                                        '&.Mui-checked': {
                                            color: 'rgb(17, 185, 17)', // Change the color when selected
                                        },
                                        }} />}
                                    label="True"
                                    disabled={disableFields}
                                />
                                <FormControlLabel
                                    value="false"
                                    control={<Radio sx={{
                                        '&.Mui-checked': {
                                            color: 'rgb(17, 185, 17)', // Change the color when selected
                                        },
                                        }} />}
                                    label="False"
                                    disabled={disableFields}
                                />
                            </RadioGroup>
                    </>
                )}
            </div>
            
            <div className="custom-divider2"></div>
        </div>
    )
}