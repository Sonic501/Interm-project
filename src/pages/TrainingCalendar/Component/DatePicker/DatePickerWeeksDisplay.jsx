import React, { useState, useEffect } from "react";
import "./DatePicker.css";
import { Box, Grid } from "@mui/material";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

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
const yearMap = [2022, 2023, 2024];

function DatePickerWeeksDisplay({ date, onChange }) {
  const [week, setWeek] = useState([]);
  const [weekDateObj, setWeekDateObj] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date(date));

  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());

  function getDate_dd(day) {
    const dd = String(day).padStart(2, "0");
    return dd;
  }

  useEffect(() => {
    onChange(weekDateObj, currentDate);
  }, [weekDateObj]);

  useEffect(() => {
    // Determine the start of the week (Sunday)
    const startOfWeek = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - currentDate.getDay());

    // Determine the end of the week (Saturday)
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    // Create an array of dates for the full week
    const weekDates = [];
    const weekDatesObj = [];
    for (let i = 0; i < 7; i++) {
      const tDate = new Date(startOfWeek);
      tDate.setDate(startOfWeek.getDate() + i);
      let dayOfWeek = tDate.getDate();
      let dd = getDate_dd(dayOfWeek);
      weekDatesObj.push(tDate);
      weekDates.push(dd);
    }

    // Set the state to the array of week dates
    setWeekDateObj(weekDatesObj);
    setWeek(weekDates);

    endOfWeek.getMonth() != month && setMonth(endOfWeek.getMonth());
  }, [currentDate]);

  function handlePrevWeek() {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(prevDate.getDate() - 7);
      newDate.setDate(newDate.getDate() - newDate.getDay());
      return newDate;
    });
  }

  function handleNextWeek() {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(prevDate.getDate() + 7);
      newDate.setDate(newDate.getDate() - newDate.getDay());
      return newDate;
    });
  }

  function handleSelectMonth(event) {
    let newMonth = event.target.value;
    setMonth(newMonth);
    setCurrentDate(new Date(year, newMonth, 1));
  }

  function handleSelectYear(event) {
    let newYear = event.target.value;
    setYear(newYear);
    setCurrentDate(new Date(newYear, month, 1));
  }

  const girdMonthStyle = {
    textAlign: "center",
  };
  const gridDayStyle = {
    backgroundColor: "#F1F1F1",
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: "14px",
    lineHeight: "22px",
    marginTop: "10px",
  };
  const gridItemStyle = {
    width: "14.285%",
    height: "30px",
    lineHeight: "30px",
    fontWeight: 700,
    color: "#7e818c",
    fontSize: "14px",
    textAlign: "center",
  };

  return (
    <div className="mdp-container mx-4">
      <div className="mdpc-head">
        <div className="mdpch-button">
          <div className="mdpchb-inner" onClick={handlePrevWeek}>
            <KeyboardArrowLeftIcon />
          </div>
        </div>
        <div className="mdpch-container">
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Year</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={year}
                label="Year"
                onChange={handleSelectYear}
              >
                {yearMap.map((yearOption, index) => {
                  return (
                    <MenuItem value={yearOption} key={index}>
                      {yearOption}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Month</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={month}
                label="Month"
                onChange={handleSelectMonth}
              >
                {monthMap.map((monthOption, index) => {
                  return (
                    <MenuItem value={index} key={monthOption}>
                      {monthOption}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>
        </div>
        <div className="mdpch-button">
          <div className="mdpchb-inner" onClick={handleNextWeek}>
            <KeyboardArrowRightIcon />
          </div>
        </div>
      </div>

      <Box>
        <Box>
          <Grid container sx={girdMonthStyle}>
            {weeksMap.map((dayOfWeek, index) => {
              return (
                <Grid item xs={12 / 7} sx={gridItemStyle} key={index}>
                  {dayOfWeek}
                </Grid>
              );
            })}

            {week.map((dayInWeek, index) => {
              return (
                <Grid item xs={12 / 7} sx={gridDayStyle} key={index}>
                  {dayInWeek}
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Box>
    </div>
  );
}

export default DatePickerWeeksDisplay;
