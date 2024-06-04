import React from 'react';
import Image from '../../components/Image';
import images from "../../assets/images";
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import { useSelector } from "react-redux";



const General = () => {

    const { syllabusDetailData } = useSelector((state) => state.syllabusList);
    const { outputStandardSyllabusData } = useSelector((state) => state.syllabusList);


    const LightTooltip = styled(({ className, ...props }) => (
        <Tooltip {...props} classes={{ popper: className }} />
    ))(({ theme }) => ({
        [`& .${tooltipClasses.tooltip}`]: {
            backgroundColor: theme.palette.common.white,
            color: 'rgba(0, 0, 0, 0.87)',
            boxShadow: theme.shadows[1],
            fontSize: 11,
        },
    }));


    return (
        <div className='mt-[37px] border-t-2  pt-[13px]'>
            <div className='flex gap-10 mt-[30px]' >
                <div className='flex grow shadow-md shadow-gray-500 p-4 rounded-lg gap-16 min-w-fit'>
                    <div className='w-fit min-w-fit ' >
                        <div className='flex gap-3'>
                            <Image src={images?.grade} />
                            <span className='font-bold '>Level</span>
                        </div>
                        <div className='flex gap-3 my-8'>
                            <Image src={images?.group} />
                            <span className='font-bold '>Attendee number</span>
                        </div>
                        <div className='flex gap-3'>
                            <Image src={images?.verified} />
                            <span className='font-bold '>Output standard</span>
                        </div>
                    </div>

                    <div className=''>
                        <div className=''>
                            <div className='min-h-[25px]'>
                                <span className='font-medium'>
                                    <div>{syllabusDetailData?.level}</div>
                                </span>
                            </div>
                            <div className=' my-8 min-h-[25px]'>
                                <span className='font-medium'>
                                    <div>{syllabusDetailData?.attendee}</div>
                                </span>
                            </div>
                            <div className=''>
                                <div className=' '>
                                    <div className=''>



                                        {Array.isArray(outputStandardSyllabusData) && outputStandardSyllabusData?.map(item => {
                                            return (
                                                <LightTooltip
                                                key = {item.id}
                                                    title={
                                                        <div className=''>
                                                            <div className='text-[#2D3748] text-[16px] border-b-2 max-w-[70%] leading-8 mb-2'>
                                                                {item?.standardName}

                                                            </div>
                                                            <div className='text-[14px] '>
                                                                {item?.description}

                                                            </div>
                                                        </div>
                                                    }
                                                >
                                                    <span className='mr-2 px-3 py-1 bg-[#2D3748] text-white rounded-lg' key={item.id}>
                                                        {item.standardCode}

                                                    </span>
                                                </LightTooltip>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='grow shadow-md shadow-gray-500  p-4 rounded-lg leading-[2.1]'>
                    <div className='flex gap-3'>
                        <Image src={images?.setting} />
                        <span className='font-bold '>Technical Requirement(s)</span>
                    </div>
                    <div className='px-3'>
                        {syllabusDetailData?.technicalRequirements?.split('\n').map((str, index) =>
                            <div key={index} dangerouslySetInnerHTML={{ __html: str }} />)}
                    </div>
                </div>
            </div>


            <div className='shadow-md shadow-gray-500 rounded-lg  mt-10 '>
                <div className='p-10'>
                    <div className='flex gap-3 mb-4'>
                        <Image src={images?.filter} />
                        <span className='font-bold '>Course objectives</span>
                    </div>
                    <div>
                        {syllabusDetailData?.courseObjectives?.split('\n').map((str, index) =>
                            <div key={index} dangerouslySetInnerHTML={{ __html: str }} />)}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default General;