import { createSlice, current } from '@reduxjs/toolkit';

const searchListSlice = createSlice({
  name: 'searchList',
  initialState: [],
  reducers: {
    addItem: (state, action) => {
      state.push(action.payload);
    },
    removeItem: (state, action) => {
      const indexToRemove = state.findIndex((item) => item.id === action.payload);
      if (indexToRemove !== -1) {
        state.splice(indexToRemove, 1);
       }
    },
    removeAll: (state) => {
      return [];
    },
  },
});

export const { addItem, removeItem, removeAll } = searchListSlice.actions;

export default searchListSlice.reducer;
