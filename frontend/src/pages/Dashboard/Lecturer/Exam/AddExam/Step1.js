import React from 'react';
import { useState, useEffect, useContext } from 'react'

import useAuthToken from '../../../../../hooks/useAuthToken'
import useAxios from '../../../../../hooks/useAxios'
import AuthContext from '../../../../../context/AuthContext';

import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';

import dayjs from 'dayjs';

import "../../../../../assets/css/Dashboard/Lecturer/Exam/AddExam/Step1.css"

export default function Step1({setCurrentStep, setExamRelatedInfo, examRelatedInfo, disableFields, displayButtons, isUpdate}){

    const { authToken, updateAuthToken } = useAuthToken();
    const axiosInstance = useAxios(authToken, updateAuthToken);
    const { user, error, setError, success } = useContext(AuthContext)

    const [coursesNames, setCoursesNames] = useState([]);
    const [courseName, setCourseName] = useState(examRelatedInfo?examRelatedInfo.courseName:"");
    const [isFinal, setIsFinal] = useState(examRelatedInfo?examRelatedInfo.isFinal:false);
    const [examDateTime, setExamDateTime] = useState(examRelatedInfo?dayjs(examRelatedInfo.examDateTime):dayjs());
    const [numQuestions, setNumQuestions] = useState(examRelatedInfo?examRelatedInfo.numQuestions:"");
    const [totalDegree, setTotalDegree] = useState(examRelatedInfo?examRelatedInfo.totalDegree:"");
    const [duration, setDuration] = useState(examRelatedInfo?examRelatedInfo.duration:"");

    const FieldStyle = {
      '& .MuiOutlinedInput-root': {
        '&.Mui-focused': {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#333399', // Change outline color on focus
          },
        },
      },
      '& .MuiInputLabel-root': {
        '&.Mui-focused': {
          color: '#333399', // Change label color on focus
        },
      },
    }

    useEffect(()=>{
      setError("")
      console.log("disableFields(useEffectFinal) : ", disableFields)
      console.log("isFinal(useEffectFinal) : ", isFinal)
      if(courseName){
        if(isFinal){
          axiosInstance.get(`/api/courses/${courseName}/`)
          .then((response)=>{
            if(response.data){
              const response_data = response.data
              setTotalDegree(response_data.final_percentage)
            }
          })
          .catch((error=>{
            setError(`Error fetching Final Degree of the Course : ${error}`)
          }))
        }else{
          // setTotalDegree("")
        }
      }
    },[isFinal])

    useEffect(()=>{
      setError("")
      console.log("disableFields(useEffect) : ", disableFields)
      console.log("isFinal(useEffect) : ", isFinal)
      axiosInstance.get('/api/get-lecturer-courses/',{
        params: {
          lecturer_id: user.user_id,
        },
      })
        .then((response)=>{
          if(response.data){
            const response_data = response.data
            setCoursesNames(()=>response_data.map((record)=>record.name))
          }
        })
        .catch((error=>{
          setError(`Couldn't fetch Courses Names : ${error.response.data.error}`)
        }))
    },[])

    const handleFormSubmit = (e) => {
        e.preventDefault();

        setExamRelatedInfo(()=>{
            return {
                "courseName": courseName,
                "isFinal": isFinal,
                "examDateTime": examDateTime,
                "numQuestions": numQuestions,
                "totalDegree": totalDegree,
                "duration": duration
            }
        })
        setCurrentStep(()=>2)
    };

    return (
      <>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div id={isUpdate?"step1-update":"step1"}>
              <form onSubmit={handleFormSubmit}>
                  {success && (
                    <div className="alert alert-success" role="alert">
                        {success}
                    </div>
                  )}
                  {error && (
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
                  )}
                  <FormControl variant="outlined" fullWidth margin="normal" sx={FieldStyle}>
                      <InputLabel>Course Name</InputLabel>
                      <Select
                          label="Course Name"
                          value={courseName}
                          onChange={(e) => setCourseName(e.target.value)}
                          disabled={disableFields}
                          required={!disableFields}
                      >
                        {coursesNames.map((courseName)=>{
                          return <MenuItem key={courseName} value={courseName}>{courseName}</MenuItem>
                        })}
                      </Select>
                  </FormControl>

                  <FormControl>
                      <RadioGroup
                      row
                      value={isFinal.toString()}
                      onChange={(e) => setIsFinal(e.target.value === 'true')}
                      >
                      <FormControlLabel
                          value="true"
                          control={<Radio sx={{
                              '&.Mui-checked': {
                                color: '#333399', // Change the color when selected
                              },
                              marginTop: 1, marginBottom: 1
                            }} />}
                          label="Final"
                          disabled={disableFields}
                      />
                      <FormControlLabel
                          value="false"
                          control={<Radio sx={{
                              '&.Mui-checked': {
                                color: '#333399', // Change the color when selected
                              },
                            }} />}
                          label="Not Final"
                          disabled={disableFields}
                      />
                      </RadioGroup>
                  </FormControl>

                  <Box sx={{ marginTop: 1, marginBottom: 1 }}>
                      <DateTimePicker
                      label="Exam Date and Time"
                      value={examDateTime}
                      onChange={(newValue) => setExamDateTime(newValue)}
                      renderInput={(params) => (
                          <TextField {...params} variant="outlined" margin="normal" />
                      )}
                      disabled={disableFields}
                      sx={FieldStyle}
                      />
                  </Box>

                  <TextField
                      label="Number of Questions"
                      variant="outlined"
                      type="number"
                      fullWidth
                      value={numQuestions}
                      onChange={(e) => setNumQuestions(e.target.value)}
                      disabled={disableFields}
                      required={!disableFields}
                      margin="normal"
                      sx={FieldStyle}
                  />

                  <TextField
                      label="Total Degree of Exam"
                      variant="outlined"
                      type="number"
                      fullWidth
                      value={totalDegree}
                      onChange={(e) => setTotalDegree(e.target.value)}
                      disabled={disableFields?true:Boolean(isFinal)}
                      required={!disableFields}
                      margin="normal"
                      sx={FieldStyle}
                  />

                  <Box sx={{ marginTop: 1, marginBottom: 2 }}>
                      <TextField
                          label="Duration (minutes)"
                          variant="outlined"
                          type="number"
                          fullWidth
                          InputProps={{
                              endAdornment: <InputAdornment position="end">min</InputAdornment>,
                          }}
                          value={duration}
                          onChange={(e) => setDuration(e.target.value)}
                          disabled={disableFields}
                          required={!disableFields}
                          margin="normal"
                          sx={FieldStyle}
                      />
                  </Box>

                  {
                    displayButtons &&
                    <div className="row text-center">
                      <div className="col-lg-6 col-md-9 col-sm-12 mx-auto">
                          <button id="step1-submit">
                              Next
                          </button>
                      </div>
                    </div>
                  }
                  
              </form>
          </div>        
        </LocalizationProvider>
      </>
    )
}