import { useState, useMemo } from "react"

import ExamQuestions from "./ExamQuestions"

import { MaterialReactTable } from "material-react-table";

import "../../../../assets/css/Dashboard/Student/StudentExams.css"

export default function StudentExams(){

    const [enteredExam, setEnteredExam] = useState(false)
    // const [examId, setExamId] = useState()

    

    const handleStartExam = ()=>{
      setEnteredExam(true)
    }

    const data = [
        {
          course_name: "Mathematics",
          exam_duration: "2 hours",
          exam_time: "12:00 PM",
          actions: (
            <div>
              <button className="btn btn-success rounded-0 me-2 text-light" onClick={handleStartExam}>Start Exam</button>
            </div>
          ),
        },
        {
          course_name: "Physics",
          exam_duration: "1.5 hours",
          exam_time: "7:00 AM",
          actions: (
            <div>
              <button className="btn btn-success rounded-0 me-2 text-light" onClick={handleStartExam}>Start Exam</button>
            </div>
          ),
        },
    ]

    const columns = useMemo(
        () => [
          {
              accessorKey: "course_name",
              header: "Course Name",
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
            <ExamQuestions exam_id={1} />
          ) : (
            <>
              <h1 className="gradient-text text-center text-uppercase">Today's Exams</h1>
              <MaterialReactTable columns={columns} data={data} />
            </>
          )}
      </div>
    )
}