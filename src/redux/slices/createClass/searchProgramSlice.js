import { createSlice } from "@reduxjs/toolkit";

const searchProgramSlice = createSlice({
  name: "searchProgram",
  initialState: {
    tittle: {},
    Draft: {
      className: "",
      startTime: "",
      endTime: "",
      listOfDate: [],
      admin: "",
      fsuMame: "",
      contactEmail: "",
      attendee: "",
      accepted: "",
      planned: "",
      actural: "",
      minDate: "",
      value: [],
    },
    initialSate: [],
  },
  reducers: {
    setItem: (state, action) => {
      state.tittle = action.payload;
    },
    handleDraftChange: (state, action) => {
      state.Draft = action.payload;
    },
    handleAdminChange: (state, action) => {
      state.Draft.admin = action.payload;
    },
    handleAFSUChange: (state, action) => {
      state.Draft.fsuMame = action.payload;
    },
    handleEmailChange: (state, action) => {
      state.Draft.contactEmail = action.payload;
    },
    handleAAttendeeChange: (state, action) => {
      state.Draft.attendee = action.payload;
    },
    handleAcceptedChange: (state, action) => {
      state.Draft.accepted = action.payload;
    },
    handleActuralChange: (state, action) => {
      state.Draft.actural = action.payload;
    },
    handlePlannedChange: (state, action) => {
      state.Draft.planned = action.payload;
    },
    handleStartTiemChange: (state, action) => {
      state.Draft.startTime = action.payload;
    },
    handleEndTiemChange: (state, action) => {
      state.Draft.endTime = action.payload;
    },
    handleCalendarChange: (state, action) => {
      state.Draft.listOfDate = action.payload;
    },
    handleMInChange: (state, action) => {
      state.Draft.minDate = action.payload;
    },
    handleValue: (state, action) => {
      state.Draft.value = action.payload;
    },
    handleClassName: (state, action) => {
      state.Draft.className = action.payload;
    },
  },
});

export const {
  handleClassName,
  handleValue,
  handleMInChange,
  setItem,
  handleDraftChange,
  handleAdminChange,
  handleAAttendeeChange,
  handleEmailChange,
  handleAFSUChange,
  handlePlannedChange,
  handleActuralChange,
  handleAcceptedChange,
  handleEndTiemChange,
  handleStartTiemChange,
  handleCalendarChange,
} = searchProgramSlice.actions;

export default searchProgramSlice.reducer;
