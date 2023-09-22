import React, { useState, useEffect, useContext } from 'react';
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
import axios from 'axios';
import AuthContext from '../helpers/AuthContext';

const Charts = () => {

      const {authState} = useContext(AuthContext);

      const [progressIncrease, setProgressIncrease] = useState(0);
      const [progressDecrease, setProgressDecrease] = useState(0);

      useEffect(()=>{
        const getProgress = async() =>{
          const response = await axios.post('http://localhost:3001/auth/progressdetails', {userId:authState.id});
          setProgressIncrease(response.data.progress);
          setProgressDecrease(response.data.progressNeg)
        }
        getProgress();
      },[])

      Chart.register(ArcElement);

      const data = {
        datasets: [
          {
            data: [progressIncrease,progressDecrease],
            backgroundColor: [
              "#4e54c8",
              "#99CCFF",
              
            ],
            display: true,
            borderColor: "#D1D6DC"
          }
        ]
      };

  return (
    <div  className='donut mx-auto'>
     
      <Doughnut
       
        data={data}
        options={{
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              enabled: false
            }
          },
          rotation: -90,
          circumference: 180,
          cutout: "60%",
          maintainAspectRatio: true,
          responsive: true
        }}
      />
      <div
        style={{
          margin:'-115px 0 0 120px'
        }}
      >
        <div>Progress</div>
      </div>
    </div>
  );
};

export default Charts;