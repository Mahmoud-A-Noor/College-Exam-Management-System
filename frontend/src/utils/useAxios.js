import axios from 'axios'
import jwt_decode from "jwt-decode";
import dayjs from 'dayjs'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'


const baseURL = 'http://127.0.0.1:8000'


const useAxios = () => {
    const {authTokens, setUser, setAuthTokens, logoutUser} = useContext(AuthContext)

    const axiosInstance = axios.create({
        baseURL,
        headers:{
            'Authorization': `Bearer ${authTokens?.access}`,
            'Content-Type': 'application/json',
        }
    });


    axiosInstance.interceptors.request.use(async req => {
    
        const user = jwt_decode(authTokens.access)
        const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
    
        if(!isExpired) return req
    
        axios.post(`${baseURL}/account/token/refresh/`, {
            refresh: authTokens.refresh
        }).then((response)=>{
            localStorage.setItem('authTokens', JSON.stringify(response.data))
        
            setAuthTokens(response.data)
            setUser(jwt_decode(response.data.access))
            
            req.headers.Authorization = `Bearer ${response.data.access}`
            return req
        }).catch(error => {
            console.log(error.response.data.detail);
            logoutUser()
        });
    })
    
    return axiosInstance
}

export default useAxios;