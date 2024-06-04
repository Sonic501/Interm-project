import React from 'react'

const AttendeeCheckBoxes = (props) => {
  return (
    <div className='flex flex-col items-center justify-start'>
    <div className="flex items-center mr-4 mb-2 w-40">
      <input
        checked={props.attendeeIntern}
        id="checkbox"
        type="checkbox"
        value=""
        className="w-5 h-5 accent-[#2D3748]"
        onChange={props.handleAttendeeIntern}
      />
      <label htmlFor="checkbox" className="ml-2">
        Intern
      </label>
    </div>
    <div className="flex items-center mr-4 mb-2 w-40">
      <input
        checked={props.attendeeFresher}
        id="checkbox"
        type="checkbox"
        value=""
        className="w-5 h-5 accent-[#2D3748]"
        onChange={props.handleAttendeeFresher}
      />
      <label htmlFor="checkbox" className="ml-2">
        Fresher
      </label>
    </div>
    <div className="flex items-center mr-4 mb-2 w-40">
      <input
        checked={props.attendeeOnFresher}
        id="checkbox"
        type="checkbox"
        value=""
        className="w-5 h-5 accent-[#2D3748]"
        onChange={props.handleAttendeeOnFresher}
      />
      <label htmlFor="checkbox" className="ml-2">
        Online fee-fresher
      </label>
    </div>
    <div className="flex items-center mr-4 mb-2 w-40">
      <input
        checked={props.attendeeOffFresher}
        id="checkbox"
        type="checkbox"
        value=""
        className="w-5 h-5 accent-[#2D3748]"
        onChange={props.handleAttendeeOffFresher}
      />
      <label htmlFor="checkbox" className="ml-2">
        Offline fee-fresher
      </label>
    </div>
  </div>
  )
}

export default AttendeeCheckBoxes