// eslint-disable-next-line
import { Chart as ChartJS} from "chart.js/auto"
import { useEffect, useState } from "react";


import InsightCards from "./InsightCards";
import PassedStudents from "./PassedStudents";
import PassedStudentCourseRatio from "./PassedStudentCourseRatio";
import StudentCoursePerformance from "./StudentCoursePerformance";
import LecturerWorkload from "./LecturerWorkload";

import useAuthToken from '../../../../hooks/useAuthToken'
import useAxios from '../../../../hooks/useAxios'

import "../../../../assets/css/Dashboard/Admin/AdminHome.css"


export default function AdminHome(){
  const { authToken, updateAuthToken } = useAuthToken();
  const axiosInstance = useAxios(authToken, updateAuthToken);

  const [studentCoursePerformanceData, setStudentCoursePerformanceData] = useState({
      labels: [], // Add your lecturer names here
      datasets: [
        {
          label: 'Average Students scores Per Course',
          data: [], // average students scores per subject
        },
      ],});
  const [passedStudentsData, setPassedStudentsData] = useState({
      labels: [],
      datasets: [
          {
            fill: true,
            label: "Passed Students",
            data: [], // number of passed students per semester
          },
          {
            fill: true,
            label: "Failed Students",
            data: [], // number of failed students per semester
          }
      ]
    });
  const [passedStudentCourseRatioData, setPassedStudentCourseRatioData] = useState({
      labels: [], 
      datasets: [
          {
              label: "Passed Student/Course Ratio",
              data: [], // passed students/total students per subject
          }
      ]
    });
  const [lecturerWorkloadData, setLecturerWorkloadData] = useState({
      labels: [], // Add your lecturer names here
      datasets: [
        {
          label: 'Number of Exams Per Lecturer',
          data: [], // Add the number of exams per lecturer here
        },
      ],
    });
  const [insightsCountData, setInsightsCountData] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentCoursePerformanceResponse = await axiosInstance.get('/api/student-course-performance/');
        const passedStudentsResponse = await axiosInstance.get('/api/passed-students/');
        const passedStudentCourseRatioResponse = await axiosInstance.get('/api/passed-student-course-ratio/');
        const lecturerWorkloadResponse = await axiosInstance.get('/api/lecturer-workload/');
        const insightsCountResponse = await axiosInstance.get('/api/insights-counts/');

        setStudentCoursePerformanceData(studentCoursePerformanceResponse.data);
        setPassedStudentsData(passedStudentsResponse.data);
        setPassedStudentCourseRatioData(passedStudentCourseRatioResponse.data);
        setLecturerWorkloadData(lecturerWorkloadResponse.data);
        setInsightsCountData(insightsCountResponse.data)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  // const UserData = [
  //     {
  //       id: 1,
  //       year: 2016,
  //       userGain: 80000,
  //       userLost: 823
  //     },
  //     {
  //       id: 2,
  //       year: 2017,
  //       userGain: 45677,
  //       userLost: 345
  //     },
  //     {
  //       id: 3,
  //       year: 2018,
  //       userGain: 78888,
  //       userLost: 555
  //     },
  //     {
  //       id: 4,
  //       year: 2019,
  //       userGain: 90000,
  //       userLost: 4555
  //     },
  //     {
  //       id: 5,
  //       year: 2020,
  //       userGain: 4300,
  //       userLost: 234
  //     }
  //   ];

  // const formattedData = {
  //     labels: UserData.map((data) => data.year), 
  //     datasets: [
  //         {
  //             label: "Users Gained ",
  //             data: UserData.map((data) => data.userGain),
  //             backgroundColor: [
  //             "rgba(75,192,192,1)",
  //             "#ecf0f1",
  //             "#50AF95",
  //             "#f3ba2f",
  //             "#2a71d0"
  //             ],
  //             borderColor: "black",
  //             borderWidth: 2
  //         }
  //     ]
  // }

  // studentCoursePerformanceData = {
  //   labels: ['Course 1', 'Course 2', 'Course 3', 'Course 4', 'Course 5', 'Course 6', 'Course 7', 'Course 8', ], // Add your lecturer names here
  //   datasets: [
  //     {
  //       label: 'Average Students scores Per Course',
  //       data: [10, 8, 12, 7, 3, 5, 10, 15], // average students scores per subject
  //     },
  //   ],
  // }

  // passedStudentsData = {
  //   labels: ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th'],
  //   datasets: [
  //       {
  //         fill: true,
  //         label: "Passed Students",
  //         data: [0, 30, 60, 25, 60, 25, 50, 0], // number of passed students per semester
  //       },
  //       {
  //         fill: true,
  //         label: "Failed Students",
  //         data: [25, 50, 25, 50, 25, 50, 25, 50], // number of failed students per semester
  //       }
  //   ]
  // }

  // passedStudentCourseRatioData = {
  //   labels: ["Course 1", "Course 2", "Course 3","Course 4", "Course 5"], 
  //   datasets: [
  //       {
  //           label: "Passed Student/Course Ratio",
  //           data: [0.9, 0.3, 0.7, 0.5, 1], // passed students/total students per subject
  //       }
  //   ]
  // }
  
  // lecturerWorkloadData = {
  //   labels: ['Lecturer A', 'Lecturer B', 'Lecturer C', 'Lecturer D', 'Lecturer E', 'Lecturer F', 'Lecturer G', 'Lecturer H'], // Add your lecturer names here
  //   datasets: [
  //     {
  //       label: 'Number of Exams Per Lecturer',
  //       data: [10, 8, 12, 7, 3, 5, 10, 15], // Add the number of exams per lecturer here
  //     },
  //   ],
  // };

    return (
        <div id="admin-home">
            <div className="row justify-content-center">
              <InsightCards insightsCountData={insightsCountData} />
              <nav className="d-flex justify-content-center">
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                  <button className="nav-link gradient-text active" id="nav-passed-failed-students-tab" data-bs-toggle="tab" data-bs-target="#nav-passed-failed-students" type="button" role="tab" aria-controls="nav-passed-failed-students" aria-selected="true">Passed/Failed Students</button>
                  <button className="nav-link reverse-gradient-text" id="nav-student-performance-tab" data-bs-toggle="tab" data-bs-target="#nav-student-performance" type="button" role="tab" aria-controls="nav-student-performance" aria-selected="false">Student Performance</button>
                  <button className="nav-link gradient-text" id="nav-passed-student-subject-ratio-tab" data-bs-toggle="tab" data-bs-target="#nav-passed-student-subject-ratio" type="button" role="tab" aria-controls="nav-passed-student-subject-ratio" aria-selected="false">Passed-Student/Course Ratio</button>
                  <button className="nav-link reverse-gradient-text" id="nav-lecturer-workload-tab" data-bs-toggle="tab" data-bs-target="#nav-lecturer-workload" type="button" role="tab" aria-controls="nav-lecturer-workload" aria-selected="false">Lecturer Workload</button>
                </div>
              </nav>
              <div className="tab-content d-flex justify-content-center" id="nav-tabContent">
                <div className="tab-pane fade show active" id="nav-passed-failed-students" role="tabpanel" aria-labelledby="nav-passed-failed-students-tab" tabIndex="0">
                  <div className="chart-container">
                    <PassedStudents passedStudentsData={passedStudentsData} />
                  </div>
                </div>
                <div className="tab-pane fade" id="nav-student-performance" role="tabpanel" aria-labelledby="nav-student-performance-tab" tabIndex="0">
                  <div className="chart-container">
                    <StudentCoursePerformance studentCoursePerformanceData={studentCoursePerformanceData} />
                  </div>
                </div>
                <div className="tab-pane fade" id="nav-passed-student-subject-ratio" role="tabpanel" aria-labelledby="nav-passed-student-subject-ratio-tab" tabIndex="0">
                  <div className="pie-chart-container">
                    <PassedStudentCourseRatio passedStudentCourseRatioData={passedStudentCourseRatioData} />
                  </div>
                </div>
                <div className="tab-pane fade" id="nav-lecturer-workload" role="tabpanel" aria-labelledby="nav-lecturer-workload-tab" tabIndex="0">
                  <div className="chart-container">
                    <LecturerWorkload lecturerWorkloadData={lecturerWorkloadData} />
                  </div>
                </div>
              </div>
            </div>            
        </div>
    )
}