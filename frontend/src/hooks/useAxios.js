import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import dayjs from 'dayjs';

const baseURL = 'http://127.0.0.1:8000/';

const useAxios = (authToken, updateAuthToken) => {
    const navigate = useNavigate()

    const axiosInstance = axios.create({
        baseURL,
        headers:{
            'Authorization': `Bearer ${authToken?.access_token}`,
        }
    });

    // Define the interceptor function separately
    const requestInterceptor = async (req) => {
        const user = jwt_decode(authToken.access_token);
        const isExpired = dayjs.unix(user.exp).isBefore(dayjs());

        if (!isExpired) return req;

        try {
            const response = await axios.post(`${baseURL}account/token/refresh/`, {
                refresh_token: authToken.refresh_token,
            });

            updateAuthToken({
                refresh_token: authToken.refresh_token,
                access_token: response.data.access_token
            });
            req.headers.Authorization = `Bearer ${response.data.access_token}`;
            return req;
        } catch (error) {
            if(authToken){
                updateAuthToken(null); // Clear tokens
                // localStorage.removeItem('userData');
                navigate('/login', {replace:true});
            }else{
                console.log("Loading authToken .....")
            }
            return Promise.reject(error);
        }
    };

    // Attach the interceptor
    useEffect(() => {
        axiosInstance.interceptors.request.use(requestInterceptor);

        return () => {
            axiosInstance.interceptors.request.eject(requestInterceptor);
        };
        // eslint-disable-next-line
    }, []);

    return axiosInstance;
};

export default useAxios;