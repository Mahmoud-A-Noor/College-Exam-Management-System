import { useContext, useEffect } from 'react';

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import AuthContext from '../../context/AuthContext';

import '../../assets/css/Authentication/Login.css'
// import LoginImage from '../../assets/images/login.png'

export default function Login(){

    const { loginUser, error, setError } = useContext(AuthContext)

    useEffect(()=>{
        setError("")
        // eslint-disable-next-line
    },[])

    return (
        <>
            <Navbar />
            <div id='login'>
                <div className='container'>
                    <div className='row align-items-center justify-content-center'>
                        <div className='col-lg-6 col-md-12'>
                            <form onSubmit={loginUser} method='post' className='text-center'>
                                {error && (
                                    <div className="alert alert-danger" role="alert">
                                        {error}
                                    </div>
                                )}
                                <h3>Login</h3>
                                <div className='row justify-content-center'>
                                    <div className='col-12'>
                                        <input name='email' className='my-form-control' type='text' placeholder='Email'/>
                                    </div>
                                    <div className='col-12'>
                                        <input name='password' className='my-form-control' type='password' placeholder='Password' />
                                    </div>
                                    <div className='col-6'>
                                        <button type='submit'>Login</button>
                                        <p>Don't have an account? <a href='/register'>Register</a></p>
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
    //     <div id='login'>
    //         <div className='container'>
    //             <div className='row align-items-center'>
    //                 <div className='col-lg-6 col-md-12'>
    //                     <form method='post' className='text-center'>
    //                         <h3>Login</h3>
    //                         <div className='row justify-content-center'>
    //                             <div className='col-12'>
    //                                 <input className='my-form-control' type='text' placeholder='Email' />
    //                             </div>
    //                             <div className='col-12'>
    //                                 <input className='my-form-control' type='text' placeholder='Password' />
    //                             </div>
    //                             <div className='col-6'>
    //                                 <button type='submit'>Login</button>
    //                             </div>
    //                         </div>
    //                     </form>
    //                 </div>
    //                 <div className='col-lg-6 col-md-12'>
    //                     <img src={LoginImage} alt='' className='img-fluid' />
    //                 </div>
    //             </div>
    //         </div>            
    //     </div>
    // )
}