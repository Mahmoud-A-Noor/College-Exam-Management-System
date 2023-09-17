import { useState } from "react"; 

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import "../../../../assets/css/Dashboard/Admin/AddCourse.css"



export default function AddCourse(){
    const [formData, setFormData] = useState({
        courseName: '',
        finalExamPercentage: '',
        courseContent: '',
    });

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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleCKEditorChange = (event, editor) => {
        const data = editor.getData();
        setFormData({
            ...formData,
            courseContent: data,
        });
    };

    const handleSubmit = () => {
        console.log('Form Data:', formData);
    };

    return (
        <div id="add-course">
            <div className='container'>
                <div className='row align-items-center justify-content-center'>
                    <div className='col-lg-8 col-md-12'>
                        <form onSubmit={handleSubmit}>
                            <h3 className='text-center'>Add Course</h3>
                            <TextField
                                label="Course Name"
                                variant="outlined"
                                fullWidth
                                name="courseName"
                                value={formData.courseName}
                                onChange={handleInputChange}
                                margin="normal"
                                sx={FieldStyle}
                            />
                            <TextField
                                label="Final Exam Percentage"
                                variant="outlined"
                                type="number"
                                fullWidth
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">%</InputAdornment>,
                                }}
                                name="finalExamPercentage"
                                value={formData.finalExamPercentage}
                                onChange={handleInputChange}
                                margin="normal"
                                sx={FieldStyle}
                            />
                            <div style={{ marginTop: '16px' }}>
                                <CKEditor
                                    editor={ClassicEditor}
                                    data={formData.courseContent}
                                    onChange={handleCKEditorChange}
                                />
                            </div>
                            <div className="row text-center">
                                <div className="col-lg-6 col-md-9 col-sm-12 mx-auto">
                                    <button id="add-course-form-button">
                                        Add Course
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>            
        </div>
    )
}