import { useContext } from 'react';
import { Navigate, Outlet  } from 'react-router-dom';

import AuthContext from '../context/AuthContext';


const PrivateRoute = ({ element: Element, ...rest }) => {
  const { authToken } = useContext(AuthContext);

  return authToken ? <Outlet /> : <Navigate to="/login" replace={true} />
};

export default PrivateRoute;