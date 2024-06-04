import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const token =
  "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIzIiwiaWF0IjoxNjc4OTUzNjMyLCJleHAiOjE3NDIwNjc1MzZ9.oNbSE1phniTjfoBldw2ZfMJrjF4GsL1aqZr6HaDF21tD5c3DbQZaTnryLeRaLbu3DZlhRZSBXsZdIzroOWDsXQ";
export const fetchTrainingProgramData = createAsyncThunk(
  "trainingProgram/fetchTrainingProgramData",
  async (searchTerm) => {
    const url = `https://f-m-c-v3.azurewebsites.net/api/training-program/search-name?name=${searchTerm}`;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    if (searchTerm === "") {
      return []; // return an empty array if searchTerm is empty
    }

    try {
      const response = await axios.get(url, { headers });
      return response.data;
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      throw new Error(error.response.data);
    }
  }
);
export const fetchSyllabus = createAsyncThunk(
  "trainingProgram/fetchSyllabus",
  async (searchTerm) => {
    const url = `https://f-m-c-v3.azurewebsites.net/api/syllabus/list-by-training-program/${searchTerm}`;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    try {
      const response = await axios.get(url, { headers });
      return response.data;
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      throw new Error(error.response.data);
    }
  }
);

export const trainingProgramSlice = createSlice({
  name: "trainingProgram",
  initialState: {
    trainingProgramData: [],
    Syllabus5: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrainingProgramData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTrainingProgramData.fulfilled, (state, action) => {
        state.loading = false;
        state.trainingProgramData = action.payload;
      })
      .addCase(fetchTrainingProgramData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.trainingProgramData = [];
        state.trainingProgramData = action.payload;

        console.log("error", state.error);
      })
      .addCase(fetchSyllabus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSyllabus.fulfilled, (state, action) => {
        state.loading = false;
        state.Syllabus5 = action.payload;
      })
      .addCase(fetchSyllabus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
