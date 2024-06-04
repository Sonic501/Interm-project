import React from "react";
import { Pie } from 'react-chartjs-2';
import {Chart, ArcElement, Tooltip, Title} from 'chart.js'
Chart.register(ArcElement, Tooltip, Title );
 

  const PieChart = ({data}) => {
    return (
      
      <div className="w-[150px] h-[150px] ">
        <Pie data={data}/>
      </div>
    );
  };

export default PieChart;
