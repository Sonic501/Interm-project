import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./DatePicker.css";

const daysMap = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const weeksMap = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

const monthMap = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const DatePickerDaysDisplay = ({ date, onChange }) => {
  const dispatch = useDispatch();
  const [year, setYear] = useState(date.getFullYear());
  const [month, setMonth] = useState(date.getMonth());
  const [selectedDay, setSelectedDay] = useState(date.getTime());
  const [monthDetails, setMonthDetails] = useState(getMonthDetails(year, month));
  const [dateSelect, setDateSelect] = useState(date);

  useEffect(() => {
    onChange(dateSelect);
  }, [dateSelect]);

  function getNumberOfDays(year, month) {
    return new Date(year, month + 1, 0).getDate();
  }

  function getDayDetails(args) {
    let date = args.index - args.firstDay;
    let day = args.index % 7;
    let prevMonth = args.month - 1;
    let prevYear = args.year;
    if (prevMonth < 0) {
      prevMonth = 11;
      prevYear--;
    }
    let prevMonthNumberOfDays = getNumberOfDays(prevYear, prevMonth);
    let _date = (date < 0 ? prevMonthNumberOfDays + date : date % args.numberOfDays) + 1;
    let month = date < 0 ? -1 : date >= args.numberOfDays ? 1 : 0;
    let timestamp = new Date(args.year, args.month, _date).getTime();
    return {
      date: _date,
      day,
      month,
      timestamp,
      dayString: daysMap[day],
    };
  }

  function getMonthDetails(year, month) {
    let firstDay = new Date(year, month).getDay();
    let numberOfDays = getNumberOfDays(year, month);
    let monthArray = [];
    let rows = 6;
    let currentDay = null;
    let index = 0;
    let cols = 7;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        currentDay = getDayDetails({
          index,
          numberOfDays,
          firstDay,
          year,
          month,
        });
        monthArray.push(currentDay);
        index++;
      }
    }
    return monthArray;
  }

  function isCurrentDay(day) {
    return day.timestamp === date.getTime();
  }

  function isSelectedDay(day) {
    return day.timestamp === selectedDay;
  }

  function getMonthStr(month) {
    return monthMap[Math.max(Math.min(11, month), 0)] || "Month";
  }

  function getDateStringFromTimestamp(timestamp) {
    let dateObject = new Date(timestamp);
    let month = dateObject.getMonth() + 1;
    let date = dateObject.getDate();
    return (
      // dateObject.getFullYear() +
      // "-" +
      // (month < 10 ? "0" + month : month) +
      // "-" +
      // (date < 10 ? "0" + date : date)
      dateObject
    );
  }

  const onDateClick = (day) => {
    setSelectedDay(day.timestamp);
    setDateSelect(getDateStringFromTimestamp(day.timestamp));
    // if (onChange) {
    //   onChange(day.timestamp);
    // }
  };

  function handleSetMonth(offset) {
    let newYear = year;
    let newMonth = month + offset;
    if (newMonth === -1) {
      newMonth = 11;
      newYear--;
    } else if (newMonth === 12) {
      newMonth = 0;
      newYear++;
    }
    setYear(newYear);
    setMonth(newMonth);
    setMonthDetails(getMonthDetails(newYear, newMonth));
  }

  function renderCalendarByDay() {
    const days = monthDetails.map((day, index) => {
      return (
        <>
          <div
            className={
              "c-day-container " +
              (day.month !== 0 ? " disabled" : "") +
              // (isCurrentDay(day) ? " highlight" : "") +
              (isSelectedDay(day) ? " highlight-green" : "")
            }
            key={index}
          >
            <div className="cdc-day">
              <p onClick={() => onDateClick(day)}>{day.date}</p>
            </div>
          </div>
        </>
      );
    });

    return (
      <>
        <div className="mdpc-head">
          <div className="mdpch-button">
            <div className="mdpchb-inner" onClick={() => handleSetMonth(-1)}>
              <span className="mdpchbi-left-arrow"></span>
            </div>
          </div>
          <div className="mdpch-container">
            <div className="mdpchc-month">{getMonthStr(month)}</div>
            <div className="mdpchc-year">{year}</div>
          </div>
          <div className="mdpch-button">
            <div className="mdpchb-inner" onClick={() => handleSetMonth(1)}>
              <span className="mdpchbi-right-arrow"></span>
            </div>
          </div>
        </div>
        <div className="c-container">
          <div className="cc-head">
            {weeksMap.map((d, i) => (
              <div key={i} className="cch-name">
                {d}
              </div>
            ))}
          </div>
          <div className="cc-body">{days}</div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="MyDatePicker">
        <div className="mdp-container">
          <div className="mdpc-body">{renderCalendarByDay()}</div>
        </div>
      </div>
    </>
  );
};

export default DatePickerDaysDisplay;
