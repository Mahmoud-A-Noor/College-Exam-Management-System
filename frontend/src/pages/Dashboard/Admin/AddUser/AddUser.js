import AddStudent from "./AddStudent"
import AddLecturer from "./AddLecturer"

import studentImage from "../../../../assets/images/student.png"
import studentRedImage from "../../../../assets/images/student-red.png"
import lecturerImage from "../../../../assets/images/lecturer.png"
import lecturerRedImage from "../../../../assets/images/lecturer-red.png"

import "../../../../assets/css/Dashboard/Admin/AddUser.css"

export default function AddUser({userType, setUserType}){
    return (
        <div id="add-user">
            <div className="row justify-content-center text-center">
                <div className="col-lg-4 col-md-8 col-sm-10 col-xs-12 d-flex">
                    {
                        userType === "student"? 
                        <>
                            <div id="user-toggler" onClick={()=>{setUserType(()=>"student");}}>
                                <img src={studentRedImage} className="img-fluid" alt="" />
                            </div>
                            <div id="user-toggler" onClick={()=>{setUserType(()=>"lecturer");}}>
                                <img src={lecturerImage} className="img-fluid" alt="" />
                            </div>
                        </>
                        :
                        <>
                            <div id="user-toggler" onClick={()=>{setUserType(()=>"student");}}>
                                <img src={studentImage} className="img-fluid" alt="" />
                            </div>
                            <div id="user-toggler" onClick={()=>{setUserType(()=>"lecturer");}}>
                                <img src={lecturerRedImage} className="img-fluid" alt="" />
                            </div>
                        </>
                    }
                </div>
            </div>
            {
                userType === "student"? <AddStudent /> : <AddLecturer />
            }
        </div>
    )
}