import React from 'react'

const ClassTimeCheckBoxes = (props) => {
  return (
    <div className='flex flex-col items-center w-2/3'>
    <div className="flex items-center mr-4 mb-2 w-28">
      <input
        checked={props.classTimeMorning}
        id="checkbox-morning"
        type="checkbox"
        value=""
        className="w-5 h-5 accent-[#2D3748]"
        onClick={props.handleClassTimeMorning}
      />
      <label htmlFor="checkbox-morning" className="ml-2">
        Morning
      </label>
    </div>
    <div className="flex items-center mr-4 mb-2 w-28">
      <input
        checked={props.classTimeNoon}
        id="checkbox-noon"
        type="checkbox"
        value=""
        className="w-5 h-5 accent-[#2D3748]"
        onClick={props.handleClassTimeNoon}
      />
      <label htmlFor="checkbox-noon" className="ml-2">
        Noon
      </label>
    </div>
    <div className="flex items-center mr-4 mb-2 w-28">
      <input
        checked={props.classTimeNight}
        id="checkbox-night"
        type="checkbox"
        value=""
        className="w-5 h-5 accent-[#2D3748]"
        onClick={props.handleClassTimeNight}
      />
      <label htmlFor="checkbox-night" className="ml-2">
        Night
      </label>
    </div>
    <div className="flex items-center mr-4 mb-2 w-28">
      <input
        checked={props.classTimeOnline}
        id="checkbox-online"
        type="checkbox"
        value=""
        className="w-5 h-5 accent-[#2D3748]"
        onClick={props.handleClassTimeOnline}
      />
      <label htmlFor="checkbox-online" className="ml-2">
        Online
      </label>
    </div>
  </div>
  
  )
}

export default ClassTimeCheckBoxes