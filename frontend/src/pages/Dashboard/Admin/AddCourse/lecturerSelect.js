import React from 'react';
import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import useAuthToken from '../../../../hooks/useAuthToken'
import useAxios from '../../../../hooks/useAxios'



export default function ComboBox(FieldStyle, name, value, onChange) {

    const [lecturers, setLecturers] = useState([])
    
    const { authToken, updateAuthToken } = useAuthToken();
    const axiosInstance = useAxios(authToken, updateAuthToken);

    useEffect(() => {
        axiosInstance.get('/api/get-lecturers/')
            .then(response => {
                setLecturers(response.data);
            })
            .catch(error => {
                console.error('Error fetching lecturers:', error);
            });
    }, []);

  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={lecturers}
      sx={FieldStyle}
      renderInput={(params) => <TextField {...params} name={name} value={value} onChange={onChange} label="Select Lecturer" />}
    />
  );
}