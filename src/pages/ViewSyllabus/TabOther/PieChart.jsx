import React from "react";
import { Pie } from 'react-chartjs-2';
import {Chart, ArcElement, Tooltip, Title} from 'chart.js'
Chart.register(ArcElement, Tooltip, Title );
 

const PieChart = ({ data }) => {
  const typeColors = {
    "Concept/Lecture": "#F4BE37",
    "Seminar/Workshop": "#FF9F40",
    "Test/Quiz": "#0D2535",
    "Exam": "#5388D8",
    "Guide/Review": "#206EE5",
    "Assignment/Lab": "#00FF33",
  };
  const percentages = Object.keys(typeColors).map(type => {
    const item = data.find(d => d.type === type);
    return item ? item.percentage : 0;
  });
  const backgroundColor = Object.keys(typeColors).map(type => typeColors[type]);

  const chartData = {
    labels: Object.keys(typeColors),
    datasets: [
      {
        data: percentages,
        backgroundColor,
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="w-[209px] h-[209px]">
      <Pie data={chartData} />
    </div>
  );
};

export default PieChart;
