import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ClassItem from "./ClassItem";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const SessionTime = ({ time, data, session, timeRange, chose }) => {
  return (
    <>
      <Accordion defaultExpanded={true}>
        <AccordionSummary>
          <div
            className={`time-bar px-2.5 gap-2.5 inline-flex items-start text-white text-center pt-[5px] pb-[5px] w-full  bg-[rgba(45,55,72,1)] rounded-[10px] font-['Inter']`}
          >
            <p className="text-sm font-bold capitalize m-0 leading-[normal]">{session}</p>
            <p className="text-sm font-normal capitalize m-0 leading-[normal]">{`(${timeRange[0]}:00 - ${timeRange[1]}:00)`}</p>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          {chose === "day" ? <DetailByDay time={time} data={data} /> : <DetailByWeek timeRange={timeRange} data={data} />}
        </AccordionDetails>
      </Accordion>
    </>
  );
};

const DetailByDay = ({ time, data }) =>
  time.map((time) => (
    <div
      key={time.id}
      className="time-line border-b border-gray-300 px-5 inline-flex items-center w-full min-h-[38px] gap-[31px]"
    >
      <div className="border-gray-300 border-r pr-9">
        <p className="time w-10">{time.time}</p>
      </div>

      <div className="flex flex-wrap">
        {data.map((classItem, index) => {
          return classItem.startTime === `${time.time}:00` && <ClassItem key={index} classItem={classItem} />;
        })}
      </div>
    </div>
  ));

const DetailByWeek = ({ data, timeRange }) => {
  const week = useSelector((state) => state.trainingCalendar.week);
  const [classData] = useState(new Map());

  const setDataInWeek = () => {
    week.forEach((day) => {
      classData.set(day, []);
    });
    data.forEach((item) => {
      const dayOfWeek = new Date(item.day).getDay(); // get day of the week (0-6) from the date string
      if (classData.has(week[dayOfWeek])) {
        const startHour = item.startTime.substring(0, 2);
        // add the item to the appropriate day's object in the weekMap
        if (startHour >= timeRange[0] && startHour < timeRange[1]) {
          classData.get(week[dayOfWeek]).push(item);
        }
      }
    });
  };

  setDataInWeek();

  return (
    <>
      <div className="flex mx-4">
        {week.map((day, index) => (
          <div className="basis-1/7 min-h-8 flex flex-col justify-center" key={index}>
            {classData.size && classData.get(day).map((classItem, index) => <ClassItem key={index} classItem={classItem} />)}
          </div>
        ))}
      </div>
    </>
  );
};

export default SessionTime;
