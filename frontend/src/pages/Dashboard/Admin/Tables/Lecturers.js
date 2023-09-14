import React, { useMemo } from "react";
import { MaterialReactTable } from "material-react-table";

import "../../../../assets/css/Dashboard/Admin/Lecturers.css";

export default function Lecturers({ setPage, setUserType }) {
  const data = [
    {
      image: "http://127.0.0.1:8000/media/images/400x600_i97xEsX.png",
      first_name: "John",
      last_name: "Doe",
      address: "261 Erdman Ford",
      city: "East Daphne",
      state: "Kentucky",
    },
    {
      image: "http://127.0.0.1:8000/media/images/400x600_i97xEsX.png",
      first_name: "Jane",
      last_name: "Doe",
      address: "769 Dominic Grove",
      city: "Columbus",
      state: "Ohio",
    },
    {
      image: "http://127.0.0.1:8000/media/images/400x600_i97xEsX.png",
      first_name: "Joe",
      last_name: "Doe",
      address: "566 Brakus Inlet",
      city: "South Linda",
      state: "West Virginia",
    },
    {
      image: "http://127.0.0.1:8000/media/images/400x600_i97xEsX.png",
      first_name: "Dan",
      last_name: "Doe",
      address: "566 Brakus Inlet",
      city: "South Linda",
      state: "West Virginia",
    },
  ];

  const columns = useMemo(
    () => [
      // Custom image column
      {
        accessorKey: "image",
        header: "Image",
        Cell: ({ renderedCellValue }) => (
          <div>
            <img height={80} src={renderedCellValue} alt="" />
          </div>
        ),
        enableSorting: false, // Disable sorting for this column
        enableColumnFilter: false, // Disable filtering for this column
      },
      {
        accessorKey: "first_name",
        header: "First Name",
      },
      {
        accessorKey: "last_name",
        header: "Last Name",
      },
      {
        accessorKey: "address",
        header: "Address",
      },
      {
        accessorKey: "city",
        header: "City",
      },
      {
        accessorKey: "state",
        header: "State",
      },
    ],
    []
  );

  return (
    <div id="lecturers">
      <h1 className="gradient-text text-center text-uppercase">Lecturers</h1>
      <div id="lecturers-table-container">
        <button onClick={()=>{
          setPage("addUser");
          setUserType("lecturer");
        }}>Add Lecturer</button>
        <MaterialReactTable
          columns={columns}
          data={data}
          enableColumnOrdering
        />
      </div>
    </div>
  );
}