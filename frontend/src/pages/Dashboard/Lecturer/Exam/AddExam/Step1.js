import React, { useState } from 'react';

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

export default function Step1({setCurrentStep, setExamRelatedInfo, examRelatedInfo, disableFields, displayButtons}){

    const [courseName, setCourseName] = useState(examRelatedInfo?examRelatedInfo.courseName:"");
    const [isFinal, setIsFinal] = useState(examRelatedInfo?examRelatedInfo.isFinal:false);
    const [examDateTime, setExamDateTime] = useState(examRelatedInfo?examRelatedInfo.examDateTime:dayjs());
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
          <div id="step1">
              <form onSubmit={handleFormSubmit}>
                  <FormControl variant="outlined" fullWidth margin="normal" sx={FieldStyle}>
                      <InputLabel>Course Name</InputLabel>
                      <Select
                          label="Course Name"
                          value={courseName}
                          onChange={(e) => setCourseName(e.target.value)}
                          disabled={disableFields}
                          required={!disableFields}
                      >
                          <MenuItem value="Math">Math</MenuItem>
                          <MenuItem value="Science">Science</MenuItem>
                          <MenuItem value="History">History</MenuItem>
                          {/* Add more course options as needed */}
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
                            }} />}
                          label="Final"
                      />
                      <FormControlLabel
                          value="false"
                          control={<Radio sx={{
                              '&.Mui-checked': {
                                color: '#333399', // Change the color when selected
                              },
                            }} />}
                          label="Not Final"
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
                      disabled={disableFields}
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
                      <div className="col-lg-6 col-md-9 col-sm-12 ms-auto me-auto">
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