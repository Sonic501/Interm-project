import images from '../../assets/images';
import React, { useEffect, useState } from 'react';
import PieChart from './TabOther/PieChart'
import Table from './TabOther/Table';
import Image from '../../components/Image';
import { Pie } from "react-chartjs-2";
import Loading from "../../components/Loading/Loading";
import { useDispatch, useSelector } from "react-redux";
import { deliveryDataPieChart } from '../../redux/slices/syllabusSlice'
import { durationDataPieChart } from '../../redux/slices/syllabusSlice'
import { useParams } from "react-router-dom";

const Others = () => {
  const { token } = useSelector(state => state.auth)
  const [session, setSession] = useState([]);
  const [deliveryType, setDeliveryType] = useState([]);

  const { syllabusDetailData } = useSelector((state) => state.syllabusList);

  // Redux data PieChart & Training delivery principle

  const typeDurations = useSelector(state => {
    const { syllabusDetailData } = state.syllabusList;
    const sessionDTOList = syllabusDetailData.sessionDTOList || [];

    const typeDurations = sessionDTOList.flatMap(session => {
      const unitDTOList = session.unitDTOList || [];
      return unitDTOList.flatMap(unit => {
        const unitDetailDTOList = unit.unitDetailDTOList || [];
        return unitDetailDTOList.map(detail => ({
          type: detail.deliveryTypeName,
          duration: detail.duration
        }));
      });
    });

    const typeDurationMap = typeDurations.reduce((acc, { type, duration }) => {
      if (!acc[type]) {
        acc[type] = 0;
      }
      acc[type] += duration;
      return acc;
    }, {});

    const totalDuration = typeDurations.reduce((acc, { duration }) => acc + duration, 0);

    const result = Object.entries(typeDurationMap).map(([type, duration]) => ({
      type,
      percentage: duration / totalDuration * 100
    }));

    return result;
  });

  return (
    <>

      <div className='mt-[25px] border-none w-[95%] h-[97%] m-auto'>

        <div className='w-[100%] h-[330px] flex  mt-10 rounded-t-full gap-[10px]'>
          <div className='box1 w-[51%] h-[94%] shadow-md shadow-gray-500  '>
            <h2 className='text-2xl text-center font-bold text-[#FFFFFF] bg-[#2D3748] w-full rounded-t-lg p-2 pl-10'>
              Time allocation
            </h2>
            <div className='w-full h-[calc(100%-48px)] border-b border-r border-l shadow-2xl'>
              <div className='flex w-full h-full justify-center items-center p-2 gap-2'>
                <div className='sub-box w-[209px] h-[209px] '>
                  <PieChart data={typeDurations} />
                </div>
                <div className='sub-box w-[250px] '>
                  <Table data={typeDurations} />
                </div>
              </div>
            </div>
          </div>
          <div className='box2   w-[50%] h-[94%] shadow-md shadow-gray-500   '>
            <h2 className='text-2xl text-center font-bold text-[#FFFFFF] bg-[#2D3748] w-full rounded-t-lg p-2 pl-10  '>
              Assessment scheme
            </h2>
            <div className='w-full h-[calc(100%-48px)] border-b border-r border-l shadow-2xl flex flex-col pt-2 pb-2 text-[14px] font-normal'>
              <div className='sub-box h-[45%] w-[80%] m-auto flex rounded-lg border border-black'>
                <div className=' w-[50%] h-full flex flex-col justify-evenly s  '>
                  <div className='pl-4'>Quiz: <span className='pl-[15px]'>{syllabusDetailData?.quiz}%</span>
                  </div>
                  <div className='pl-4'>Final:  <span className='pl-[15px]'>{syllabusDetailData?.finalExam}%</span>
                  </div>
                </div>
                <div className='gap-4 w-[50%] h-full flex flex-col justify-evenly'>
                  <div className='pl-4'>Assignment: <span className='pl-[15px]'>{syllabusDetailData?.assignment}%</span>
                  </div>
                  <div className='pl-4'></div>
                </div>
              </div>
              <div className='sub-box h-[45%] w-[80%] m-auto  flex flex-col justify-center rounded-lg border border-black'>
                <p className='font-bold pl-4 text-[16px] pb-3'>Passing criteria</p>
                <div className='pl-4'>GPA* <span className='pl-[15px]'>{syllabusDetailData?.gpa}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='tdp  w-full h-[600px] shadow-md shadow-gray-500  mt-[20px]'>
          <h2 className='text-2xl font-bold text-[#FFFFFF] bg-[#2D3748] w-full rounded-t-lg p-2 pl-10'>
            Training delivery principle
          </h2>
          <div className='w-full h-[calc(100%-48px)] flex border-b border-r border-l shadow-2xl'>
            <div className='sub-box w-[100%] h-full flex flex-col '>
              <div className='flex flex-row mt-6 '>
                <div className='w-[30%] flex flex-row text-[16px] '>
                  <Image src={images?.Icons} style={{ width: '28px', height: '28px', margin: '2px', marginLeft: '40px', marginRight: '20px' }} />
                  <p className='font-bold'>Trainning</p>
                </div>
                <div className='w-[80%]'>
                  <ul className='list-disc text-[14px]'>
                  <div>
                  {syllabusDetailData?.trainingDes?.split('\n').map((str, index) =>
                            <div key={index} dangerouslySetInnerHTML={{ __html: str }} />)}
                    </div>
                  </ul>
                </div>

              </div>
              <div className='flex flex-row mt-6'>
                <div className='w-[30%] flex flex-row text-[16px] '>
                  <Image src={images?.Icons} style={{ width: '28px', height: '28px', margin: '2px', marginLeft: '40px', marginRight: '20px' }} />
                  <p className='font-bold'>Re-test</p>
                </div>
                <div className='w-[80%]'>
                  <ul className='list-disc text-[14px]'>
                  <div>
                  {syllabusDetailData?.reTestDes?.split('\n').map((str, index) =>
                            <div key={index} dangerouslySetInnerHTML={{ __html: str }} />)}
                    </div>
                  </ul>
                </div>

              </div>
              <div className='flex flex-row  mt-6'>
                <div className='w-[30%] flex flex-row text-[16px]'>
                  <Image src={images?.Icons} style={{ width: '28px', height: '28px', margin: '2px', marginLeft: '40px', marginRight: '20px' }} />
                  <p className='font-bold'>Marking</p>
                </div>
                <div className='w-[80%]'>
                  <ul className='list-disc text-[14px]'>

                  <div>
                  {syllabusDetailData?.markingDes?.split('\n').map((str, index) =>
                            <div key={index} dangerouslySetInnerHTML={{ __html: str }} />)}
                    </div>

                  </ul>
                </div>

              </div>
              <div className='flex flex-row mt-6 '>
                <div className='w-[30%] flex flex-row text-[16px] '>
                  <Image src={images?.Icons} style={{ width: '28px', height: '28px', margin: '2px', marginLeft: '40px', marginRight: '20px' }} />
                  <p className='font-bold'>Waiver Criteria</p>
                </div>
                <div className='w-[80%]'>
                  <ul className='list-disc text-[14px]'>

                  <div>
                  {syllabusDetailData?.waiverCriteriaDes?.split('\n').map((str, index) =>
                            <div key={index} dangerouslySetInnerHTML={{ __html: str }} />)}
                    </div>
                  </ul>
                </div>

              </div>
              <div className='flex flex-row mt-6 '>
                <div className='w-[30%] flex flex-row text-[16px] '>
                  <Image src={images?.Icons} style={{ width: '28px', height: '28px', margin: '2px', marginLeft: '40px', marginRight: '20px' }} />
                  <p className='font-bold'>Others</p>
                </div>
                <div className='w-[80%]'>
                  <ul className=' text-[14px]'>

                  <div>
                  {syllabusDetailData?.otherDes?.split('\n').map((str, index) =>
                            <div key={index} dangerouslySetInnerHTML={{ __html: str }} />)}
                    </div>

                  </ul>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>

    </>
  );
}

export default Others;