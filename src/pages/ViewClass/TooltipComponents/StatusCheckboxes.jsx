import React from 'react'

const StatusCheckboxes = (props) => {
  return (
  <div className='flex flex-col items-center justify-start'>
     <div className='flex flex-col items-center'>
    <div className="flex items-center mr-4 mb-2 w-28">
      <input
        checked={props.statusPlanning}
        id="checkbox"
        type="checkbox"
        value=""
        className="w-5 h-5 accent-[#2D3748]"
        onChange={props.handleStatusPlanning}
      />
      <label htmlFor="checkbox" className="ml-2">
        Planning
      </label>
    </div>
    <div className="flex items-center mr-4 mb-2 w-28">
      <input
        checked={props.statusOpenning}
        id="checkbox"
        type="checkbox"
        value=""
        className="w-5 h-5 accent-[#2D3748]"
        onChange={props.handleStatusOpenning}
      />
      <label htmlFor="checkbox" className="ml-2">
        Openning
      </label>
    </div>
    <div className="flex items-center mr-4 mb-2 w-28">
      <input
        checked={props.statusClosed}
        id="checkbox"
        type="checkbox"
        value=""
        className="w-5 h-5 accent-[#2D3748]"
        onChange={props.handleStatusClosed}
      />
      <label htmlFor="checkbox" className="ml-2">
        Closed
      </label>
    </div>
    
  </div>
    
  </div>
  )
}

export default StatusCheckboxes