import { Bar } from 'react-chartjs-2';


export default function SubjectPerformance({subjectPerformanceData}){

    const options = {
        maintainAspectRatio: true,
        aspectRatio: window.innerWidth >= 425?4:2,
        responsive: true,
        indexAxis: 'x',
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
              display: true, // Hide legend
            },
        },
    } 

    return(
        <>
          {subjectPerformanceData && 
            <div>
                <h2>Course Performance</h2>
                <Bar data={subjectPerformanceData} options={options} />
            </div>
          }
        </>
    )
}