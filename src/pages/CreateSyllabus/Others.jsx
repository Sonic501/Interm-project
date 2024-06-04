import images from '../../assets/images';
import React, { useEffect, useState } from 'react';
import PieChart from './TabOther/PieChart'
import Table from './TabOther/Table';
import Image from '../../components/Image';
import AssessmentScheme from './AssessmentScheme';
import TrainingDeliveryPrinciple from './TrainingDeliveryPrinciple';

const Others = (props) => {
  const { newObj, setQuiz, setAssignment, setFinal, setFinalTheory, setFinalPractice, setGPA, setMarkingDes, setOtherDes, setTrainingDes, setReTestDes, setWaiverCriteriaDes
    , trainingDes, reTestDes, markingDes, waiverCriteriaDes, otherDes
  } = props;
  /*Rest API with Dynamic data using Chart.js*/

  useEffect(() => {
    const fetchData = () => {
      fetch("https://63e5cbdbc8839ccc284bb213.mockapi.io/others/piechart").then(data => {
        const res = data.json();
        return res
      }).then((res) => {
        console.log("piechart", res)
        const label = [];
        const data = [];
        for (var i of res) {
          label.push(i.unit)
          data.push(i.time)
        }
        setData(
          {
            datasets: [{
              data: data,
              backgroundColor: ["#F4BE37", "#FF9F40", "#0D2535", "#5388D8", "#206EE5"],

            },
            ],
            labels: label,
          }
        )
      }).catch(e => {
        console.log("error", e)
      })
    }
    fetchData();
  }, [])
  const [data, setData] = useState({
    labels: ["Assignment/Lab", "Concept/Lecture", "Guide/Review", "Test/Quiz", "Exam"],
    datasets: [
      {
        data: [54, 29, 9, 1, 6],
        backgroundColor: ["#F4BE37", "#FF9F40", "#0D2535", "#5388D8", "#206EE5"],
        hoverBackgroundColor: ["#000000", "#4B0082	", "#A9A9A9	", "#424242	", "#FF0000"],
        borderWidth: 0
      },
    ],
  })

  /*Fetch API Training delivery principle*/


  const [str, setStr] = useState({
    training: [],
    reTest: [],
    marking: [],
    waiverCriteria: [],
    others: [],
  });




  return (
    <>
      <div className='mt-[20px] border-none  pr-4 pb-5'>

        <div className='flex gap-x-3 w-[882px] h-[320px]'>
          <div className='shadow-2xl rounded-xl ml-7 w-1/2'>
            <div className='text-center text-white rounded-t-xl font-bold py-1' style={{ backgroundColor: "#2D3748" }}>
              Time allocation
            </div>
            <div className='flex items-center gap-x-4 px-5 py-7'>

              <PieChart data={data} />
              <Table data={data} />

            </div>
          </div>
          <div className='shadow-2xl rounded-xl w-1/2 '>
            <AssessmentScheme
              newObj={newObj}
              setQuiz={setQuiz}
              setAssignment={setAssignment}
              setFinal={setFinal}
              setFinalTheory={setFinalTheory}
              setFinalPractice={setFinalPractice}
              setGPA={setGPA}
            />
          </div>
        </div>
        <TrainingDeliveryPrinciple
          setMarkingDes={setMarkingDes}
          setOtherDes={setOtherDes}
          setTrainingDes={setTrainingDes}
          setReTestDes={setReTestDes}
          setWaiverCriteriaDes={setWaiverCriteriaDes}
          trainingDes={trainingDes}
          reTestDes={reTestDes}
          markingDes={markingDes}
          waiverCriteriaDes={waiverCriteriaDes}
          otherDes={otherDes}
        />
      </div>
    </>
  );
}

export default Others;