import { useEffect, useContext, useCallback, useRef } from 'react'
import AuthContext from '../../context/AuthContext';

import '../../assets/css/Dashboard/Sidebar.css'


export default function Sidebar({page, setPage}){

    const { logoutUser, userData } = useContext(AuthContext)
    
    const sidebar_toggler_ref = useRef(null)
    // const sidebar_toggler_ref = document.getElementById("sidebar-toggler")
    const sidebar_body_overlay_ref = useRef(null)
    // const sidebar_body_overlay_ref = document.getElementById("sidebar-body-overlay")

    const toggle_sidebar = useCallback(() => {
        const sidebar = document.getElementById("sidebar");
        sidebar.classList.toggle("active");
        sidebar_toggler_ref.current.classList.toggle("active");
        sidebar_body_overlay_ref.current.classList.toggle("d-none");// eslint-disable-next-line
    }, []);
    
    useEffect(() => {

        const sidebar_toggler_current = sidebar_toggler_ref.current;
        const sidebar_body_overlay_current = sidebar_body_overlay_ref.current;

        sidebar_toggler_current.addEventListener("click", toggle_sidebar)
        sidebar_body_overlay_current.addEventListener("click", toggle_sidebar)
        
        return () => {
            sidebar_toggler_current.removeEventListener("click", toggle_sidebar)
            sidebar_body_overlay_current.removeEventListener("click", toggle_sidebar)
        }// eslint-disable-next-line
    }, [toggle_sidebar])
    
    

    return (
        <>
            <div id='sidebar-toggler' ref={sidebar_toggler_ref}>
                <i className="bi bi-list"></i>
            </div>
            <div id='sidebar-body-overlay' className='d-none' ref={sidebar_body_overlay_ref}></div>
            <div id="sidebar">
                <div className='position-relative h-100'>
                    <div id="sidebar-user-info">
                        <div id="sidebar-img">
                            <img src={userData?.img} alt='' className='img-fluid rounded-circle' />
                        </div>
                        <div id='sidebar-user-info'>
                            <p>{userData?.first_name} {userData?.last_name}</p>
                            <small>{userData?.user_type}</small>
                        </div>
                        <div className="sidebar-divider"></div>
                    </div>
                    <div id="sidebar-nav-items">
                        <ul>
                            <li onClick={()=>{setPage("home")}} className={page === "home" ? "active" : ""}>
                                <i className="bi bi-house-fill"></i>
                                <p>Home</p>
                            </li>
                        </ul>
                        
                        <ul id="sidebar-user-actions-nav-items">
                            <li onClick={()=>{setPage("profile")}} className={page === "profile" ? "active" : ""}>
                                <i className="bi bi-person-fill"></i>
                                <p>Profile</p>
                            </li>
                            <li onClick={logoutUser}>
                                <i className="bi bi-box-arrow-left"></i>
                                <p>Logout</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}