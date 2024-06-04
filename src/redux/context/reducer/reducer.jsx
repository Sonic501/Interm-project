import { combineReducers } from "@reduxjs/toolkit";
import trainingProgramReducer from "./trainingProgramReducer";

const combinedReducer = combineReducers({
  trainingProgram: trainingProgramReducer,
});

export default reducer;
