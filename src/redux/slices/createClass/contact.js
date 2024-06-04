import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const token =
  "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIzIiwiaWF0IjoxNjc4OTUzNjMyLCJleHAiOjE3NDIwNjc1MzZ9.oNbSE1phniTjfoBldw2ZfMJrjF4GsL1aqZr6HaDF21tD5c3DbQZaTnryLeRaLbu3DZlhRZSBXsZdIzroOWDsXQ";

export const fetchContact = createAsyncThunk(
  "trainingProgram/fetchContact",
  async () => {
    const url = "https://f-m-c-v3.azurewebsites.net/api/contact";
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

export const contactSlice = createSlice({
  name: "contact",
  initialState: {
    contact: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContact.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContact.fulfilled, (state, action) => {
        state.loading = false;
        state.contact = action.payload;
      })
      .addCase(fetchContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;

        console.log("error", state.error);
      });
  },
});
