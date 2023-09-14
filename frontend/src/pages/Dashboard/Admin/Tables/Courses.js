import { useMemo } from "react";

import { MaterialReactTable } from "material-react-table";

import "../../../../assets/css/Dashboard/Admin/Courses.css"


export default function Courses(){

    const data = [
        {
          course_name: "Mathematics",
          final_percentage: "60%",
          course_content: (
            <div>
              1. content1 <br />
              2. content2 <br />
              3. content3
            </div>
          ),
          actions: (
            <div>
              <button className="btn btn-primary rounded-0 me-2 text-light">Edit</button>
              <button className="btn btn-danger rounded-0">Delete</button>
            </div>
          ),
        },
        {
          course_name: "Physics",
          final_percentage: "50%",
          course_content: (
            <div>
              1. content1 <br />
              2. content2 <br />
              3. content3
            </div>
          ),
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
            accessorKey: "final_percentage",
            header: "Final Percentage",
        },
        {
            accessorKey: "course_content",
            header: "Course Content",
        },
        {
            accessorKey: "actions",
            header: "Delete/Edit Course",
            enableSorting: false, // Disable sorting for this column
            enableColumnFilter: false, // Disable filtering for this column
        },
        ],
        []
    );

    return (
        <div id="courses">
            <h1 className="gradient-text text-center text-uppercase">Courses</h1>
            <div id="courses-table-container">
                {/* <button
                onClick={() => {
                    setPage("addExam");
                }}
                >
                Add Exam
                </button> */}
                <MaterialReactTable columns={columns} data={data} enableColumnOrdering />
            </div>
        </div>
    )
}