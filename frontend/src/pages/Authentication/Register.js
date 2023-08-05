import '../../assets/css/Authentication/Register.css'
// import RegisterImage from '../../assets/images/login.png'

export default function Register(){
    return (
        <div id='register'>
            <div className='container'>
                <div className='row align-items-center justify-content-center'>
                    <div className='col-lg-6 col-md-12'>
                        <form method='post' className='text-center'>
                            <h3>Login</h3>
                            <div className='row justify-content-center'>
                                <div className='col-lg-6 col-md-12'>
                                    <input className='my-form-control' type='text' placeholder='First Name' />
                                </div>
                                <div className='col-lg-6 col-md-12'>
                                    <input className='my-form-control' type='text' placeholder='Last Name' />
                                </div>
                                <div className='col-12'>
                                    <input className='my-form-control' type='email' placeholder='Email' />
                                </div>
                                <div className='col-12'>
                                    <input className='my-form-control' type='password' placeholder='Password' />
                                </div>
                                <div className='col-12'>
                                    <input className='my-form-control' type='tel' placeholder='Phone Number' />
                                </div>
                                <div className='col-12'>
                                    <select className='my-form-control' id="gender" name="gender">
                                        <option value="">Select Gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                </div>
                                <div className='col-12'>
                                    <input className='my-form-control' type='date' />
                                </div>
                                <div className='col-12'>
                                        <textarea className='my-form-control' placeholder='Address' rows={5}></textarea>
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