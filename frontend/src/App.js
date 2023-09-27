import { BrowserRouter, Route, Routes } from 'react-router-dom';

import PrivateRoute from './utils/PrivateRoute';
import { AuthProvider } from './context/AuthContext';

import Home from './pages/Home/Home';
import AboutUs from './pages/AboutUs/AboutUs'
import ContactUs from './pages/ContactUs/ContactUs'
import Login from './pages/Authentication/Login';
import Dashboard from './pages/Dashboard/Dashboard';


export default function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Home />} exact />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/login" element={<Login />} />
            {/* <Route path='/dashboard' element={<PrivateRoute/>}>
                <Route path='/dashboard' element={<Dashboard/>}/>
            </Route> */}
            <Route path="/dashboard/*" element={<PrivateRoute />}>
              <Route index element={<Dashboard />} />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}