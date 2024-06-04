import React, { useState, useEffect } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from "react-chartjs-2";
import axios from 'axios';

const   OutlineAllocation = ({deliveryType, day}) => {
    const initialTypeCount = deliveryType.map((type) => ({
        ...type,
        occurrence: 0,
      }));
      
      const deliveryTypeCount = day.reduce((acc, session) => {
        session.unitDTOList.forEach((unit) => {
          unit.unitDetailDTOList.forEach((detail) => {
            const index = acc.findIndex((type) => type.id === detail.deliveryTypeId);
            if (index !== -1) {
              acc[index].occurrence += 1;
            }
          });
        });
        return acc;
      }, initialTypeCount);
   
      const getDateOfDeliveryNameById = (id) => {
        deliveryType?.map(type =>{
            for(let i in deliveryTypeCount){
                if(id == i){
                    return type.typeName;
                }
            }
        })
      }
      const totalOccurrences = deliveryTypeCount.reduce((acc, type) => acc + type.occurrence, 0);

      const data = deliveryTypeCount.map((type) => {
  return Math.round((type.occurrence / totalOccurrences) * 100);
});



    ChartJS.register(ArcElement, Tooltip, Legend);
    const dataPie = {
        datasets: [
            {
                data: data,
                backgroundColor: [
                    "#F4BE37",
                    "#FF9F40",
                    "#0D2535",
                    "#5388D8",
                    "#206EE5"
                ],
                hoverBackgroundColor: [
                    "#F9CB5C",
                    "#FFAF5B",
                    "#1E455D",
                    "#6BA9E5",
                    "#3B77E5"
                ]
            }
        ]
    };
    const options = {
        responsive: true,
        maintainAspectRatio: false
    };

    const [currentType, setCurrentType] = useState(null);
    return (
        <div>
            <div className='w-full h-[29px] bg-[#2D3748] rounded-t-2xl flex justify-center items-center'>
                <span className='font-bold text-white'>Time allocation</span>
            </div>
            <div className='max-w-full shadow-xl rounded-2xl p-4'>
                <div className="flex justify-center">
                    <div className='w-52 h-52'>
                        <Pie data={dataPie} options={options} />
                    </div>

                </div>
                <ul className='text-left mt-3 ml'>
                    {deliveryTypeCount?.map((type) => {
                        const colors = ['#F4BE37', '#FF9F40', '#0D2535', '#5388D8', '#206EE5'];
                        const dotStyle = {
                            content: '',
                            display: 'inline-block',
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            marginRight: '10px',
                            backgroundColor: colors[type.id % colors.length]
                        };
                        return (
                            <li key={type.id} className='my-2' >
                                <div className='flex justify-between'>
                                    <div>
                                        <span style={dotStyle}></span>
                                        {type.typeName}
                                    </div>
                                    <div>({totalOccurrences>0 ? Math.round((type.occurrence / totalOccurrences) * 100) : 0}%)</div>
                                </div>

                            </li>
                        );
                    })}
                </ul>

            </div>
        </div>
    )
}

export default OutlineAllocation