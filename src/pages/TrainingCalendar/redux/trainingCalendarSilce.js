import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  chose: "day",
  date: new Date().toDateString(),
  week: [],
  traningPrograms: [],
};

const traningCalendarSlice = createSlice({
  name: "trainingCalendar",
  initialState,
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setChose: (state, action) => {
      state.chose = action.payload;
    },
    setDate: (state, action) => {
      state.date = action.payload;
    },
    setWeek: (state, action) => {
      state.week = action.payload;
    },
    setTrainingPrograms: (state, action) => {
      state.traningPrograms = action.payload;
    },
    reset: (state) => {
      state = initialState;
    },
  },
});

export const { setIsLoading, setChose, setDate, setWeek, setTrainingPrograms, reset } = traningCalendarSlice.actions;

export default traningCalendarSlice.reducer;
