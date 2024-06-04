import { combineReducers, configureStore } from "@reduxjs/toolkit";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import syllabusReducer from "./slices/syllabusSlice";
import authReducer from "./slices/authSlice";
import roleReducer from "./slices/roleSlice";
import userReducer from "./slices/userSlice";
import classListReducer, {
  trainingClassSlice,
} from "./slices/viewClass/classSlice";
// import { userReducer } from "./slices/userSlice";
import searchListSlice from "./slices/viewClass/searchClassSlice";
import queryParamsSlice from "./slices/viewClass/initialState";
import { syllabusSlice } from "./slices/viewSyllabus/syllabusSlice";
import searchSyllabusListSlice from "./slices/viewSyllabus/searchSyllabusSlice";
import queryParamsSyllabusSlice from "./slices/viewSyllabus/initialState";
import classDetailReducer, {
  trainingClassDetailSlice,
} from "./slices/viewClassDetails/classDetailSlice";
import { createClassData } from "./slices/viewClass/uploadSlice";
import searchProgramSlice from "./slices/createClass/searchProgramSlice";
import { contentSlice } from "./slices/createClass/contentSlice";
import { adminSlice } from "./slices/createClass/adminSlice";
import { fsuSlice } from "./slices/createClass/fsuSlice";
import { contactSlice } from "./slices/createClass/contact";
import { attendeeSlice } from "./slices/createClass/attendeeeSlice";
import { trainingProgramSlice } from "./slices/createClass/programSlice";
import traningCalendarReducer from "../pages/TrainingCalendar/redux/trainingCalendarSilce";
import programReducer from "../pages/CreateProgram/redux/programSlice";
import trainingTrainerClassReducer from "./slices/viewClassDetails/classDetailSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: ["trainingCalendar"],
};

const rootReducer = combineReducers({
  auth: authReducer,
  role: roleReducer,
  user: userReducer,
  syllabusList: syllabusReducer,
  searchProgram: searchProgramSlice,
  attendee: attendeeSlice.reducer,
  contact: contactSlice.reducer,
  FSU: fsuSlice.reducer,
  admin: adminSlice.reducer,
  content: contentSlice.reducer,
  trainingClass: classListReducer,
  trainingClassDetail: classDetailReducer,
  searchBar: searchListSlice,
  initialParams: queryParamsSlice,
  createClassData: createClassData.reducer,
  syllabusList: syllabusSlice.reducer,
  syllabusDetail: syllabusSlice.reducer,
  searchSyllabusBar: searchSyllabusListSlice,
  initialSyllabusParams: queryParamsSyllabusSlice,
  initialSyllabusParamsTest: queryParamsSyllabusSlice,
  outputStandardSyllabus: syllabusSlice.reducer,
  deleteSyllabus: syllabusSlice.reducer,
  createSyllabus: syllabusSlice.reducer,
  duplicateSyllabus: syllabusSlice.reducer,
  trainingCalendar: traningCalendarReducer,
  program: programReducer,

  trainingClassTrainer: trainingTrainerClassReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
