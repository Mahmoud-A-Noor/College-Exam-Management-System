import { Line } from 'react-chartjs-2';
// eslint-disable-next-line
import { Chart as ChartJS} from "chart.js/auto"

const PassedStudents = ({passedStudentsData}) => {

    const chartCallback = (chart) => {
        const ctx = chart.ctx;

        const gradientFill1 = ctx.createLinearGradient(0, 0, 0, 300);
        gradientFill1.addColorStop(0, 'rgba(23, 234, 217)');
        gradientFill1.addColorStop(1, 'rgba(96, 120, 234)');

        const gradientFill2 = ctx.createLinearGradient(0, 0, 0, 300);
        gradientFill2.addColorStop(0, 'rgba(248, 7, 89)');
        gradientFill2.addColorStop(1, 'rgba(188, 78, 156)');

        chart.data.datasets[0].backgroundColor = gradientFill1;
        chart.data.datasets[1].backgroundColor = gradientFill2;
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
              display: true,
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
        <h2>Passed/Failed Students Per Semester</h2>
        <Line id='passed-students'
            data={passedStudentsData}
            options={options}
            plugins={[{
                beforeInit: chartCallback
            }]}
        />
    </>
  );
};

export default PassedStudents;