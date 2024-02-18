import { useContext, useEffect } from 'react';
import AuthContext from '../../../../context/AuthContext';



import '../../../../assets/css/Dashboard/Admin/AddUser.css'
// import RegisterImage from '../../assets/images/login.png'

export default function Register(){

    const { addStudent, error, setError } = useContext(AuthContext)

    useEffect(()=>{
        setError("")
        // eslint-disable-next-line
    },[])

    return (
        <>
            <div className='add-user-form'>
                <div className='container'>
                    <div className='row align-items-center justify-content-center'>
                        <div className='col-lg-8 col-md-12'>
                            <form onSubmit={addStudent} method='post' encType="multipart/form-data">
                                {error && (
                                    <div className="alert alert-danger" role="alert">
                                        {error}
                                    </div>
                                )}
                                <h3 className='text-center'>Add Student</h3>
                                <div className='row justify-content-center'>
                                    <div className='col-lg-6 col-md-12'>
                                        <label htmlFor="first_name" className="form-label">First Name</label>
                                        <input id='first_name' name='first_name' className='my-form-control' type='text' placeholder='First Name' required />
                                    </div>
                                    <div className='col-lg-6 col-md-12'>
                                        <label htmlFor="last_name" className="form-label">Last Name</label>
                                        <input id='last_name' name='last_name' className='my-form-control' type='text' placeholder='Last Name' required />
                                    </div>
                                    <div className='col-12'>
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input id='email' name='email' className='my-form-control' type='email' placeholder='Email' required />
                                    </div>
                                    <div className='col-12'>
                                        <label htmlFor="password" className="form-label">Password</label>
                                        <input id='password' name='password' className='my-form-control' type='password' placeholder='Password' required />
                                    </div>
                                    <div className='col-12'>
                                        <label htmlFor="phone_number" className="form-label">Phone Number</label>
                                        <input id='phone_number' name='phone_number' className='my-form-control' type='tel' placeholder='Phone Number' />
                                    </div>
                                    <div className='col-12'>
                                        <label htmlFor="gender" className="form-label">Gender</label>
                                        <select id="gender" name="gender" className='my-form-control' required>
                                            <option value="">Select Gender</option>
                                            <option value="M">Male</option>
                                            <option value="F">Female</option>
                                        </select>
                                    </div>
                                    <div className='col-12'>
                                        <label htmlFor="date_of_birth" className="form-label">Date of Birth</label>
                                        <input id='date_of_birth' name="date_of_birth" className='my-form-control' type='date' />
                                    </div>
                                    <div className='col-12'>
                                        <label htmlFor="address" className="form-label">Address</label>
                                        <textarea id='address' name='address' className='my-form-control' placeholder='Address' rows={5}></textarea>
                                    </div>
                                    <div className='col-12'>
                                        <label htmlFor="major" className="form-label">Major</label>
                                        <input id='major' name='major' className='my-form-control' placeholder='Major' type='text'/>
                                    </div>
                                    <div className='col-12'>
                                        <label htmlFor="year" className="form-label">Year</label>
                                        <input id='year' name='year' className='my-form-control' placeholder='Year' type='number' min="1" max="5" />
                                    </div>
                                    <div className='col-12'>
                                        <label htmlFor="gpa" className="form-label">GPA</label>
                                        <input id='gpa' name='gpa' className='my-form-control' placeholder='GPA' type='number' step="0.01" />
                                    </div>
                                    <div className='col-12'>
                                        <label htmlFor="img" className="form-label">Profile Image</label>
                                        <input id='img' name="img" className='form-control' type="file" />
                                    </div>
                                    <div className='col-lg-6 col-md-10 col-sm-12'>
                                        <button type='submit'>Add Student</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>            
            </div>
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