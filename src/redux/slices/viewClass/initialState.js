import { createSlice } from '@reduxjs/toolkit';

export const initialTrainingClassData = {
  location: '',
  fromDate: '',
  toDate: '',
  period: '',
  isOnline: false,
  state: '',
  attendee: '',
  fsu: '',
  trainerId: '',
  search: '',
  sort: '',
  page: '',
  row: '',
};

export const saveTrainingClassData = {
  location: '',
  fromDate: '',
  toDate: '',
  period: '',
  isOnline: false,
  state: '',
  trainerId: '',
  search: '',
  sort: '',
  page: '',
  row: '',
};

const queryParamsSlice = createSlice({
  name: 'queryParams',
  initialState: initialTrainingClassData,
  reducers: {
    setQueryParam: (state, action) => {
      const { key, value } = action.payload;
      state[key] = value;
    },
    resetList: (state) => {
        return initialTrainingClassData;
      },
  },
});

export const { setQueryParam, resetList
 } = queryParamsSlice.actions;
export default queryParamsSlice.reducer;
