import React, { useEffect, useState } from "react";
import DatePicker from "react-multi-date-picker";
import "react-datepicker/dist/react-datepicker.css";
import { getDay } from "date-fns";
import styled from "../css/calendar.scss";
import { useDispatch, useSelector } from "react-redux";
import { handleCalendarChange } from "../../../redux/slices/createClass/searchProgramSlice";
const Calendar2 = () => {
  const [state, setState] = useState([]);
  const [value, setValue] = useState([]);
  const Date = useSelector((state) => state.searchProgram.Draft.listOfDate);
  return (
    <>
      <div className="a ml-10  ">
        <DatePicker
          // readOnly
          required
          numberOfMonths={2}
          sort
          open
          format="YYYY-MM-DD"
          value={Date}
        />
      </div>
    </>
  );
};

export default Calendar2;
