import React, { useState } from 'react'
import DatePicker from "react-datepicker";
import calendarSvg from '../resources/calendar.svg'


const ClassTimeFrame = (props) => {

  return (
    <div className='w-full flex flex-col justify-evenly h-full'>
        <div className='font-bold'>Class time frame</div>
        <div className='flex space-x-2'>
          <div>from</div>
          <div className='border rounded-md w-1/2 px-2 flex'>
            <DatePicker className='w-full' 
             selected={props.startDate} onChange={(date) => props.setStartDate(date)} />
            <img src={calendarSvg} alt="" />
            </div>
          <div>to</div>
          <div className='border rounded-md w-1/2 px-2 flex'>
            <DatePicker className='w-full' 
              minDate={props.startDate} selected={props.endDate} onChange={(date) => props.setEndDate(date)} />
            <img src={calendarSvg} alt="" />
            </div>
        </div>

    </div>
  )
}

export default ClassTimeFrame