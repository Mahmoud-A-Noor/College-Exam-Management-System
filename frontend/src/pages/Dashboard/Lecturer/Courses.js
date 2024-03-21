import { useMemo, useContext, useState, useEffect } from "react";

import { MaterialReactTable } from "material-react-table";
import Box from '@mui/material/Box';

import useAuthToken from '../../../hooks/useAuthToken'
import useAxios from '../../../hooks/useAxios'
import AuthContext from '../../../context/AuthContext'

import "../../../assets/css/Dashboard/Lecturer/Courses.css"


export default function Courses(){
  const { authToken, updateAuthToken } = useAuthToken();
  const axiosInstance = useAxios(authToken, updateAuthToken);
  const { user, error, setError } = useContext(AuthContext)
  const [data, setData] = useState(null)

  const ContentComponent = ({ content }) => {
    return <div dangerouslySetInnerHTML={{ __html: content }} />;
  };

  useEffect(()=>{
    axiosInstance.get('/api/get-lecturer-courses/',{
      params: {
        lecturer_id: user.user_id,
      },
    }).then((response)=>{
      const response_data = response.data
      setData(()=>response_data.map((record)=>{
        return {
          is_active: record.is_active,
          course_name: record.name,
          final_percentage: record.final_percentage,
          course_content: <ContentComponent content={record.content} />,
        }
      }))
    }).catch((error)=>{
      setError("Error Loading Courses : ", error)
    })
  },[])

    // const data = [
    //     {
    //       course_name: "Mathematics",
    //       course_content: (
    //         <div>
    //           1. content1 <br />
    //           2. content2 <br />
    //           3. content3
    //         </div>
    //       ),
    //       year: "1st year",
    //       final_percentage: "70%",
    //     },
    //     {
    //       course_name: "History",
    //       course_content: (
    //         <div>
    //           1. content1 <br />
    //           2. content2 <br />
    //           3. content3
    //         </div>
    //       ),
    //       year: "3rd year",
    //       final_percentage: "50%",
    //     },
    //   ]

    const columns = useMemo(
        () => [
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
            accessorKey: "final_percentage",
            header: "Final Percentage",
        },
        {
            accessorKey: "course_content",
            header: "Course Content"
        },
        ],
        []
    );

    return (
        <>
        {data && 
          <div id="lecturer-courses">
              {error && (
                  <div className="alert alert-danger" role="alert">
                      {error}
                  </div>
              )}
              <h1 className="gradient-text text-center text-uppercase">Courses</h1>
              <MaterialReactTable columns={columns} data={data} enableColumnOrdering />
          </div>
        }
        </>
    )
}