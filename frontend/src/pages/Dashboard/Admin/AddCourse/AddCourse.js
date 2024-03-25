import { useContext, useState, useEffect, useRef } from 'react';

import Autocomplete from '@mui/material/Autocomplete';

import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

import useAuthToken from '../../../../hooks/useAuthToken'
import useAxios from '../../../../hooks/useAxios'
import AuthContext from '../../../../context/AuthContext';


import "../../../../assets/css/Dashboard/Admin/AddCourse.css"



export default function AddCourse(){

    const form = useRef(null);
    const [lecturers, setLecturers] = useState([])
    const { authToken, updateAuthToken } = useAuthToken();
    const axiosInstance = useAxios(authToken, updateAuthToken);
    const { error, setError, success, setSuccess } = useContext(AuthContext)
    
    const [formData, setFormData] = useState({
        name: '',
        final_percentage: '',
        content: '',
        is_active: true,
        lecturer: null,
        year: '1'
    });


    useEffect(() => {
        setError("")
        setSuccess("")
        axiosInstance.get('/api/get-lecturers-for-select/')
            .then(response => {
                setLecturers(response.data);
            })
            .catch(error => {
                setError('Error fetching lecturers:', error);
            });
    }, []);

    
    const FieldStyle = {
        margin: '14px 0',
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

    const handleSelectChange = (event, value) => {
        setFormData({
            ...formData,
            ["lecturer"]: value,
        });
    };

    const handleYearSelectChange = (event) => {
        setFormData({
            ...formData,
            ["year"]: event.target.value,
        });
    };

    const handleCKEditorChange = (event, editor) => {
        const data = editor.getData();
        setFormData({
            ...formData,
            content: data,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        // form.current.reset();
        setFormData({
            name: '',
            final_percentage: '',
            content: '',
            is_active: true,
            lecturer: null,
            year: '1'
        })

        setSuccess("")
        setError("")

        axiosInstance.post('/api/courses/create/', {
            name: formData.name,
            final_percentage: formData.final_percentage,
            content: formData.content,
            is_active: formData.is_active,
            lecturer: formData.lecturer.id,
            year: formData.year
        })
        .then(response => {
            setSuccess("Course Added Successfully")
            setFormData({
                name: '',
                final_percentage: '',
                content: '',
                is_active: true,
                lecturer: null,
                year: '1'
            })
        })
        .catch(error => {
            console.error(error)
            setError(`Error creating course: ${error.response.data}`)
        });
    };

    return (
        <div id="add-course">
            <div className='container'>
                <div className='row align-items-center justify-content-center'>
                    <div className='col-lg-8 col-md-12'>
                        <form ref={form} onSubmit={handleSubmit}>
                            {success && (
                                <div className="alert alert-success text-center" role="alert">
                                    {success}
                                </div>
                            )}
                            {error && (
                                <div className="alert alert-danger" role="alert">
                                    {error}
                                </div>
                            )}
                            <h3 className='text-center'>Add Course</h3>
                            <TextField
                                label="Course Name"
                                variant="outlined"
                                fullWidth
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                margin="normal"
                                sx={FieldStyle}
                                required={true}
                            />
                            <TextField
                                label="Final Exam Percentage"
                                variant="outlined"
                                type="number"
                                fullWidth
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">%</InputAdornment>,
                                }}
                                name="final_percentage"
                                value={formData.final_percentage}
                                onChange={handleInputChange}
                                margin="normal"
                                sx={FieldStyle}
                                required={true}
                            />
                            
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                name="lecturer" 
                                onChange={handleSelectChange}
                                options={lecturers}
                                getOptionLabel={(option) => option.name}
                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                defaultValue={null}
                                value={formData.lecturer}
                                sx={FieldStyle}
                                renderInput={(params) => <TextField {...params}  label="Select Lecturer" required={true} />}
                            />

                        <FormControl variant="outlined" fullWidth margin="normal" sx={FieldStyle}>
                        <Select
                            name="year"
                            value={formData.year}
                            onChange={handleYearSelectChange}
                        >
                            <MenuItem value={1}>1st year</MenuItem>
                            <MenuItem value={2}>2nd year</MenuItem>
                            <MenuItem value={3}>3rd year</MenuItem>
                            <MenuItem value={4}>4th year</MenuItem>
                        </Select>
                        </FormControl>

                            <FormControl style={{width: "100%"}}>
                                <RadioGroup  style={{width: "100%"}}
                                    row={true}
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    defaultValue="true"
                                    value={formData.is_active}
                                    name="is_active"
                                    onChange={handleInputChange}
                                >
                                    <FormControlLabel style={{marginRight: "auto", marginLeft: "auto"}} value="true" control={
                                        <Radio sx={{
                                            '&.Mui-checked': {
                                                color: '#333399', // Change the color when selected
                                            },
                                            }} 
                                        />} 
                                    label="Active" />
                                    <FormControlLabel style={{marginRight: "auto", marginLeft: "auto"}} value="false" control={
                                        <Radio sx={{
                                            '&.Mui-checked': {
                                                color: '#333399', // Change the color when selected
                                            },
                                        }} />} 
                                    label="Not Active" />
                                </RadioGroup>
                            </FormControl>

                            <div style={{ marginTop: '27px' }}>
                                <CKEditor
                                    editor={ClassicEditor}
                                    data={formData.content}
                                    onChange={handleCKEditorChange}
                                    config={{placeholder: "Course Content"}}
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