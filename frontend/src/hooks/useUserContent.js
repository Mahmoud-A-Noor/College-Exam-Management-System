import { useState, useEffect } from 'react'

import Profile from "../pages/Dashboard/Profile"
// import AdminHome from '../pages/Dashboard/Admin/AdminHome'
import StudentHome from '../pages/Dashboard/Student/StudentHome'


export default function useUserContent() {
    const [page, setPage] = useState("home")
    const [pageContent, setPageContent] = useState(<h1>page Content</h1>)

    useEffect(()=> {
        if (page === "home") {
            // ! here we will check for user type and set the pageContent to appropriate user home page
            setPageContent(<StudentHome />)
        }
        else if (page === "profile"){
            setPageContent(<Profile />)
        }
    }, [page])

    
    return {
        setPage,
        pageContent,
    }
}
