import { useState } from 'react';
import { formatDate } from './handyFunction/formatDate';
import AttendeeCheckBoxes from './TooltipComponents/AttendeeCheckBoxes';
import ClassTimeCheckBoxes from './TooltipComponents/ClassTimeCheckBoxes';
import ClassTimeFrame from './TooltipComponents/ClassTimeFrame';
import ClosePopUpTooltip from './TooltipComponents/ClosePopUpTooltip';
import FSUSelect from './TooltipComponents/FSUSelect';
import LocationAutocomplete from './TooltipComponents/LocationAutocomplete';
import StatusCheckboxes from './TooltipComponents/StatusCheckboxes';
import TrainerSelect from './TooltipComponents/TrainerSelect';


const Tooltip = (props) => {

  const [classTimeMorning, setClassTimeMorning] = useState(false);
  const [classTimeNoon, setClassTimeNoon] = useState(false);
  const [classTimeNight, setClassTimeNight] = useState(false);
  const [classTimeOnline, setClassTimeOnline] = useState(false);
  const [statusPlanning, setStatusPlanning] = useState(false);
  const [statusOpenning, setStatusOpenning] = useState(false);
  const [statusClosed, setStatusClosed] = useState(false);
  const [attendeeIntern, setAttendeeIntern] = useState(false);
  const [attendeeFresher, setAttendeeFresher] = useState(false);
  const [attendeeOnFresher, setAttendeeOnFresher] = useState(false);
  const [attendeeOffFresher, setAttendeeOffFresher] = useState(false);


  const handleClassTimeMorning = () => {
    setClassTimeMorning(!classTimeMorning);
  };
  const handleClassTimeNoon = () => {
    setClassTimeNoon(!classTimeNoon);
  };
  const handleClassTimeNight = () => {
    setClassTimeNight(!classTimeNight);
  };
  const handleClassTimeOnline = () => {
    setClassTimeOnline(!classTimeOnline);
  };
  const handleStatusPlanning = () => {
    setStatusPlanning(!statusPlanning);
  };
  const handleStatusOpenning = () => {
    setStatusOpenning(!statusOpenning);
  };
  const handleStatusClosed = () => {
    setStatusClosed(!statusClosed);
  };
  const handleAttendeeIntern = () => {
    setAttendeeIntern(!attendeeIntern);
  };
  const handleAttendeeFresher = () => {
    setAttendeeFresher(!attendeeFresher);
  };
  const handleAttendeeOnFresher = () => {
    setAttendeeOnFresher(!attendeeOnFresher);
  };
  const handleAttendeeOffFresher = () => {
    setAttendeeOffFresher(!attendeeOffFresher);
  };
  
  //Location filter
  const [location, setLocation] = useState(null);
  //Location to put into query
  const locationID = location !== null ? (location?.map((item) => item.value)) : "";

  //Date filter
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());  
  //Date to put into query
  const startDateFilter = formatDate(startDate);
  const endDateFilter = formatDate(endDate);

  const handleClearFilter = () => {
    setClassTimeMorning(false);
    setClassTimeNoon(false);
    setClassTimeNight(false);
    setClassTimeOnline(false);
    setStatusPlanning(false);
    setStatusOpenning(false);
    setStatusClosed(false);
    setAttendeeIntern(false);
    setAttendeeFresher(false);
    setAttendeeOnFresher(false);
    setAttendeeOffFresher(false);
    setLocation(null);
    setStartDate(new Date());
    setEndDate(new Date());
  }

  const statusArray = [];
  statusOpenning ? statusArray.push("Openning") : statusArray.filter((item) => item !== "Openning");
  statusPlanning ? statusArray.push("Planning") : statusArray.filter((item) => item !== "Planning");
  statusClosed ? statusArray.push("Closed") : statusArray.filter((item) => item !== "Closed");
  const statusFilter = statusArray.length > 0 ? statusArray.join(",") : "";

  const classTimeArray = [];
  classTimeMorning ? classTimeArray.push(0) : classTimeArray.filter((item) => item !== 0);
  classTimeNoon ? classTimeArray.push(1) : classTimeArray.filter((item) => item !== 1);
  classTimeNight ? classTimeArray.push(2) : classTimeArray.filter((item) => item !== 2);
  const classTimeFilter = classTimeArray.length > 0 ? classTimeArray.join(",") : "";
  
  const isOnline = classTimeOnline ? true : false;

  const attendeeArray = [];
  attendeeIntern ? attendeeArray.push(1) : attendeeArray.filter((item) => item !== 1);
  attendeeFresher ? attendeeArray.push(2) : attendeeArray.filter((item) => item !== 2);
  attendeeOnFresher ? attendeeArray.push(3) : attendeeArray.filter((item) => item !== 3);
  attendeeOffFresher ? attendeeArray.push(4) : attendeeArray.filter((item) => item !== 4);

  const handleApplyFilter = () => {
    props.updateQueryParams('location', locationID);
    props.updateQueryParams('fromDate', startDateFilter);
    props.updateQueryParams('toDate', endDateFilter);
    props.updateQueryParams('period', classTimeFilter);
    props.updateQueryParams('isOnline', isOnline);
    props.updateQueryParams('state', statusFilter);
    props.updateQueryParams('attendee', attendeeArray);

    props.handleClosePopupTooltip();
  }

      
  return (
    <div className='w-screen h-screen absolute'>
    <div className="absolute -left-[3rem] -top-[7rem] w-screen h-screen flex justify-center items-center z-50" 
      onClick={props.handleClosePopupTooltip}
    >
      <div className="animate__animated animate__bounceInUp animate__faster relative w-[50rem] h-[27rem] top-28 left-20 bg-white shadow-slate-500 shadow-2xl rounded-2xl"    
          onClick={(e) => e.stopPropagation()}>
        <div className="absolute top-0 right-0 w-4 h-4 transform translate-x-1/2 -translate-y-1/2 bg-white rotate-45"></div>
        
        <div className='w-full h-full flex-col flex'>
            <div className='flex w-full h-1/5'>
              <div className="px-4 py-2 w-[55%] h-full flex flex-col justify-end">
                  <p className='font-bold'>Class location</p>
                  <LocationAutocomplete setLocation={setLocation}/>
             </div>

             <div className='w-[45%] px-4 py-2 mb-2 h-full'>
                  <ClassTimeFrame
                    startDate={startDate}
                    endDate={endDate}
                    setStartDate={setStartDate}
                    setEndDate={setEndDate}
                  />
                </div>
              </div>

              <div className='flex w-11/12 justify-between items-start my-6 px-4 py-2'>
                <div className='flex justify-between space-x-5'>
                  <div className='w-1/2 font-bold'>Class time</div>
                  <ClassTimeCheckBoxes 
                    classTimeMorning={classTimeMorning}
                    classTimeNight={classTimeNight}
                    classTimeNoon={classTimeNoon}
                    classTimeOnline={classTimeOnline}
                    handleClassTimeMorning={handleClassTimeMorning}
                    handleClassTimeNoon={handleClassTimeNoon}
                    handleClassTimeNight={handleClassTimeNight}
                    handleClassTimeOnline={handleClassTimeOnline}
                    />
                </div>
                <div className='flex space-x-5'>
                  <div className='font-bold'>Status</div>
                  <StatusCheckboxes
                    statusPlanning={statusPlanning}
                    statusOpenning={statusOpenning}
                    statusClosed={statusClosed}
                    handleStatusPlanning={handleStatusPlanning}
                    handleStatusOpenning={handleStatusOpenning}
                    handleStatusClosed={handleStatusClosed}
                  />
                </div>
                <div  className='flex space-x-5'>
                  <div className='font-bold'>Attendee</div>
                  <AttendeeCheckBoxes
                    attendeeIntern={attendeeIntern}
                    attendeeFresher={attendeeFresher}
                    attendeeOnFresher={attendeeOnFresher}
                    attendeeOffFresher={attendeeOffFresher}
                    handleAttendeeIntern={handleAttendeeIntern}
                    handleAttendeeFresher={handleAttendeeFresher}
                    handleAttendeeOnFresher={handleAttendeeOnFresher}
                    handleAttendeeOffFresher={handleAttendeeOffFresher}
                  />
                </div>
              </div>

              <div className='w-3/5 flex items-center justify-between px-4 py-2 space-x-5'>
                  <div className='w-1/2 flex justify-evenly items-center'>
                    <div className='font-bold'>FSU</div>
                    <FSUSelect/>
                  </div>
                  <div className='w-1/2 flex justify-evenly items-center'>
                    <div className='font-bold'>Trainer</div>
                    <TrainerSelect/>
                  </div>
              </div>

              <div className='mt-8 text-right mr-10'>
                <button onClick={handleClearFilter} className='w-24 h-10 my-4 mx-2 bg-gray-600 text-white rounded-xl font-bold'>Clear</button>
                <button onClick={handleApplyFilter} className='w-28 h-10 my-4 mx-2 bg-slate-800 text-white rounded-xl font-bold'>Search</button>
              </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Tooltip;