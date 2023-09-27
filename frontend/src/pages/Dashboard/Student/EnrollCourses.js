import { useState, useEffect, useMemo } from "react";

import { MaterialReactTable } from "material-react-table";

import "../../../assets/css/Dashboard/Student/EnrollCourses.css"

export default function EnrollCourses(){

    const [rowSelection, setRowSelection] = useState({});
    const [selectedCourseNames, setSelectedCourseNames] = useState([]);

    console.log(selectedCourseNames)
    console.log(rowSelection)
  
    const data = [
      {
        course_name: "Mathematics",
      },
      {
        course_name: "Physics",
      },
    ];
  
    const columns = useMemo(
      () => [
        {
          accessorKey: "course_name",
          header: "Course Name",
        },
      ],
      []
    );
  

    useEffect(() => {
      const selectedNames = data
      .filter((_, index) => rowSelection[index])
      .map((row) => row.course_name);

      setSelectedCourseNames(selectedNames);
      }, [rowSelection]);

    return(
        <div id="enroll-courses">
            <h1 className="gradient-text text-center text-uppercase">Enroll Courses</h1>
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
                  >
                    Enroll Courses
                  </button>
                </div>
              </div>
        </div>
    )
}