import WarningLogo from "../../assets/icons/WarningLogo";
import React, { useState } from "react";
import SearchBox from "./Component/SearchBox";
import DatePickerDaysDisplay from "./Component/DatePicker/DatePickerDaysDisplay";
import DatePickerWeeksDisplay from "./Component/DatePicker/DatePickerWeeksDisplay";
import TrainingCalenderSession from "./Component/TrainingCalenderSession";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCalendarByDay, getCalendarByWeek, searchCalendarByDay, searchCalendarByWeek } from "./redux/trainingCalenderService";
import { setChose, setDate, setWeek } from "./redux/trainingCalendarSilce";

const TrainingCalendar = () => {
  const dispatch = useDispatch();
  const date = new Date(useSelector((state) => state.trainingCalendar.date));
  const token = useSelector((state) => state.auth.token);
  const chose = useSelector((state) => state.trainingCalendar.chose);
  const [keywords, setKeywords] = useState([]);

  useEffect(() => {
    async function fetchData() {
      if (keywords.length === 0) {
        if (chose === "day") {
          dispatch(getCalendarByDay(date, token));
        } else {
          dispatch(getCalendarByWeek(date, token));
        }
      } else {
        if (chose === "day") {
          dispatch(searchCalendarByDay(date, keywords, token));
        } else {
          dispatch(searchCalendarByWeek(date, keywords, token));
        }
      }
    }
    fetchData();
  }, [date, chose, keywords]);

  function handleDateChange(date) {
    dispatch(setDate(date.toDateString()));
  }
  function handleWeekChange(week, date) {
    week = week.map((day) => day.toDateString().substring(8, 10));
    dispatch(setDate(date.toDateString()));
    dispatch(setWeek(week));
  }

  return (
    <>
      <Header />

      <SearchBox keywords={keywords} setKeywords={setKeywords} />

      <SwitchDayOrWeek />

      {chose === "day" ? (
        <DatePickerDaysDisplay date={date} onChange={handleDateChange} />
      ) : (
        <DatePickerWeeksDisplay date={date} onChange={handleWeekChange} />
      )}

      <TrainingCalenderSession />
    </>
  );
};

const SwitchDayOrWeek = () => {
  const chose = useSelector((state) => state.trainingCalendar.chose);
  const dispatch = useDispatch();

  const handleOnClickDateWeek = (e) => {
    if (e.target.innerText === "Day") {
      dispatch(setChose("day"));
    } else if (e.target.innerText === "Week") {
      dispatch(setChose("week"));
    }
  };
  return (
    <div className={`pl-[30px] mb-1 gap-5 flex pt-0 text-center font-normal w-[140px] h-[27px] font-['Inter']`}>
      <div
        className={
          (chose === "day" ? "text-white bg-[rgba(45,55,72,1)]" : "text-black") +
          " flex justify-center items-center pl-[11.5px] pr-[11.5px] pt-[5px] pb-[5px] h-[27px] rounded-[20px] cursor-pointer"
        }
        onClick={handleOnClickDateWeek}
      >
        <p className="text-sm h-[17px] w-[37px]">Day</p>
      </div>
      <div
        className={
          (chose === "week" ? "text-white bg-[rgba(45,55,72,1)]" : "text-black") +
          " flex justify-center items-center pl-[11.5px] pr-[11.5px] pt-[5px] pb-[5px] h-[27px] rounded-[20px] cursor-pointer"
        }
        onClick={handleOnClickDateWeek}
      >
        <p className="text-sm h-[17px] w-[37px]">Week</p>
      </div>
    </div>
  );
};

const Header = () => (
  <div
    className={`py-5 pl-[30px] gap-2.5 inline-flex flex-col justify-center items-start text-white text-left font-medium  pr-[30px] w-full mt-0.5 bg-[rgba(45,55,72,1)] font-['Inter']`}
  >
    <div className={`gap-2.5 flex items-start`}>
      <p className={`text-2xl m-0 tracking-[3.2px] leading-[normal]`}>Training Calendar</p>
      <WarningLogo />
    </div>
  </div>
);

export default TrainingCalendar;
