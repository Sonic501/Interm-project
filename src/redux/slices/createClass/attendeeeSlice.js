import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const token =
  "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIzIiwiaWF0IjoxNjc4OTUzNjMyLCJleHAiOjE3NDIwNjc1MzZ9.oNbSE1phniTjfoBldw2ZfMJrjF4GsL1aqZr6HaDF21tD5c3DbQZaTnryLeRaLbu3DZlhRZSBXsZdIzroOWDsXQ";

export const fetchAttendee = createAsyncThunk(
  "trainingProgram/fetchAttendee",
  async () => {
    const url = "https://f-m-c-v3.azurewebsites.net/api/attendee";
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    try {
      const response = await axios.get(url, { headers });
      console.log("response", response.data);
      return response.data;
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      throw new Error(error.response.data);
    }
  }
);

export const attendeeSlice = createSlice({
  name: "attendee",
  initialState: {
    attendee: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAttendee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAttendee.fulfilled, (state, action) => {
        state.loading = false;
        state.attendee = action.payload;
      })
      .addCase(fetchAttendee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;

        console.log("error", state.error);
      });
  },
});
