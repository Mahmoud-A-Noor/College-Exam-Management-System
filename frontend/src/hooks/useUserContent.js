import { useState, useEffect, useContext } from 'react'

import AuthContext from '../context/AuthContext'

import Profile from "../pages/Dashboard/Profile"

import AdminHome from '../pages/Dashboard/Admin/Home/AdminHome'
import AddUser from '../pages/Dashboard/Admin/AddUser/AddUser'
import Lecturers from "../pages/Dashboard/Admin/Tables/Lecturers"
import Students from "../pages/Dashboard/Admin/Tables/Students"
import AddCourse from '../pages/Dashboard/Admin/AddCourse/AddCourse'
import Courses from '../pages/Dashboard/Admin/Tables/Courses'

import LecturerHome from '../pages/Dashboard/Lecturer/Home/LecturerHome'
import AddExam from '../pages/Dashboard/Lecturer/Exam/AddExam/AddExam'
import Exams from "../pages/Dashboard/Lecturer/Exam/Exams"
import LecturerCourses from "../pages/Dashboard/Lecturer/Courses"

import StudentHome from '../pages/Dashboard/Student/Home/StudentHome'


export default function useUserContent() {
    const { userData } = useContext(AuthContext)
    const [page, setPage] = useState("home")
    const [pageContent, setPageContent] = useState(null)
    const [userType, setUserType] = useState("student") // used in addUser Page to select type of user to be created

    useEffect(()=> {
        if (page === "home") {
            if(userData?.user_type === "admin")
                setPageContent(<AdminHome />)
            else if (userData?.user_type === "lecturer")
                setPageContent(<LecturerHome />)
            else if(userData?.user_type === "student")
                setPageContent(<StudentHome />)
        }
        else if (page === "addUser"){
            if (userData?.user_type === "admin"){
                setPageContent(<AddUser userType={userType} setUserType={setUserType} />)
            }
            else{
                setPage("home")
            }
        }
        else if (page === "lecturers"){
            if (userData?.user_type === "admin"){
                setPageContent(<Lecturers setPage={setPage} setUserType={setUserType} />)
            }
            else{
                setPage("home")
            }
        }
        else if (page === "students"){
            if (userData?.user_type === "admin"){
                setPageContent(<Students setPage={setPage} setUserType={setUserType} />)
            }
            else{
                setPage("home")
            }
        }
        else if (page === "addCourse"){
            if (userData?.user_type === "admin"){
                setPageContent(<AddCourse />)
            }
            else{
                setPage("home")
            }
        }
        else if (page === "courses"){
            if (userData?.user_type === "admin"){
                setPageContent(<Courses setPage={setPage} />)
            }
            else{
                setPage("home")
            }
        }
        else if (page === "addExam"){
            if (userData?.user_type === "lecturer"){
                setPageContent(<AddExam />)
            }
            else{
                setPage("home")
            }
        }
        else if (page === "exams"){
            if (userData?.user_type === "lecturer"){
                setPageContent(<Exams setPage={setPage} />)
            }
            else{
                setPage("home")
            }
        }
        else if (page === "lecturerCourses"){
            if (userData?.user_type === "lecturer"){
                setPageContent(<LecturerCourses />)
            }
            else{
                setPage("home")
            }
        }
        
        else if (page === "profile"){
            setPageContent(<Profile />)
        }
        // eslint-disable-next-line
    }, [page, userData, userType])

    
    return {
        page,
        setPage,
        pageContent,
        
    }
}
