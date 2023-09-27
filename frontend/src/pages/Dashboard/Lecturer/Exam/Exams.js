import { useMemo } from "react";

import { MaterialReactTable } from "material-react-table";

import "../../../../assets/css/Dashboard/Lecturer/Exam/Exams.css";

export default function Exams({ setPage }) {

    const data = [
        {
          course_name: "Mathematics",
          exam_duration: "2 hours",
          exam_date: "2023-09-15",
          exam_time: "12:00 PM",
          actions: (
            <div>
              <button className="btn btn-primary rounded-0 me-2 text-light">Edit</button>
              <button className="btn btn-danger rounded-0">Delete</button>
            </div>
          ),
        },
        {
          course_name: "Physics",
          exam_duration: "1.5 hours",
          exam_date: "2023-09-20",
          exam_time: "7:00 AM",
          actions: (
            <div>
              <button className="btn btn-primary rounded-0 me-2 text-light">Edit</button>
              <button className="btn btn-danger rounded-0">Delete</button>
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
            header: "Delete/Edit Exam",
            enableSorting: false, // Disable sorting for this column
            enableColumnFilter: false, // Disable filtering for this column
        },
        ],
        []
    );


  return (
    <div id="exams">
      <h1 className="gradient-text text-center text-uppercase">Exams</h1>
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
  );
}