import { useState, useEffect, useContext } from 'react'

import AuthContext from '../context/AuthContext'

import Profile from "../pages/Dashboard/Profile"
import AdminHome from '../pages/Dashboard/Admin/AdminHome'
import LecturerHome from '../pages/Dashboard/Lecturer/LecturerHome'
import StudentHome from '../pages/Dashboard/Student/StudentHome'


export default function useUserContent() {
    const { userData } = useContext(AuthContext)
    const [page, setPage] = useState("home")
    const [pageContent, setPageContent] = useState(null)

    useEffect(()=> {
        if (page === "home") {
            if(userData?.user_type === "admin")
                setPageContent(<AdminHome />)
            else if (userData?.user_type === "lecturer")
                setPageContent(<LecturerHome />)
            else if(userData?.user_type === "student")
                setPageContent(<StudentHome />)
        }
        else if (page === "profile"){
            setPageContent(<Profile />)
        }
    }, [page, userData])

    
    return {
        page,
        setPage,
        pageContent,
    }
}
