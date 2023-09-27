import { useState } from 'react';

const useAuthToken = () => {
  const [authToken, setAuthToken] = useState(localStorage.getItem('authTokens')?JSON.parse(localStorage.getItem('authTokens')):null);

  const updateAuthToken = (newAuthToken) => {
    if (newAuthToken) {
      setAuthToken(()=>newAuthToken);
      localStorage.setItem('authTokens', JSON.stringify(newAuthToken));
    } else {
      setAuthToken(()=>null);
      localStorage.removeItem('authTokens');
    }
  };

  return { authToken, updateAuthToken };
};

export default useAuthToken;