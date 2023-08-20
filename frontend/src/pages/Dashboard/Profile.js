import { useContext, useEffect } from 'react';
import AuthContext from '../../context/AuthContext';


import '../../assets/css/Dashboard/Profile.css'
import ProfileImage from '../../assets/images/profile.png'





export default function Profile() {

    const { userData, updateUser, error, setError, success, setSuccess } = useContext(AuthContext)

    useEffect(()=>{
        setError("")
        setSuccess("")
        // eslint-disable-next-line
    },[])

    return (
        <div id="profile">
            <h3>Profile</h3>
            {success && (
                    <div className="alert alert-success text-center" role="alert">
                        {success}
                    </div>
            )}
            <form onSubmit={updateUser} method='post' className='text-center' encType="multipart/form-data">
                {error && (
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
                )}
                <div className='row justify-content-center align-items-center'>
                    <div className='col-lg-6 col-md-12'>
                        <div className='row justify-content-center align-items-center'>
                            <div className='col-lg-6 col-md-12'>
                                <input name="first_name" className='my-form-control' type='text' placeholder='First Name' defaultValue={userData ? userData.first_name : ''} required/>
                            </div>
                            <div className='col-lg-6 col-md-12'>
                                <input name="last_name" className='my-form-control' type='text' placeholder='Last Name' defaultValue={userData ? userData.last_name : ''} required/>
                            </div>
                            <div className='col-12'>
                                <input name="email" className='my-form-control' type='email' placeholder='Email' defaultValue={userData ? userData.email : ''} required/>
                            </div>
                            <div className='col-12'>
                                <input name="phone_number" className='my-form-control' type='tel' placeholder='Phone Number' defaultValue={userData ? userData.phone_number : ''} />
                            </div>
                            <div className='col-12'>
                                <input name="date_of_birth" className='my-form-control' type='date' defaultValue={userData ? userData.date_of_birth : ''} />
                            </div>
                            <div className='col-12'>
                                <textarea name='address' className='my-form-control' placeholder='Address' rows={5} defaultValue={userData ? userData.address : ''}></textarea>
                            </div>
                            <div className='col-12'>
                                <input name="img" className='my-form-control' type="file" />
                            </div>
                            <div className='col-lg-5 col-md-12'>
                                <button type='submit'>Update Profile</button>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-6 d-none d-lg-block'>
                        <img src={ProfileImage} alt='' className='img-fluid' />
                    </div>
                </div>
            </form>
        </div>
    )
}