import React from 'react'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
export default function HeaderProgram(props) {

    return (
        <div>
            <div>
                <p className='bg-[#2D3748] text-white text-2xl tracking-[3px] w-full mt-1 p-3 pl-5 ' >
                    <span>Training program</span>
                    <br />
                    <span className=' text-white text-3xl font-bold mb-4'>
                        {props.program.programName}
                    </span>
                    <label className='border rounded-full text-sm text-center bg-[#999796] ml-3 p-1'>{props.program.programStatus ? 'Active' : 'Inactive'}</label>
                    <MoreHorizIcon className='absolute right-10 top-[130px] cursor-pointer' />
                </p>
            </div>
            <div className='ml-2 p-4'>
                <p className='font-light'>
                    <strong className='text-2xl font-bold'>{props.program.programDay}</strong>
                    <span> days</span>
                    <span className='italic ml-2'>
                        (
                        <strong className='font-bold'>{props.program.programHour.toFixed(2)} </strong>
                        hours)
                    </span>
                </p>
                <p>Modified on <span className='italic'>{props.program.dateCreated}</span> by <span className='font-bold'>{props.program.creatorName}</span></p>
            </div>
        </div>
    )
}
