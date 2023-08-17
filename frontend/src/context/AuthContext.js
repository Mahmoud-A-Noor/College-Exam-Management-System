import { createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import jwt_decode from "jwt-decode";
import axios from 'axios';

import useUserData from '../hooks/useUserData';


const AuthContext = createContext()

export default AuthContext;


export const AuthProvider = ({children}) => {
    let [authTokens, setAuthTokens] = useState(()=> localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let [user, setUser] = useState(()=> localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)
    let [loading, setLoading] = useState(true)
    const [error, setError] = useState('');
    let [success, setSuccess] = useState("")

    const navigate = useNavigate()
    const BASE_API_URL = "http://127.0.0.1:8000/"
      
    const logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        removeUserData()
        navigate('/login', {replace:true});
    }

    const { userData, removeUserData, updateUserData, axiosInstance } = useUserData(authTokens, setAuthTokens, setUser, logoutUser);

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
            
                setAuthTokens(data);
                setUser(jwt_decode(data.access_token));
                localStorage.setItem('authTokens', JSON.stringify(data));
                navigate('/dashboard', {replace:true});
              
            }).catch(error => {
                console.log(error);
                if (error.response) {
                    setError(error.response.error);
                } else {
                    setError('An unexpected error occurred.');
                }
            });
        }
      };

    const registerUser = (e) => {
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
                console.log(error);
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
                updateUserData();
                setSuccess("Your Profile is updated successfully")
            })
            .catch(error => {
                console.log(error);
                if (error.response) {
                    setError(error.response.error);
                } else {
                    setError('An unexpected error occurred.');
                }
            }
        );
    };


    let contextData = {
        user:user,
        authTokens:authTokens,
        setAuthTokens:setAuthTokens,
        setUser:setUser,
        loginUser:loginUser,
        logoutUser:logoutUser,
        registerUser: registerUser,
        updateUser: updateUser,
        userData: userData,
        error: error,
        setError: setError,
        success: success,
        setSuccess: setSuccess,
    }


    useEffect(()=> {

        if(authTokens){
            setUser(jwt_decode(authTokens.access_token))
        }
        setLoading(false)


    }, [authTokens, loading])

    return(
        <AuthContext.Provider value={contextData} >
            {loading ? null : children}
        </AuthContext.Provider>
    )
}
