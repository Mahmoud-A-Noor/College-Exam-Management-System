import { useState, useEffect } from 'react';

const useAuthToken = () => {
  const [authToken, setAuthToken] = useState(JSON.parse(localStorage.getItem('authTokens'))?JSON.parse(localStorage.getItem('authTokens')):null);

    useEffect(() => {
      setAuthToken(()=>JSON.parse(localStorage.getItem('authTokens')))
    }, [])
    

  const updateAuthToken = (newAuthToken) => {
    setAuthToken(()=>newAuthToken);
    if (newAuthToken) {
      localStorage.setItem('authTokens', JSON.stringify(newAuthToken));
    } else {
      localStorage.removeItem('authTokens');
    }
  };

  return { authToken, updateAuthToken };
};

export default useAuthToken;