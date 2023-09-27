import { Line } from 'react-chartjs-2';
// eslint-disable-next-line
import { Chart as ChartJS} from "chart.js/auto"

export default function GPAProgress({gpaProgressData}){
    const chartCallback = (chart) => {
        const ctx = chart.ctx;

        const gradientFill1 = ctx.createLinearGradient(0, 0, 0, 300);
        gradientFill1.addColorStop(0, 'rgb(39, 165, 39)');
        gradientFill1.addColorStop(0.5, 'rgba(96, 120, 234)');
        gradientFill1.addColorStop(1, 'rgba(188, 78, 156)');

        chart.data.datasets[0].backgroundColor = gradientFill1;
    };


    const options = {
        maintainAspectRatio: true,
        aspectRatio: window.innerWidth >= 425?4:2,
        responsive: true,
        indexAxis: 'x',
        scales: {
            x: {
              display: true,
            },
            y: {
              display: true,
            },
          },
          plugins: {
            legend: {
              display: false,
			      labels: {
                boxWidth:40
              }
            },
            tooltips: {
			        displayColors:false
            }
        },
        elements: {
            line: {
                tension: 0.4, // Adjust the tension for smoother curves
            },
        },
    }
    

  return (
    <>
        <h2>GPA Progress</h2>
        <Line id='passed-students'
            data={gpaProgressData}
            options={options}
            plugins={[{
                beforeInit: chartCallback
            }]}
        />
    </>
  );
}