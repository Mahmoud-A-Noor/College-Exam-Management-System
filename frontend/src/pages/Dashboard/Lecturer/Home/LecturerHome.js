// eslint-disable-next-line
import { Chart as ChartJS} from "chart.js/auto"

import { useEffect, useState, useContext } from "react";

import InsightCards from "./InsightCards";
import ExamCompletionRates from "./ExamCompletionRates";
import ExamPerformance from "./ExamPerformance";
import StudentPerformance from "./StudentPerformance";

import useAuthToken from '../../../../hooks/useAuthToken'
import useAxios from '../../../../hooks/useAxios'
import AuthContext from '../../../../context/AuthContext'

import "../../../../assets/css/Dashboard/Lecturer/LecturerHome.css"


export default function LecturerHome(){
    const { authToken, updateAuthToken } = useAuthToken();
    const axiosInstance = useAxios(authToken, updateAuthToken);
    const { user } = useContext(AuthContext)

    const [examCompletionRatesData, setExamCompletionRatesData] = useState({
      labels: [],
      datasets: [
          {
              label: 'Completion Rate',
              data: [],
          },
      ],
    });
    const [examPerformanceData, setExamPerformanceData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Average Students scores Per Exam',
                data: [],
            },
        ],
    });
    const [studentPerformanceData, setStudentPerformanceData] = useState({
        labels: ["Excellent", "Very Good", "Good", "Average", "Below Average"],
        datasets: [
            {
                data: [], // number of students that have taken exams of this lecturer for each category
                backgroundColor: ['#4CAF50', '#8BC34A', '#FFC107', '#FF9800', '#F44336'],
            },
        ],
    });
    const [lecturerInsights, setLecturerInsights] = useState({})

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

    useEffect(() => {
      const fetchData = async () => {
        try {
          const examCompletionRatesResponse = await axiosInstance.get('/api/exam-completion-rates/');
          const examPerformanceResponse = await axiosInstance.get('/api/exam-performance-data/');
          const studentPerformanceResponse = await axiosInstance.get('/api/student-performance-data/');
          const lecturerInsightsResponse = await axiosInstance.get('/api/lecturer-insights/',{
            params: {
              lecturer_id: user.user_id,
            },
          });

          setExamCompletionRatesData(prevState => ({
              ...prevState,
              labels: examCompletionRatesResponse.data.labels,
              datasets: [{
                  label: 'Completion Rate',
                  data: examCompletionRatesResponse.data,
              }],
          }));
          setExamPerformanceData(prevState => ({
            ...prevState,
            labels: examPerformanceResponse.data.labels,
            datasets: [{
                label: 'Average Students scores Per Exam',
                data: examPerformanceResponse.data,
            }],
          }));
          setStudentPerformanceData(prevState => ({
            ...prevState,
            datasets: [{
                data: studentPerformanceResponse.data,
                backgroundColor: ['#4CAF50', '#8BC34A', '#FFC107', '#FF9800', '#F44336']
            }],
          }));
          setLecturerInsights(lecturerInsightsResponse.data)

        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, []);

    // const examCompletionRatesData = {
    //   labels: ['Exam 1', 'Exam 2', 'Exam 3', 'Exam 4', 'Exam 5'], // Add your exam names here
    //   datasets: [
    //     {
    //       label: 'Completion Rate',
    //       data: [85, 92, 78, 60, 95], // Add your completion rate data here (percentage)
    //       // backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 206, 86, 0.6)', 'rgba(255, 99, 132, 0.6)'],
    //     },
    //   ],
    // }

    // const examPerformanceData = {
    //   labels: ['Exam 1', 'Exam 2', 'Exam 3', 'Exam 4', 'Exam 5', 'Exam 6', 'Exam 7'], // Add your semester labels here
    //   datasets: [
    //     {
    //       label: 'Average Students scores Per Exam',
    //       data: [45, 100, 70, 50, 90, 57, 63], 
    //     },
    //   ],
    // }

    // const studentPerformanceData = {
    //   labels: ["Excellent", "Very Good", "Good", "Average", "Below Average"],
    //   datasets: [
    //     {
    //       data: [30, 45, 60, 40, 25], // number of students that have taken exams of this lecturer for each category
    //       backgroundColor: ['#4CAF50', '#8BC34A', '#FFC107', '#FF9800', '#F44336'],
    //     },
    //   ],
    // }

    return (
      <div id="lecturer-home">
        <div className="row justify-content-center">
            <InsightCards lecturerInsights={lecturerInsights} />
            <nav className="d-flex justify-content-center">
              <div className="nav nav-tabs" id="nav-tab" role="tablist">
                <button className="nav-link reverse-gradient-text active" id="nav-student-performance-tab" data-bs-toggle="tab" data-bs-target="#nav-student-performance" type="button" role="tab" aria-controls="nav-student-performance" aria-selected="true">Student Performance</button>
                <button className="nav-link reverse-gradient-text" id="nav-exam-performance-tab" data-bs-toggle="tab" data-bs-target="#nav-exam-performance" type="button" role="tab" aria-controls="nav-exam-performance" aria-selected="false">Exam performance</button>
                <button className="nav-link gradient-text" id="nav-exam-completion-rate-tab" data-bs-toggle="tab" data-bs-target="#nav-exam-completion-rate" type="button" role="tab" aria-controls="nav-exam-completion-rate" aria-selected="false">Exam Completion Rate</button>
              </div>
            </nav>
            <div className="tab-content d-flex justify-content-center" id="nav-tabContent">
              <div className="tab-pane fade show active" id="nav-student-performance" role="tabpanel" aria-labelledby="nav-student-performance-tab" tabIndex="0">
                <div className="pie-chart-container">
                  <StudentPerformance studentPerformanceData={studentPerformanceData} />
                </div>
              </div>
              <div className="tab-pane fade" id="nav-exam-performance" role="tabpanel" aria-labelledby="nav-exam-performance-tab" tabIndex="0">
                <div className="chart-container">
                  <ExamPerformance examPerformanceData={examPerformanceData} />
                </div>
              </div>
              <div className="tab-pane fade" id="nav-exam-completion-rate" role="tabpanel" aria-labelledby="nav-exam-completion-rate-tab" tabIndex="0">
                <div className="chart-container">
                  <ExamCompletionRates examCompletionRatesData={examCompletionRatesData} />
                </div>
              </div>
            </div>
          </div>                 
        </div>
    )
}