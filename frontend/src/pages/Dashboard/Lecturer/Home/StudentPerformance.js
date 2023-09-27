import React from 'react';
import { Pie } from 'react-chartjs-2';
// eslint-disable-next-line
import { Chart as ChartJS} from "chart.js/auto"


export default function ExamScheduleOverview({studentPerformanceData}) {


    const options = {
        // maintainAspectRatio: false,
        responsive: true,
        indexAxis: 'x',
        scales: {
            x: {
                display: false,
                grid: {
                    display: false, // Hide x-axis grid lines
                },
                ticks: {
                    display: false,
                },
            },
            y: {
                display: false,
                grid: {
                    display: false, // Hide y-axis grid lines
                },
                ticks: {
                    display: false,
                },
            },
        },
        plugins: {
            legend: {
                position: 'top',
            },
        },
    };

    return (
        <>
        <h2>Student Performance</h2>
        <Pie
            className='chart'
            data={studentPerformanceData} 
            options={options}
        />
    </>
    );
};