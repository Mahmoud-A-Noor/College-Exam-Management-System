import { useMemo, useState, useContext, useEffect } from "react";

import { MaterialReactTable } from "material-react-table";
import Box from '@mui/material/Box';

import useAuthToken from '../../../../hooks/useAuthToken'
import useAxios from '../../../../hooks/useAxios'
import AuthContext from '../../../../context/AuthContext';

import UpdateExam from "./UpdateExam";

import "../../../../assets/css/Dashboard/Lecturer/Exam/Exams.css";



export default function Exams({ setPage }) {

    const { authToken, updateAuthToken } = useAuthToken();
    const axiosInstance = useAxios(authToken, updateAuthToken);
    const { user, error, setError, success, setSuccess } = useContext(AuthContext)

    const [data, setData] = useState(null)



    const getExams = ()=>{
      axiosInstance.get('/api/exams/',{
        params: {
          lecturer_id: user.user_id,
        },
      })
        .then((response)=>{
          const response_data = response.data
          setData(()=>response_data.map((record)=>{
            return {
              course_name: record.course_name,
              num_questions: record.num_questions,
              total_degree: record.total_degree,
              exam_duration: record.duration,
              exam_date: record.exam_date,
              exam_time: record.exam_time,
              is_final: record.is_final,
              actions: (
                <div className="w-100">
                  <button className="btn btn-primary rounded-0 me-2 text-light" data-bs-toggle="modal" data-bs-target={`#${record.id}`}>Edit</button>
                  <div className="modal fade" id={record.id} tabIndex="-1" role="dialog" aria-labelledby={`${record.id}Label`} aria-hidden="true">
                    <div className="modal-dialog modal-dialog-edit mw-100" role="document">
                      <div className="modal-content">
                        <div className="modal-body">
                          <UpdateExam examEditURL={record.actions.edit} getExams={getExams} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <button className="btn btn-danger rounded-0" data-bs-toggle="modal" data-bs-target={`#${record.id}_delete`}>Delete</button>
                  <div className="modal fade" id={`${record.id}_delete`} tabIndex="-1" role="dialog" aria-labelledby={`${record.id}DeleteLabel`} aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                      <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title text-warning">Warning</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                          </div>
                        <div className="modal-body">
                          <p>Are You sure you want to delete this Exam</p>
                        </div>
                        <div className="modal-footer">
                          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                          <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={()=>{deleteExam(record.actions.delete)}}>Delete</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            }
          }))
        })
        .catch((error=>{
          setError(`Couldn't fetch Exams : ${error.response.data.error}`)
        }))
    }

    const deleteExam = (delete_url)=>{
      axiosInstance.delete(delete_url).then((response)=>{
        setSuccess("Course Deleted Successfully")
      })
      .then(()=>{
        getExams()
      })
      .catch((error)=>{
        setError("An Error Occured while deleting the course: ", error)
      })
    }


  useEffect(() => {
    setError("")
    setSuccess("")
    getExams()
  }, [])
  

    // const data = [
    //     {
    //       course_name: "Mathematics",
    //       exam_duration: "2 hours",
    //       exam_date: "2023-09-15",
    //       exam_time: "12:00 PM",
    //       actions: (
    //         <div>
    //           <button className="btn btn-primary rounded-0 me-2 text-light">Edit</button>
    //           <button className="btn btn-danger rounded-0">Delete</button>
    //         </div>
    //       ),
    //     },
    //     {
    //       course_name: "Physics",
    //       exam_duration: "1.5 hours",
    //       exam_date: "2023-09-20",
    //       exam_time: "7:00 AM",
    //       actions: (
    //         <div>
    //           <button className="btn btn-primary rounded-0 me-2 text-light">Edit</button>
    //           <button className="btn btn-danger rounded-0">Delete</button>
    //         </div>
    //       ),
    //     },
    // ]

    const columns = useMemo(
        () => [
          {
            accessorKey: "is_final",
            header: "Status",
            Cell: ({ cell }) => (
              <Box
                component="span"
                sx={(theme) => ({
                  backgroundColor:
                    cell.getValue() === false
                      ? theme.palette.info.dark
                      : theme.palette.warning.dark,
                  borderRadius: '0.25rem',
                  color: '#fff',
                  maxWidth: '9ch',
                  p: '0.25rem',
                })}
              >
                {cell.getValue()? "Final" : "Not Final"}
              </Box>
            )
          },
        {
            accessorKey: "course_name",
            header: "Course Name",
        },
        {
            accessorKey: "num_questions",
            header: "Number Of Questions",
        },
        {
            accessorKey: "total_degree",
            header: "Total Degree",
        },
        {
            accessorKey: "exam_duration",
            header: "Exam Duration",
        },
        {
            accessorKey: "exam_date",
            header: "Exam Date",
        },
        {
            accessorKey: "exam_time",
            header: "Exam Time",
        },
        {
            accessorKey: "actions",
            header: "Delete/Edit Exam",
            enableSorting: false, // Disable sorting for this column
            enableColumnFilter: false, // Disable filtering for this column
        },
        ],
        []
    );


  return (
    <>
    {data &&
      <div id="exams">
        <h1 className="gradient-text text-center text-uppercase">Exams</h1>
        {success && (
            <div className="alert alert-success text-center" role="alert">
                {success}
            </div>
        )}
        {error && (
            <div className="alert alert-danger" role="alert">
                {error}
            </div>
        )}
        <div id="exams-table-container">
          <button
            onClick={() => {
              setPage("addExam");
            }}
          >
            Add Exam
          </button>
          <MaterialReactTable columns={columns} data={data} enableColumnOrdering />
        </div>
      </div> 
    }
    </>
  );
}