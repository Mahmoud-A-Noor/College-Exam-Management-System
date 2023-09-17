import { useMemo } from "react";

import { MaterialReactTable } from "material-react-table";

import "../../../assets/css/Dashboard/Lecturer/Courses.css"


export default function Courses(){

    const data = [
        {
          course_name: "Mathematics",
          course_content: (
            <div>
              1. content1 <br />
              2. content2 <br />
              3. content3
            </div>
          ),
          year: "1st year",
          final_percentage: "70%",
        },
        {
          course_name: "History",
          course_content: (
            <div>
              1. content1 <br />
              2. content2 <br />
              3. content3
            </div>
          ),
          year: "3rd year",
          final_percentage: "50%",
        },
      ]

    const columns = useMemo(
        () => [
        {
            accessorKey: "course_name",
            header: "Course Name",
        },
        {
            accessorKey: "course_content",
            header: "Course Content",
        },
        {
            accessorKey: "year",
            header: "Course Year",
        },
        {
            accessorKey: "final_percentage",
            header: "Course Final Exam Percentage",
        },
        ],
        []
    );

    return (
        <div id="lecturer-courses">
            <h1 className="gradient-text text-center text-uppercase">Courses</h1>
            <MaterialReactTable columns={columns} data={data} enableColumnOrdering />
        </div>
    )
}