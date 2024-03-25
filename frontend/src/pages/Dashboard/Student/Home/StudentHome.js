import { useEffect, useState, useContext } from "react";

import useAuthToken from '../../../../hooks/useAuthToken'
import useAxios from '../../../../hooks/useAxios'
import AuthContext from '../../../../context/AuthContext'

import "../../../../assets/css/Dashboard/Student/StudentHome.css"

import InsightCards from "./InsightCards"
import SubjectPerformance from "./SubjectPerformance";
import GPAProgress from "./GPAProgress"
import StudentTranscript from "./StudentTranscript";

export default function StudentHome(){
  const { authToken, updateAuthToken } = useAuthToken();
  const axiosInstance = useAxios(authToken, updateAuthToken);
  const { user } = useContext(AuthContext)

  const [subjectPerformanceData, setSubjectPerformanceData] = useState(null)
  const [gpaProgressData, setGpaProgressData] = useState(null)
  const [studentTranscriptData, setStudentTranscriptData] = useState(null)
  const [studentInsightsData, setStudentInsightsData] = useState(null)


  useEffect(() => {
    const fetchData = async () => {
      try {
        const subjectPerformanceDataResponse = await axiosInstance.get('/api/subject-performance-data/',{
          params: {
            user_id: user.user_id,
          },
        });
        const gpaProgressDataResponse = await axiosInstance.get('/api/gpa-progress/',{
          params: {
            user_id: user.user_id,
          },
        });
        const studentTranscriptDataResponse = await axiosInstance.get('/api/student-transcript/',{
          params: {
            user_id: user.user_id,
          },
        });
        const studentInsightsDataResponse = await axiosInstance.get('/api/student-insights/',{
          params: {
            student_id: user.user_id,
          },
        });

        setSubjectPerformanceData(subjectPerformanceDataResponse.data);
        setGpaProgressData(gpaProgressDataResponse.data);
        setStudentTranscriptData(studentTranscriptDataResponse.data);
        setStudentInsightsData(studentInsightsDataResponse.data);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData()
  }, [])

    // const subjectPerformanceData = {
    //     labels: ["Course 1", "Course 2", "Course 3", "Course 4", "Course 5"],
    //     datasets: [
    //       {
    //         label: 'Your Scores',
    //         data: [70, 85, 90, 62, 54], // An array representing the student's scores in each subject
    //         backgroundColor: 'rgba(75, 192, 192, 0.6)',
    //       },
    //       {
    //         label: 'Average Scores',
    //         data: [60, 95, 80, 52, 84], // An array representing the average scores in each subject
    //         backgroundColor: 'rgba(255, 99, 132, 0.6)',
    //       },
    //     ],
    // };

    // const gpaProgressData = {
    //     labels: ['1st Year', '2nd Year', '3rd Year', '4th Year'],
    //     datasets: [
    //         {
    //             fill: true,
    //             label: "Student GPA",
    //             data: [3.2, 3.5, 2.9, 3.1], // number of passed students per semester
    //         }
    //     ]
    // };

    // const studentTranscriptData = {
    //     "studentInfo":{
    //         name: "Mahmoud Ahmed Noor Eldin",
    //         id: 20208209,
    //         gpa: 3.8,
    //         appreciation: "Excellent"
    //     },
    //     "data":[
    //         {
    //           year: "1st year",
    //           courses: [
    //             { courseName: "Math 101", degree: 95 },
    //             { courseName: "English 101", degree: 88 },
    //             { courseName: "History 101", degree: 42 },
    //           ],
    //         },
    //         {
    //           year: "2nd year",
    //           courses: [
    //             { courseName: "Science 101", degree: 78 },
    //             { courseName: "Computer Science 101", degree: 85 },
    //             { courseName: "Art 101", degree: 70 },
    //           ],
    //         },
    //         {
    //           year: "3rd year",
    //           courses: [
    //             { courseName: "Physics 101", degree: 96 },
    //             { courseName: "Chemistry 101", degree: 89 },
    //             { courseName: "Psychology 101", degree: 87 },
    //           ],
    //         },
    //       ]
    // };

    

    return (
        <>
        {subjectPerformanceData && gpaProgressData && studentTranscriptData && 
          <div id="student-home">
              <div className="row justify-content-center">
                  <InsightCards studentInsightsData={studentInsightsData} />
                  <nav className="d-flex justify-content-center">
                      <div className="nav nav-tabs" id="nav-tab" role="tablist">
                          <button className="nav-link reverse-gradient-text active" id="nav-gpa-progress-tab" data-bs-toggle="tab" data-bs-target="#nav-gpa-progress" type="button" role="tab" aria-controls="nav-gpa-progress" aria-selected="true">GPA Progress</button>
                          <button className="nav-link reverse-gradient-text" id="nav-subject-performance-tab" data-bs-toggle="tab" data-bs-target="#nav-subject-performance" type="button" role="tab" aria-controls="nav-subject-performance" aria-selected="false">Course performance</button>
                          <button className="nav-link gradient-text" id="nav-student-transcript-tab" data-bs-toggle="tab" data-bs-target="#nav-student-transcript" type="button" role="tab" aria-controls="nav-student-transcript" aria-selected="false">Student Transcript</button>
                      </div>
                  </nav>
                  <div className="tab-content d-flex justify-content-center" id="nav-tabContent">
                  <div className="tab-pane fade show active" id="nav-gpa-progress" role="tabpanel" aria-labelledby="nav-gpa-progress-tab" tabIndex="0">
                      <div className="chart-container">
                          <GPAProgress gpaProgressData={gpaProgressData} />
                      </div>
                  </div>
                  <div className="tab-pane fade" id="nav-subject-performance" role="tabpanel" aria-labelledby="nav-subject-performance-tab" tabIndex="0">
                      <div className="chart-container">
                          <SubjectPerformance subjectPerformanceData={subjectPerformanceData} />
                      </div>
                  </div>
                  <div className="tab-pane fade" id="nav-student-transcript" role="tabpanel" aria-labelledby="nav-student-transcript-tab" tabIndex="0">
                      <div className="chart-container">
                          <StudentTranscript studentTranscriptData={studentTranscriptData} />
                      </div>
                  </div>
                  </div>
              </div>
          </div>
        }
        </>
    )
}