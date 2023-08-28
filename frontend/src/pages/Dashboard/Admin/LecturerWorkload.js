import { useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
// eslint-disable-next-line
import { Chart as ChartJS} from "chart.js/auto"

const LecturerWorkload = ({lecturerWorloadData}) => {

    useEffect(() => {
        const sum = lecturerWorloadData.datasets[0].data.reduce((acc, val) => acc + val, 0);
        const max_custom_average = (sum / lecturerWorloadData.datasets[0].data.length)+Math.min(...lecturerWorloadData.datasets[0].data);
        const min_custom_average = (sum / lecturerWorloadData.datasets[0].data.length)-Math.min(...lecturerWorloadData.datasets[0].data);
    
        const colors = lecturerWorloadData.datasets[0].data.map((value) => {
            if (value > max_custom_average) {
                return "rgba(248, 7, 89)"
            } else if (value < min_custom_average) {
                return "rgba(96, 120, 234)"
            } else {
                return "rgba(0, 167, 88)"
            }
        });
        lecturerWorloadData.datasets[0].backgroundColor = colors;
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
            data={lecturerWorloadData} 
            options={options}
        />
    </>
  );
};

export default LecturerWorkload;