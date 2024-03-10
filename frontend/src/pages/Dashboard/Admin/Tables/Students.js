import React from "react";
import { useMemo, useState, useEffect, useContext } from "react";

import { MaterialReactTable } from "material-react-table";

import useAuthToken from '../../../../hooks/useAuthToken'
import useAxios from '../../../../hooks/useAxios'
import AuthContext from '../../../../context/AuthContext';

import "../../../../assets/css/Dashboard/Admin/Students.css";

export default function Lecturers({ setPage, setUserType }) {

  const { authToken, updateAuthToken } = useAuthToken();
  const axiosInstance = useAxios(authToken, updateAuthToken);
  const { error, setError } = useContext(AuthContext)
  const [data, setData] = useState(null)

  useEffect(()=>{
    setError("")
    axiosInstance.get("/api/get-students").then((response)=>{
      const response_data = response.data
      setData(()=>response_data.map((record)=>{
        return {
          id: record.pk,
          first_name: record.fields.first_name,
          last_name: record.fields.last_name,
          address: record.fields.address,
          gender: record.fields.gender,
          phone_number: record.fields.phone_number,
          image: `http://127.0.0.1:8000/media/${record.fields.img}`,
          date_of_birth: record.fields.date_of_birth,
          date_joined: record.fields.date_joined
        }
      }))
    }).catch((error)=>{
      setError("Error fetching lecturers : ", error)
    })
  }, [])

  // const data = [
  //   {
  //     image: "http://127.0.0.1:8000/media/images/400x600_i97xEsX.png",
  //     first_name: "John",
  //     last_name: "Doe",
  //     address: "261 Erdman Ford",
  //     city: "East Daphne",
  //     state: "Kentucky",
  //   },
  //   {
  //     image: "http://127.0.0.1:8000/media/images/400x600_i97xEsX.png",
  //     first_name: "Jane",
  //     last_name: "Doe",
  //     address: "769 Dominic Grove",
  //     city: "Columbus",
  //     state: "Ohio",
  //   },
  //   {
  //     image: "http://127.0.0.1:8000/media/images/400x600_i97xEsX.png",
  //     first_name: "Joe",
  //     last_name: "Doe",
  //     address: "566 Brakus Inlet",
  //     city: "South Linda",
  //     state: "West Virginia",
  //   },
  //   {
  //     image: "http://127.0.0.1:8000/media/images/400x600_i97xEsX.png",
  //     first_name: "Dan",
  //     last_name: "Doe",
  //     address: "566 Brakus Inlet",
  //     city: "South Linda",
  //     state: "West Virginia",
  //   },
  // ];

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
        accessorKey: "phone_number",
        header: "Phone Number",
      },
      {
        accessorKey: "date_joined",
        header: "Date Joined",
      },
    ],
    []
  );

  return (
    <>
      {data && 
        <div id="students">
        <h1 className="gradient-text text-center text-uppercase">Students</h1>
        <div id="students-table-container">
          {error && (
            <div className="alert alert-danger" role="alert">
                {error}
            </div>
          )}
          <button onClick={()=>{
            setPage("addUser");
            setUserType("student");
          }}>Add Student</button>
          <MaterialReactTable
            columns={columns}
            data={data}
            enableColumnOrdering
          />
        </div>
      </div>
    }
    </>
  );
}