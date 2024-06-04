import { createSlice } from "@reduxjs/toolkit";

export const initialSyllabusData = {
  fromDate: "",
  toDate: "",
  search: "",
  page: "",
  row: "",
  sort: "",
};

export const saveSyllabusData = {
  fromDate: "",
  toDate: "",
  search: "",
  page: "",
  row: "",
  sort: "",
};

const queryParamsSyllabusSlice = createSlice({
  name: "queryParamsSyllabusSlice",
  initialState: initialSyllabusData,
  reducers: {
    setQueryParamSyllabus: (state, action) => {
      const { key, value } = action.payload;
      state[key] = value;
    },
    resetListSyllabus: (state) => {
      return initialSyllabusData;
    },
  },
});

export const { setQueryParamSyllabus, resetListSyllabus } =
  queryParamsSyllabusSlice.actions;
export default queryParamsSyllabusSlice.reducer;
