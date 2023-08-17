import { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';

import useAxios from "./useAxios"

export default function useUserData(authTokens, setAuthTokens, setUser, logoutUser) {
  const [userData, setUserData] = useState(null);
  const axiosInstance = useAxios(authTokens, setAuthTokens, setUser, logoutUser);

  const getUserData = () =>{
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUserData(()=>JSON.parse(storedUserData));
    } else {
      const authTokens = JSON.parse(localStorage.getItem('authTokens'));
      if (authTokens && authTokens.access_token) {
        // Decode the access token to get the user ID
        const decodedToken = jwt_decode(authTokens.access_token);
        const userId = decodedToken.user_id;
  
        // Fetch user data from the API using the user ID
        axiosInstance.get(`account/${userId}/`)
          .then(response => {
            setUserData(()=>response.data);
            localStorage.setItem('userData', JSON.stringify(response.data));
          })
          .catch(error => console.error('Error fetching user data:', error));
      }
    }
  }

  // Load user data from local storage on initial render
  useEffect(() => {
    getUserData();
    // eslint-disable-next-line
  }, []);  
  
  // Function to remove user data from state and local storage
  const removeUserData = () => {
    setUserData(()=>null);
    localStorage.removeItem('userData');
  };

  // Function to update user data in state and local storage
  const updateUserData = () => {
    removeUserData();
    getUserData();
  };


  return { userData, updateUserData, removeUserData, axiosInstance };
}
