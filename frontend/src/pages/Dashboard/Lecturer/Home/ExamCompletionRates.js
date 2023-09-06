import { useEffect } from "react";
// eslint-disable-next-line
import { Chart as ChartJS} from "chart.js/auto"
import { Bar } from 'react-chartjs-2';


export default function ExamCompletionRates({examCompletionRatesData}){

    useEffect(() => {
        const colors = examCompletionRatesData.datasets[0].data.map((rate) => {
            if (rate >= 90) {
                return 'rgba(0, 167, 88)'; // Green for high completion rates
              } else if (rate >= 75) {
                return 'rgba(96, 120, 234)'; // Yellow for moderate completion rates
              } else {
                return 'rgba(248, 7, 89)'; // Red for low completion rates
              }
        });
        examCompletionRatesData.datasets[0].backgroundColor = colors;
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

    return(
        <div>
            <h2>Exam Completion Rate</h2>
            <Bar data={examCompletionRatesData} options={options} />
        </div>
    )
}