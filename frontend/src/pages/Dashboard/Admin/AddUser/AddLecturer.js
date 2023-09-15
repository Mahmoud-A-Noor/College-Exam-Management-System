import { useContext, useEffect } from 'react';

import AuthContext from '../../../../context/AuthContext';

import '../../../../assets/css/Dashboard/Admin/AddUser.css'

export default function AddLecturer(){

    const { addLecturer, error, setError } = useContext(AuthContext)

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
                            <form onSubmit={addLecturer} method='post' encType="multipart/form-data">
                                {error && (
                                    <div className="alert alert-danger" role="alert">
                                        {error}
                                    </div>
                                )}
                                <h3 className='text-center'>Add Lecturer</h3>
                                <div className='row justify-content-center'>
                                    <div className='col-lg-6 col-md-12'>
                                        <label htmlFor="first_name" className="form-label">First Name</label>
                                        <input name='first_name' className='my-form-control' type='text' placeholder='First Name' required />
                                    </div>
                                    <div className='col-lg-6 col-md-12'>
                                        <label htmlFor="last_name" className="form-label">Last Name</label>
                                        <input name='last_name' className='my-form-control' type='text' placeholder='Last Name' required />
                                    </div>
                                    <div className='col-12'>
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input name='email' className='my-form-control' type='email' placeholder='Email' required />
                                    </div>
                                    <div className='col-12'>
                                        <label htmlFor="password" className="form-label">Password</label>
                                        <input name='password' className='my-form-control' type='password' placeholder='Password' required />
                                    </div>
                                    <div className='col-12'>
                                        <label htmlFor="phone_number" className="form-label">Phone Number</label>
                                        <input name='phone_number' className='my-form-control' type='tel' placeholder='Phone Number' />
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
                                        <input name="date_of_birth" className='my-form-control' type='date' />
                                    </div>
                                    <div className='col-12'>
                                        <label htmlFor="address" className="form-label">Address</label>
                                        <textarea name='address' className='my-form-control' placeholder='Address' rows={5}></textarea>
                                    </div>
                                    <div className='col-12'>
                                        <label htmlFor="expertise" className="form-label">Expertise</label>
                                        <input id='expertise' name='expertise' className='my-form-control' type='text' placeholder='Expertise' required />
                                    </div>
                                    <div className='col-12'>
                                        <label htmlFor="img" className="form-label">Profile Image</label>
                                        <input name="img" className='form-control' type="file" />
                                    </div>
                                    <div className='col-lg-6 col-md-10 col-sm-12'>
                                        <button type='submit'>Add Lecturer</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>            
            </div>
        </>
    )
}