import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const uploadTrainingClass = createAsyncThunk(
    'trainingClass/uploadTrainingClass',
    async (fileContent, token) => {
      try {
        const response = await axios.post('https://f-m-c-v3.azurewebsites.net/api/file-csv', {
          data: fileContent,
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data === 'Error Message : Training Class not found!') {
          return 'Class not found';
        }
        return response.data;
      } catch (error) {
        throw new Error(error.response.data);
      }
    }
  );

export const createClassData = createSlice({
  name: 'createClassData',
  initialState: {
    classData: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadTrainingClass.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadTrainingClass.fulfilled, (state, action) => {
        state.loading = false;
        state.classData = action.payload;
      })
      .addCase(uploadTrainingClass.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
