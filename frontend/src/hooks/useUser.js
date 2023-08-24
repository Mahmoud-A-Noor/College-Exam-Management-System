import { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';


export default function useUser(authToken, axiosInstance) {
  const [user, setUser] = useState(null)
  const [userData, setUserData] = useState(null);

  const getUser = () =>{
      if(!user && !userData){
        if (authToken && authToken.access_token) {
          const decodedToken = jwt_decode(authToken.access_token);
          setUser(()=>decodedToken);
          const userId = decodedToken.user_id;
    
          // Fetch user data from the API using the user ID
          axiosInstance.get(`account/${userId}/`)
            .then(response => {
              setUserData(()=>response.data);
            })
            .catch(error => {
              console.error('Error fetching user data:', error)
            });
        }else{
          console.log("Error fetching user data: access token couldn't be found")
        }
      }else{
        console.log("no need to get user data, user data already exists")
      }
  }

  // Load user data from local storage on initial render
  useEffect(() => {
    getUser();
    // eslint-disable-next-line
  }, [axiosInstance]);  
  
  // Function to remove user data from state and local storage
  const clearUserState = () => {
    setUser(()=>null);
    setUserData(()=>null);
  };

  return { user, userData, getUser, clearUserState };

}
