import { useState, useEffect, useMemo, useContext } from "react";

import { MaterialReactTable } from "material-react-table";

import useAuthToken from '../../../hooks/useAuthToken'
import useAxios from '../../../hooks/useAxios'
import AuthContext from '../../../context/AuthContext'

import "../../../assets/css/Dashboard/Student/EnrollCourses.css"

export default function EnrollCourses(){

    const { authToken, updateAuthToken } = useAuthToken();
    const axiosInstance = useAxios(authToken, updateAuthToken);
    const { user, error, setError, success, setSuccess } = useContext(AuthContext)
    const [data, setData] = useState([])

    const [rowSelection, setRowSelection] = useState({});
    const [selectedCourseNames, setSelectedCourseNames] = useState([]);

    const ContentComponent = ({ content }) => {
      return <div dangerouslySetInnerHTML={{ __html: content }} />;
    };

    const getStudentCourses = ()=>{
      axiosInstance.get('/api/get-student-courses/',{
        params: {
          student_id: user.user_id,
        },
      }).then((response)=>{
        const response_data = response.data
        setData(()=>response_data.map((record)=>{
          return {
            course_name: record.name,
            lecturer: record.lecturer,
            final_percentage: record.final_percentage,
            year: record.year,
            course_content: <ContentComponent content={record.content} />,
          }
        }))
      }).catch((error)=>{
        setError("Error Loading Courses : ", error)
      })
    }

    useEffect(()=>{
      getStudentCourses()
    },[])


    const enroll_courses = ()=>{
      axiosInstance.post('/api/enroll-courses/', {
        course_names: selectedCourseNames,
        user_id: user.user_id
      }).then((response)=>{
        setSuccess(response.data.message)
      }).then(()=>{
        getStudentCourses()
      })
      .catch((error)=>{
        console.error(error)
      })
    }
  
    // const data = [
    //   {
    //     course_name: "Mathematics",
    //   },
    //   {
    //     course_name: "Physics",
    //   },
    // ];
  
    const columns = [
          {
              accessorKey: "course_name",
              header: "Course Name",
          },
          {
              accessorKey: "lecturer",
              header: "Lecturer",
          },
          {
              accessorKey: "final_percentage",
              header: "Final Percentage",
          },
          {
              accessorKey: "year",
              header: "Year",
              Cell: ({ cell }) =>(cell.getValue()===1? "1st year" : cell.getValue()===2?"2nd year":cell.getValue()===3?"3rd year":"4th year")
          },
          {
              accessorKey: "course_content",
              header: "Course Content"
          },
        ]
  

    useEffect(() => {
      const selectedNames = data
      .filter((_, index) => rowSelection[index])
      .map((row) => row.course_name);

      setSelectedCourseNames(selectedNames);
      }, [rowSelection]);

    return(
        <div id="enroll-courses">
            <h1 className="gradient-text text-center text-uppercase">Enroll Courses</h1>
            {error && (
                  <div className="alert alert-danger" role="alert">
                      {error}
                  </div>
              )}
              {success && (
                  <div className="alert alert-success" role="alert">
                      {success}
                  </div>
              )}
            <MaterialReactTable
                columns={columns}
                data={data}
                enableColumnFilterModes
                enableColumnOrdering
                enableGrouping
                enablePinning
                enableRowSelection
                onRowSelectionChange={setRowSelection}
                state={{ rowSelection }}
            />
              <div className='row justify-content-center'>
                <div className="col-lg-4 col-md-6 col-sm-12">
                  <button className="primary-default-btn mb-2 w-100 mt-3" 
                    style={{
                            background: selectedCourseNames.length === 0 ? "gray" : "linear-gradient(90deg, #6597CB 0%, #35369B 100%)",
                          }} 
                    disabled={selectedCourseNames.length === 0}
                    onClick={enroll_courses}
                  >
                    Enroll Courses
                  </button>
                </div>
              </div>
        </div>
    )
}