import { createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import jwt_decode from "jwt-decode";
import axios from 'axios';


const AuthContext = createContext()

export default AuthContext;


export const AuthProvider = ({children}) => {
    let [authTokens, setAuthTokens] = useState(()=> localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let [user, setUser] = useState(()=> localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)
    let [loading, setLoading] = useState(true)
    const [error, setError] = useState('');

    const navigate = useNavigate()
    const BASE_API_URL = "http://127.0.0.1:8000/"

    let loginUser = (e) => {

        e.preventDefault()

        if(!e.target.email.value || !e.target.password.value){
            setError("Please Enter All Fields");
        }else{
            axios.post(BASE_API_URL + 'account/token/', {
                'email': e.target.email.value,
                'password': e.target.password.value,
            })
            .then(response => {
                const data = response.data;
            
                setAuthTokens(data);
                setUser(jwt_decode(data.access));
                localStorage.setItem('authTokens', JSON.stringify(data));
                navigate('/dashboard', {replace:true});
              
            }).catch(error => {
                if (error.response) {
                    setError(error.response.data.detail);
                } else {
                    setError('An unexpected error occurred.');
                }
            });
        }
      };
      
    let logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        navigate('/login', {replace:true});
    }


    let contextData = {
        user:user,
        authTokens:authTokens,
        setAuthTokens:setAuthTokens,
        setUser:setUser,
        loginUser:loginUser,
        logoutUser:logoutUser,
        error: error
    }


    useEffect(()=> {

        if(authTokens){
            setUser(jwt_decode(authTokens.access))
        }
        setLoading(false)


    }, [authTokens, loading])

    return(
        <AuthContext.Provider value={contextData} >
            {loading ? null : children}
        </AuthContext.Provider>
    )
}
