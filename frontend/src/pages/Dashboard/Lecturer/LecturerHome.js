import { Bar, Line, Pie } from "react-chartjs-2";
// eslint-disable-next-line
import { Chart as ChartJS} from "chart.js/auto"

import "../../../assets/css/Dashboard/Lecturer/LecturerHome.css"


export default function LecturerHome(){

    const UserData = [
        {
          id: 1,
          year: 2016,
          userGain: 80000,
          userLost: 823
        },
        {
          id: 2,
          year: 2017,
          userGain: 45677,
          userLost: 345
        },
        {
          id: 3,
          year: 2018,
          userGain: 78888,
          userLost: 555
        },
        {
          id: 4,
          year: 2019,
          userGain: 90000,
          userLost: 4555
        },
        {
          id: 5,
          year: 2020,
          userGain: 4300,
          userLost: 234
        }
      ];

    const formattedData = {
        labels: UserData.map((data) => data.year), 
        datasets: [
            {
                label: "Users Gained ",
                data: UserData.map((data) => data.userGain),
                backgroundColor: [
                "rgba(75,192,192,1)",
                "#ecf0f1",
                "#50AF95",
                "#f3ba2f",
                "#2a71d0"
                ],
                borderColor: "black",
                borderWidth: 2
            }
        ]
    }

    return (
        <div id="lecturer-home">
            <div className="row">
                <div className="col-lg-4 col-md-6 col-sm-12">
                    <Bar data={formattedData} />
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12">
                    <Line data={formattedData} />
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12">
                    <Pie data={formattedData} />
                </div>
            </div>            
        </div>
    )
}