import React, { useEffect, useState } from "react";
import DatePicker from "react-multi-date-picker";
import "react-datepicker/dist/react-datepicker.css";
import { getDay } from "date-fns";
import styled from "../css/calendar.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  handleCalendarChange,
  handleValue,
} from "../../../redux/slices/createClass/searchProgramSlice";
const Calendar = () => {
  const [state, setState] = useState([]);
  const [open, setOpen] = useState(true);
  const [value, setValue] = useState([]);
  // console.log("state of calendar ", value[5].day);
  const minDate = useSelector((state) => state.searchProgram.Draft.minDate);

  const listDate = value.map((item) => item.toString());
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(handleCalendarChange(listDate));
  }, [value]);
  return (
    <>
      <div className="a ml-10  ">
        <DatePicker
          minDate={minDate}
          focusedClassName="custom-focus"
          containerClassName="custom-container"
          className="custom-calendar"
          onChange={setValue}
          // readOnly
          required
          numberOfMonths={2}
          multiple
          sort
          open
          format="YYYY-MM-DD"
          dateFocused={value}
          onFocusedDateChange={(dateFocused, dateClicked) => {
            setState({ dateFocused, dateClicked });
          }}
          // plugins={[<DatePanel markFocused />]}
        />
      </div>
    </>
  );
};

export default Calendar;
