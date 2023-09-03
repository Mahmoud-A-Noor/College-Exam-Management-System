import { useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
// eslint-disable-next-line
import { Chart as ChartJS} from "chart.js/auto"

const StudentCoursePerformance = ({studentCoursePerformanceData}) => {

    useEffect(() => {
        const sum = studentCoursePerformanceData.datasets[0].data.reduce((acc, val) => acc + val, 0);
        const max_custom_average = (sum / studentCoursePerformanceData.datasets[0].data.length)+Math.min(...studentCoursePerformanceData.datasets[0].data);
        const min_custom_average = (sum / studentCoursePerformanceData.datasets[0].data.length)-Math.min(...studentCoursePerformanceData.datasets[0].data);
    
        const colors = studentCoursePerformanceData.datasets[0].data.map((value) => {
            if (value > max_custom_average) {
                return "rgba(0, 21, 234, 0.7)"
            } else if (value < min_custom_average) {
                return "rgba(219, 0, 36, 0.7)"
            } else {
                return "rgba(0, 167, 88, 0.7)"
            }
        });
        studentCoursePerformanceData.datasets[0].backgroundColor = colors;
        // eslint-disable-next-line
    }, [])

    const options = {
        maintainAspectRatio: true,
        aspectRatio: window.innerWidth >= 425?4:2,
        responsive: true,
        indexAxis: 'y',
        scales: {
            x: {
              display: true, // Hide x-axis
            },
            y: {
              ticks: {
                display: true, // Hide y-axis ticks
              },
            },
          },
          plugins: {
            legend: {
              display: false, // Hide legend
            },
          },
    }
    

  return (
    <>
        <h2>Student Performance Per Course</h2>
        <Bar id="student-subject-performance"
            className='chart'
            data={studentCoursePerformanceData} 
            options={options}
        />
    </>
  );
};

export default StudentCoursePerformance;