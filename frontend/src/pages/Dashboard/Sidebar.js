import { useState, useEffect, useContext, useCallback, useRef } from 'react'
import AuthContext from '../../context/AuthContext';

import '../../assets/css/Dashboard/Sidebar.css'

import lecturerImage from "../../assets/images/lecturer.png"
import studentImage from "../../assets/images/student.png"
import lecturerWhiteImage from "../../assets/images/lecturer-white.png"
import studentWhiteImage from "../../assets/images/student-white.png"
import examImage from "../../assets/images/exam.png"
import examWhiteImage from "../../assets/images/exam-white.png"
import examImageWithoutPen from "../../assets/images/exam-without-pen.png"
import examWhiteImageWithoutPen from "../../assets/images/exam-white-without-pen.png"
import addCourseImage from "../../assets/images/add-course.png"
import addCourseWhiteImage from "../../assets/images/add-course-white.png"
import coursesImage from "../../assets/images/courses.png"
import coursesWhiteImage from "../../assets/images/courses-white.png"


export default function Sidebar({page, setPage}){
    const [isLecturersHovered, setIsLecturersHovered] = useState(false);
    const [isStudentsHovered, setIsStudentsHovered] = useState(false);
    const [isAddExamHovered, setIsAddExamHovered] = useState(false);
    const [isExamsHovered, setIsExamsHovered] = useState(false);
    const [isCoursesHovered, setIsCoursesHovered] = useState(false);
    const [isAddCoursesHovered, setIsAddCoursesHovered] = useState(false);

    const { logoutUser, userData } = useContext(AuthContext)
    
    const sidebar_toggler_ref = useRef(null)
    const sidebar_body_overlay_ref = useRef(null)

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
                        <div className="custom-divider"></div>
                    </div>
                    <div id="sidebar-nav-items">



                        <ul>
                            <li onClick={()=>{
                                setPage("home"); 
                                if(window.innerWidth <= 1215){
                                    toggle_sidebar();
                                }
                                }} className={page === "home" ? "active" : ""}>
                                <i className="bi bi-house-fill"></i>
                                <p>Home</p>
                            </li>
                            {
                                userData?.user_type === "admin" &&
                                <li onClick={()=>{
                                    setPage("addUser"); 
                                    if(window.innerWidth <= 1215){
                                        toggle_sidebar();
                                    }
                                    }} className={page === "addUser" ? "active" : ""}>
                                    <i className="bi bi-person-fill-add"></i>
                                    <p>Add User</p>
                                </li>
                            }
                            {
                                userData?.user_type === "admin" &&
                                <li
                                    onClick={()=>{
                                        setPage('lecturers'); 
                                        if(window.innerWidth <= 1215){
                                            toggle_sidebar();
                                        }
                                        }}
                                    onMouseEnter={() => setIsLecturersHovered(true)}
                                    onMouseLeave={() => setIsLecturersHovered(false)}
                                    className={page === 'lecturers' ? 'active p-3' : 'p-3'}
                                >
                                    <img
                                    src={isLecturersHovered ? lecturerImage : (page === 'lecturers' ? lecturerImage : lecturerWhiteImage)}
                                    alt=""
                                    />
                                    <p>Lecturers</p>
                                </li>
                            }
                            {
                                userData?.user_type === "admin" &&
                                <li
                                    onClick={()=>{
                                        setPage('students'); 
                                        if(window.innerWidth <= 1215){
                                            toggle_sidebar();
                                        }
                                        }}
                                    onMouseEnter={() => setIsStudentsHovered(true)}
                                    onMouseLeave={() => setIsStudentsHovered(false)}
                                    className={page === 'students' ? 'active p-3' : 'p-3'}
                                >
                                    <img
                                    src={isStudentsHovered ? studentImage : (page === 'students' ? studentImage : studentWhiteImage)}
                                    alt=""
                                    />
                                    <p>Students</p>
                                </li>
                            }
                            {
                                userData?.user_type === "admin" &&
                                <li
                                    onClick={()=>{
                                        setPage('addCourse'); 
                                        if(window.innerWidth <= 1215){
                                            toggle_sidebar();
                                        }
                                        }}
                                    onMouseEnter={() => setIsAddCoursesHovered(true)}
                                    onMouseLeave={() => setIsAddCoursesHovered(false)}
                                    className={page === 'addCourse' ? 'active p-3' : 'p-3'}
                                >
                                    <img
                                    src={isAddCoursesHovered ? addCourseImage : (page === 'addCourse' ? addCourseImage : addCourseWhiteImage)}
                                    alt=""
                                    />
                                    <p>Add Course</p>
                                </li>
                            }
                            {
                                userData?.user_type === "admin" &&
                                <li
                                    onClick={()=>{
                                        setPage('courses'); 
                                        if(window.innerWidth <= 1215){
                                            toggle_sidebar();
                                        }
                                        }}
                                    onMouseEnter={() => setIsCoursesHovered(true)}
                                    onMouseLeave={() => setIsCoursesHovered(false)}
                                    className={page === 'courses' ? 'active p-3' : 'p-3'}
                                >
                                    <img
                                    src={isCoursesHovered ? coursesImage : (page === 'courses' ? coursesImage : coursesWhiteImage)}
                                    alt=""
                                    />
                                    <p>Courses</p>
                                </li>
                            }
                            {
                                userData?.user_type === "lecturer" &&
                                <li
                                    onClick={()=>{
                                        setPage('addExam'); 
                                        if(window.innerWidth <= 1215){
                                            toggle_sidebar();
                                        }
                                        }}
                                    onMouseEnter={() => setIsAddExamHovered(true)}
                                    onMouseLeave={() => setIsAddExamHovered(false)}
                                    className={page === 'addExam' ? 'active p-3' : 'p-3'}
                                >
                                    <img
                                    src={isAddExamHovered ? examImage : (page === 'addExam' ? examImage : examWhiteImage)}
                                    alt=""
                                    />
                                    <p>Add Exam</p>
                                </li>
                            }
                            {
                                userData?.user_type === "lecturer" &&
                                <li
                                    onClick={()=>{
                                        setPage('exams'); 
                                        if(window.innerWidth <= 1215){
                                            toggle_sidebar();
                                        }
                                        }}
                                    onMouseEnter={() => setIsExamsHovered(true)}
                                    onMouseLeave={() => setIsExamsHovered(false)}
                                    className={page === 'exams' ? 'active p-3' : 'p-3'}
                                >
                                    <img
                                    src={isExamsHovered ? examImageWithoutPen : (page === 'exams' ? examImageWithoutPen : examWhiteImageWithoutPen)}
                                    alt=""
                                    />
                                    <p>Exams</p>
                                </li>
                            }
                        </ul>
                        


                        <ul id="sidebar-user-actions-nav-items">
                            <li onClick={()=>{
                                setPage("profile"); 
                                if(window.innerWidth <= 1215){
                                    toggle_sidebar();
                                }
                                }} className={page === "profile" ? "active" : ""}>
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