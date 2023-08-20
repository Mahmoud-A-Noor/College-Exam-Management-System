import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

import axios from 'axios';
import jwt_decode from 'jwt-decode';
import dayjs from 'dayjs';

import useAuthToken from './useAuthToken'; 


const baseURL = 'http://127.0.0.1:8000/';

const useAxios = () => {
    const navigate = useNavigate()
    const { authToken, updateAuthToken } = useAuthToken();

    const axiosInstance = axios.create({
        baseURL,
        headers:{
            'Authorization': `Bearer ${authToken?.access_token}`,
        }
    });

    useEffect(() => {
        if (authToken) {
        const requestInterceptor = axiosInstance.interceptors.request.use(
            async (req) => {
                const user = jwt_decode(authToken.access_token);
                const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

                if (!isExpired) return req;

                try {
                    const response = await axios.post(`${baseURL}account/token/refresh/`, {
                    refresh_token: authToken.refresh_token,
                    });

                    updateAuthToken(response.data);
                    req.headers.Authorization = `Bearer ${response.data.access_token}`;
                    return req;
                } catch (error) {
                    // Handle error and logout functionality here
                    updateAuthToken(null); // Clear tokens
                    navigate('/login', {replace:true});
                    // logoutUser(); // Call your logout function
                    return Promise.reject(error);
                }
            },
            (error) => {
                return Promise.reject(error);
            }
            );

            return () => {
                axiosInstance.interceptors.request.eject(requestInterceptor);
            };
        }
    // eslint-disable-next-line
    }, [authToken]);

    return axiosInstance;
    };

export default useAxios;