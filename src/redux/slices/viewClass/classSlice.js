import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchTrainingClassData = createAsyncThunk(
  'trainingClass/fetchTrainingClassData',
  async ({queryParams, dynamicToken}, thunkAPI) => {
    const baseUrl = 'https://f-m-c-v3.azurewebsites.net/api/class/list';
    const queryUrl = new URL(baseUrl);
    // add each query parameter to the URL
    for (const [key, value] of Object.entries(queryParams)) {
      queryUrl.searchParams.append(key, value);
    }

    try {
      const response = await axios.get(queryUrl.toString(), {
        headers: { Authorization: `Bearer ${dynamicToken}` },
      });
      if (response === 'Error Message : Training Class not found!') {
        return 'Class not found';
      }
      return response;
    } catch (error) {
      throw new Error(error.response);
    }
  }
);

export const trainingClassSlice = createSlice({
  name: 'trainingClass',
  initialState: {
    trainingClassData: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrainingClassData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTrainingClassData.fulfilled, (state, action) => {
        state.trainingClassData = action.payload;
        state.loading = false;
      })
      .addCase(fetchTrainingClassData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { reducer: classListReducer } = trainingClassSlice;
export default classListReducer;
