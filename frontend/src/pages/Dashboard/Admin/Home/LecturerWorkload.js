import { useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
// eslint-disable-next-line
import { Chart as ChartJS} from "chart.js/auto"

const LecturerWorkload = ({lecturerWorkloadData}) => {

    useEffect(() => {
      const data = lecturerWorkloadData.datasets[0].data;
      const sum = data.reduce((acc, val) => acc + val, 0);
  
      // Calculate the dynamic offset as a percentage (e.g., 10%) of the range of data values
      const range = Math.max(...data) - Math.min(...data);
      const offsetPercentage = 0.10; // You can adjust this percentage as needed
      const dynamicOffset = range * offsetPercentage;
  
      const max_custom_average = (sum / data.length) + dynamicOffset;
      const min_custom_average = (sum / data.length) - dynamicOffset;
    
        const colors = lecturerWorkloadData.datasets[0].data.map((value) => {
            if (value > max_custom_average) {
                return "rgba(248, 7, 89)"
            } else if (value < min_custom_average) {
                return "rgba(96, 120, 234)"
            } else {
                return "rgba(0, 167, 88)"
            }
        });
        lecturerWorkloadData.datasets[0].backgroundColor = colors;
        // eslint-disable-next-line
    }, [])

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
              display: false, // Hide legend
            },
          },
    }
    

  return (
    <>
        <h2>Lecturer Workload</h2>
        <Bar 
            data={lecturerWorkloadData} 
            options={options}
        />
    </>
  );
};

export default LecturerWorkload;