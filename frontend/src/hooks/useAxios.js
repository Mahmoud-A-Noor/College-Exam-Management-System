import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import dayjs from 'dayjs';

const baseURL = 'http://127.0.0.1:8000/';

const useAxios = (authToken, updateAuthToken) => {
    const navigate = useNavigate()

    const axiosInstance = axios.create({
        baseURL,
        // headers:{
        //     'Authorization': `Bearer ${authToken?.access_token}`,
        // }
    });

    axiosInstance.interceptors.request.use(
        async (config) => {
          // Check if access token is expired
          const user = jwt_decode(authToken.access_token);
          const isExpired = dayjs.unix(user.exp).isBefore(dayjs());
      
          if (isExpired) {
            // Token is expired, refresh it
            try {
              const response = await axios.post(baseURL+'account/token/refresh/', { refresh_token: authToken?.refresh_token });
              const newAccessToken = response.data.access_token;
              
              // Update access token in your storage and state
              updateAuthToken({
                refresh_token: authToken.refresh_token,
                access_token: newAccessToken
              })
              
              config.headers['Authorization'] = `Bearer ${newAccessToken}`;
            } catch (error) {
                updateAuthToken(null);
                navigate('/login', {replace:true});
                return Promise.reject(error);
            }
          } else {
            // Token is valid, use it
            config.headers['Authorization'] = `Bearer ${authToken?.access_token}`;
          }
      
          return config;
        },
        (error) => {
          return Promise.reject(error);
        }
      );

    return axiosInstance;
};

export default useAxios;