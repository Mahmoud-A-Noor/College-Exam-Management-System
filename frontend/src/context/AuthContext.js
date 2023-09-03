import { createContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import axios from 'axios';

import useAuthToken from '../hooks/useAuthToken';
import useUser from '../hooks/useUser';
import useAxios from '../hooks/useAxios';


const AuthContext = createContext()

export default AuthContext;


export const AuthProvider = ({children}) => {
    const { authToken, updateAuthToken } = useAuthToken();
    const axiosInstance = useAxios(authToken, updateAuthToken);
    const { user, userData, clearUserState, getUser } = useUser(authToken, axiosInstance);

    const [error, setError] = useState('');
    const [success, setSuccess] = useState("")

    const navigate = useNavigate()
    const BASE_API_URL = "http://127.0.0.1:8000/"
      
    
    const logoutUser = () => {
        updateAuthToken();
        clearUserState();
        navigate('/login', {replace:true});
    };

    const loginUser = (e) => {
        e.preventDefault()

        if(!e.target.email.value || !e.target.password.value){
            setError("Please Enter All Fields");
        }else{
            axios.post(BASE_API_URL + 'account/login/', {
                'email': e.target.email.value,
                'password': e.target.password.value,
            })
            .then(response => {
                const data = response.data;
                updateAuthToken(data);
                getUser();
                navigate('/dashboard', {replace:true});
              
            }).catch(error => {
                console.error(error);
                if (error.response) {
                    setError(error.response.error);
                } else {
                    setError('An unexpected error occurred.');
                }
            });
        }
    };

    const addStudent = (e) => {
        e.preventDefault();

        const formData = new FormData();

        const fields = e.target.elements;

        for (const field of fields) {
            const fieldName = field.getAttribute('name');
            const fieldValue = field.value;

            if (fieldName === 'img' && field.files.length > 0) {
                formData.append(fieldName, field.files[0]);
            } else if (fieldValue !== '') {
                formData.append(fieldName, fieldValue);
            }
        }

        formData.append('user_type', 'S');

        axios.post(BASE_API_URL + 'account/register/', formData)
            .then(response => {
                loginUser(e)
            })
            .catch(error => {
                console.error(error);
                if (error.response) {
                    setError("Another user with the same email already exists !");
                } else {
                    setError('An unexpected error occurred.');
                }
        });
    };
    const addLecturer = (e) => {
        e.preventDefault();

        const formData = new FormData();

        const fields = e.target.elements;

        for (const field of fields) {
            const fieldName = field.getAttribute('name');
            const fieldValue = field.value;

            if (fieldName === 'img' && field.files.length > 0) {
                formData.append(fieldName, field.files[0]);
            } else if (fieldValue !== '') {
                formData.append(fieldName, fieldValue);
            }
        }

        formData.append('user_type', 'S');

        axios.post(BASE_API_URL + 'account/register/', formData)
            .then(response => {
                loginUser(e)
            })
            .catch(error => {
                console.error(error);
                if (error.response) {
                    setError("Another user with the same email already exists !");
                } else {
                    setError('An unexpected error occurred.');
                }
        });
    };

    const updateUser = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("id", user.user_id);

        const fields = e.target.elements;

        for (const field of fields) {
            const fieldName = field.getAttribute('name');
            const fieldValue = field.value;

            if (fieldName === 'img' && field.files.length > 0) {
                formData.append(fieldName, field.files[0]);
            } else if (fieldName !== 'img') {
                formData.append(fieldName, fieldValue);
            }
        }

        axiosInstance.put('account/update/', formData)
            .then(response => {
                clearUserState();
                getUser();
                setSuccess("Your Profile is updated successfully");
            })
            .catch(error => {
                console.error(error);
                if (error.response) {
                    setError(error.response.error);
                } else {
                    setError('An unexpected error occurred.');
                }
            }
        );
    };


    let contextData = {
        loginUser: loginUser,
        logoutUser: logoutUser,
        addStudent: addStudent,
        addLecturer: addLecturer,
        updateUser: updateUser,
        error: error,
        setError: setError,
        success: success,
        setSuccess: setSuccess,
        user: user,
        userData: userData,
        authToken: authToken,
    }


    return(
        <AuthContext.Provider value={contextData} >
            {children}
        </AuthContext.Provider>
    )
}
