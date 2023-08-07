import { BrowserRouter, Route, Routes } from 'react-router-dom';

import PrivateRoute from './utils/PrivateRoute';
import { AuthProvider } from './context/AuthContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home/Home';
import AboutUs from './pages/AboutUs/AboutUs'
import ContactUs from './pages/ContactUs/ContactUs'
import Login from './pages/Authentication/Login';
import Register from './pages/Authentication/Register'
import Dashboard from './pages/Dashboard/Dashboard';


export default function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Navbar />
            <Routes>
              <Route path="/" element={<Home />} exact />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/contact-us" element={<ContactUs />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path='/dashboard' element={<PrivateRoute/>}>
                <Route path='/dashboard' element={<Dashboard/>}/>
              </Route>
            </Routes>
          <Footer />
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}