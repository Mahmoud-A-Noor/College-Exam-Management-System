import { useContext, useEffect } from 'react';
import AuthContext from '../../context/AuthContext';

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";


import '../../assets/css/Authentication/Register.css'
// import RegisterImage from '../../assets/images/login.png'

export default function Register(){

    const { registerUser, error, setError } = useContext(AuthContext)

    useEffect(()=>{
        setError("")
        // eslint-disable-next-line
    },[])

    return (
        <>
            <Navbar />
            <div id='register'>
                <div className='container'>
                    <div className='row align-items-center justify-content-center'>
                        <div className='col-lg-6 col-md-12'>
                            <form onSubmit={registerUser} method='post' className='text-center' encType="multipart/form-data">
                                {error && (
                                    <div className="alert alert-danger" role="alert">
                                        {error}
                                    </div>
                                )}
                                <h3>Register</h3>
                                <div className='row justify-content-center'>
                                    <div className='col-lg-6 col-md-12'>
                                        <input name='first_name' className='my-form-control' type='text' placeholder='First Name' required />
                                    </div>
                                    <div className='col-lg-6 col-md-12'>
                                        <input name='last_name' className='my-form-control' type='text' placeholder='Last Name' required />
                                    </div>
                                    <div className='col-12'>
                                        <input name='email' className='my-form-control' type='email' placeholder='Email' required />
                                    </div>
                                    <div className='col-12'>
                                        <input name='password' className='my-form-control' type='password' placeholder='Password' required />
                                    </div>
                                    <div className='col-12'>
                                        <input name='phone_number' className='my-form-control' type='tel' placeholder='Phone Number' />
                                    </div>
                                    <div className='col-12'>
                                        <select id="gender" name="gender" className='my-form-control' required>
                                            <option value="">Select Gender</option>
                                            <option value="M">Male</option>
                                            <option value="F">Female</option>
                                        </select>
                                    </div>
                                    <div className='col-12'>
                                        <input name="date_of_birth" className='my-form-control' type='date' />
                                    </div>
                                    <div className='col-12'>
                                        <textarea name='address' className='my-form-control' placeholder='Address' rows={5}></textarea>
                                    </div>
                                    <div className='col-12'>
                                        <input name="img" className='my-form-control' type="file" />
                                    </div>
                                    <div className='col-6'>
                                        <button type='submit'>Register</button>
                                        <p>Have an account? <a href='/login'>Login</a></p>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>            
            </div>
            <Footer />
        </>
    )
    // return (
    //     <div id='register'>
    //         <div className='container'>
    //             <div className='row align-items-center'>
    //                 <div className='col-lg-6 col-md-12'>
    //                     <form method='post' className='text-center'>
    //                         <h3>Register</h3>
    //                         <div className='row justify-content-center'>
    //                             <div className='col-12'>
    //                                 <input className='my-form-control' type='text' placeholder='Email' />
    //                             </div>
    //                             <div className='col-12'>
    //                                 <input className='my-form-control' type='text' placeholder='Password' />
    //                             </div>
    //                             <div className='col-6'>
    //                                 <button type='submit'>Register</button>
    //                             </div>
    //                         </div>
    //                     </form>
    //                 </div>
    //                 <div className='col-lg-6 col-md-12'>
    //                     <img src={RegisterImage} alt='' className='img-fluid' />
    //                 </div>
    //             </div>
    //         </div>            
    //     </div>
    // )
}