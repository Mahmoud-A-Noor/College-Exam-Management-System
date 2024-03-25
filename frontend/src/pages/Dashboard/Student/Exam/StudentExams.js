import { useState, useMemo, useContext, useEffect } from "react"

import useAuthToken from '../../../../hooks/useAuthToken'
import useAxios from '../../../../hooks/useAxios'
import AuthContext from '../../../../context/AuthContext'

import ExamQuestions from "./ExamQuestions"

import { MaterialReactTable } from "material-react-table";
import Box from '@mui/material/Box';
import dayjs from "dayjs"

import "../../../../assets/css/Dashboard/Student/StudentExams.css"

export default function StudentExams(){
  const { authToken, updateAuthToken } = useAuthToken();
  const axiosInstance = useAxios(authToken, updateAuthToken);
  const { user } = useContext(AuthContext)

    const [enteredExam, setEnteredExam] = useState(false)
    const [data, setData] = useState(null)
    const [examId, setExamId] = useState(null)


    const getTodayExams = ()=>{
      axiosInstance.get('/api/exams/today-exams/',{
        params: {
          student_id: user.user_id,
        },
      }).then((response)=>{
        const response_data = response.data
        setData(response_data.map((record)=>{
          return {
            course_name: record.course_name,
            exam_duration: record.duration,
            exam_date: record.exam_date,
            exam_time: record.exam_time,
            is_final: record.is_final,
            number_of_questions: record.number_of_questions,
            total_degree: record.total_degree,
            actions: (
              <div>
                <button className={record.exam_attempt_exists?"btn btn-secondary rounded-0 me-2 text-light":"btn btn-success rounded-0 me-2 text-light"} onClick={()=>{
                  handleStartExam(record.exam_id)
                }} disabled={record.exam_attempt_exists}>{record.exam_attempt_exists?"Exam Was Entered":"Start Exam"}</button>
              </div>
            ),
          }
        }))
      })
    }

    useEffect(()=>{
      getTodayExams()
    },[])
    

    const handleStartExam = (exam_id)=>{
      setExamId(exam_id)
      setEnteredExam(true)
    }


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
          // {
          //     accessorKey: "number_of_questions",
          //     header: "Number Of Questions",
          // },
          // {
          //     accessorKey: "exam_date",
          //     header: "Exam Date",
          // },
          {
              accessorKey: "exam_time",
              header: "Exam Start Time",
              Cell: ({ cell }) =>{
                return (
                  <Box>
                    {
                      dayjs(cell.getValue(), "HH:mm:ss.SSSSSS").format("h:mm A")
                    }
                  </Box>
                )
              }
          },
          {
              accessorKey: "exam_duration",
              header: "Exam Duration",
          },
          {
              accessorKey: "total_degree",
              header: "Total Degree",
          },
          {
              accessorKey: "actions",
              header: "Actions",
              enableSorting: false, 
              enableColumnFilter: false,
          },
        ],
      []
    );

    return(
        <div id="student-exams">
          {enteredExam ? (
            <ExamQuestions exam_id={examId} setEnteredExam={setEnteredExam} getTodayExams={getTodayExams} />
          ) : (
            <>
              { data &&
                <>
                  <h1 className="gradient-text text-center text-uppercase">Today's Exams</h1>
                  <MaterialReactTable columns={columns} data={data} />
                </>
              }
            </>
            )
          }
      </div>
    )
}