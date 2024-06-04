import React, { useState } from 'react'
import OutlineAPI from './axiosConnection';
import { Card } from '@mui/material';
export default function OutGame(props) {
  const [open, setOpen] = useState(false);
  // console.log(props)
  const [aa, setAA] = OutlineAPI(
    "https://f-m-c-v3.azurewebsites.net/api/osd/" + props.id
  );


  function Display() {
    return (
      <div >
        <Card className='absolute right-1/2 bg-white w-1/2 h-36 z-50 justify-center'>
          <h1 className='text-2xl text-blue-500 mb-4 mt-4 ml-2'>Coding Standard</h1>
          <p className='ml-2'>{aa.description}</p>
        </Card>
      </div>

    )
  }
  function handleHover() {

    setOpen(true)
    return (
      <div>hello</div>
    )
  }
  function handleOnMouseLeave() {
    setOpen(false)
  }
  return (
    <div>
      {open && Display()}
      <span onMouseEnter={handleHover} onMouseLeave={handleOnMouseLeave} className="absolute left-1/3 ml-80 box-decoration-slice bg-slate-700 rounded-md text-white p-2  pb-1 " >{aa.standardCode}</span>
    </div>
  )
}



