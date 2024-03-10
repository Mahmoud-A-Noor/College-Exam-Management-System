import { useState, useContext, useEffect } from "react";

import { MaterialReactTable } from "material-react-table";
import Box from '@mui/material/Box';
import useAuthToken from '../../../../hooks/useAuthToken'
import useAxios from '../../../../hooks/useAxios'
import AuthContext from '../../../../context/AuthContext';


import UpdateCourseModal from "./updateCourseModal";

import "../../../../assets/css/Dashboard/Admin/Courses.css"

export default function Courses({setPage}){

  const { authToken, updateAuthToken } = useAuthToken();
  const axiosInstance = useAxios(authToken, updateAuthToken);
  const { error, setError, success, setSuccess } = useContext(AuthContext)
  const [data, setData] = useState(null)

  const ContentComponent = ({ content }) => {
    return <div dangerouslySetInnerHTML={{ __html: content }} />;
  };

  const deleteCourse = (delete_url)=>{
    axiosInstance.delete(delete_url).then((response)=>{
      setSuccess("Course Deleted Successfully")
    }).catch((error)=>{
      setError("An Error Occured while deleting the course: ", error)
    })
  }

  useEffect(() => {
    setError("")
    axiosInstance.get('/api/get-lecturers-for-select/')
      .then(response => {
        return response.data
      }).then((data)=>{
        axiosInstance.get("api/courses/")
        .then((response)=>{
          if(response.data){
            const response_data = response.data
            setData(()=>response_data.map((record)=>{
              return {
                is_active: record.is_active,
                course_name: record.name,
                lecturer: record.lecturer_full_name,
                final_percentage: record.final_percentage,
                course_content: <ContentComponent content={record.content} />,
                actions: (
                  <div className="w-100">
                    <button className="btn btn-primary rounded-0 me-2 text-light" data-bs-toggle="modal" data-bs-target={`#${record.name}`}>Edit</button>
                    <div className="modal fade" id={record.name} tabIndex="-1" role="dialog" aria-labelledby={`${record.name}Label`} aria-hidden="true">
                      <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                          <div className="modal-body">
                            <UpdateCourseModal is_active={record.is_active} name={record.name} lecturer_id={record.lecturer} 
                              content={record.content} final_percentage={record.final_percentage} edit_url={record.actions.edit} 
                              setError={setError} setSuccess={setSuccess} lecturers={data}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <button className="btn btn-danger rounded-0" data-bs-toggle="modal" data-bs-target={`#${record.name}_delete`}>Delete</button>
                    <div className="modal fade" id={`${record.name}_delete`} tabIndex="-1" role="dialog" aria-labelledby={`${record.name}DeleteLabel`} aria-hidden="true">
                      <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                              <h5 className="modal-title text-warning">Warning</h5>
                              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                          <div className="modal-body">
                            <p>Are You sure you want to delete this Course</p>
                          </div>
                          <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={()=>{deleteCourse(record.actions.delete)}}>Delete</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              }
          }))
          }
        })
        .catch((error=>{
          setError(`Couldn't fetch Courses Data : ${error.response.data.error}`)
        }))
      })
      .catch(error => {
        setError('Error fetching lecturers:', error);
      });
  }, [success])



    // data = [
    //     {
    //       is_active: false,
    //       course_name: "Mathematics",
    //       lecturer: "ahmed",
    //       final_percentage: "60%",
    //       course_content: (
    //         <div>
    //           1. content1 <br />
    //           2. content2 <br />
    //           3. content3
    //         </div>
    //       ),
    //       actions: (
    //         <div>
    //           <button className="btn btn-primary rounded-0 me-2 text-light" onClick={handleEditModalOpen}>Edit</button>
    //           <Modal
    //             aria-labelledby="transition-modal-title"
    //             aria-describedby="transition-modal-description"
    //             open={openEditModal}
    //             onClose={handleEditModalClose}
    //             closeAfterTransition
    //             slots={{ backdrop: Backdrop }}
    //             slotProps={{
    //               backdrop: {
    //                 timeout: 500,
    //               },
    //             }}
    //           >
    //             <Fade in={openEditModal}>
    //               <Box sx={style}>
    //                 <UpdateCourseModal handleEditModalClose={handleEditModalClose} setError={setError} setSuccess={setSuccess} />
    //               </Box>
    //             </Fade>
    //           </Modal>
    //           <button className="btn btn-danger rounded-0">Delete</button>
    //         </div>
    //       ),
    //     },
    //     {
    //       is_active: true,
    //       course_name: "Physics",
    //       lecturer: "mahmoud",
    //       final_percentage: "50%",
    //       course_content: (
    //         <div>
    //           1. content1 <br />
    //           2. content2 <br />
    //           3. content3
    //         </div>
    //       ),
    //       actions: (
    //         <div>
    //           <button className="btn btn-primary rounded-0 me-2 text-light">Edit</button>
    //           <button className="btn btn-danger rounded-0">Delete</button>
    //         </div>
    //       ),
    //     },
    //   ]

    const columns = [
          {
              accessorKey: "is_active",
              header: "Status",
              Cell: ({ cell }) => (
                <Box
                  component="span"
                  sx={(theme) => ({
                    backgroundColor:
                      cell.getValue() === false
                        ? theme.palette.error.dark
                        : theme.palette.success.dark,
                    borderRadius: '0.25rem',
                    color: '#fff',
                    maxWidth: '9ch',
                    p: '0.25rem',
                  })}
                >
                  {cell.getValue()? "Active" : "Inactive"}
                </Box>
              )
            },
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
              accessorKey: "course_content",
              header: "Course Content"
          },
          {
              accessorKey: "actions",
              header: "Delete/Edit Course",
              enableSorting: false, // Disable sorting for this column
              enableColumnFilter: false, // Disable filtering for this column
          },
    ]

    return (
        <div id="courses">
          {
          data && 
          <>
            <h1 className="gradient-text text-center text-uppercase">Courses</h1>
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
            <div id="courses-table-container">
                <button
                onClick={() => {
                    setPage("addCourse");
                }}
                >
                Add Course
                </button>
                <MaterialReactTable columns={columns} data={data} enableColumnOrdering />
            </div>
          </>
          }
            
        </div>
    )
}