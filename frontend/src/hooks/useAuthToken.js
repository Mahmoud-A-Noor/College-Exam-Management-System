import { useState } from 'react';

const useAuthToken = () => {
  const [authToken, setAuthToken] = useState(localStorage.getItem('authTokens')?JSON.parse(localStorage.getItem('authTokens')):null);

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