import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const token =
  "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIzIiwiaWF0IjoxNjc4OTUzNjMyLCJleHAiOjE3NDIwNjc1MzZ9.oNbSE1phniTjfoBldw2ZfMJrjF4GsL1aqZr6HaDF21tD5c3DbQZaTnryLeRaLbu3DZlhRZSBXsZdIzroOWDsXQ";
export const fetchContentData = createAsyncThunk(
  "trainingProgram/content",
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
export const fetfchUnitDaata = createAsyncThunk(
  "trainingProgram/fetfchUnitDaata",
  async (searchTerm) => {
    const url = `https://f-m-c-v3.azurewebsites.net/api/unit/list-by-session/2${searchTerm}`;
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
export const fetchTrainerData = createAsyncThunk(
  "trainingProgram/fetchTrainerData",
  async () => {
    const url = "https://f-m-c-v3.azurewebsites.net/api/user/trainer";
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
export const fetchLocation = createAsyncThunk(
  "trainingProgram/fetchLocation",
  async () => {
    const url = "https://f-m-c-v3.azurewebsites.net/api/location";
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
export const createClass = createAsyncThunk(
  "trainingProgram/createClass",
  async (ClassData) => {
    const url = "https://f-m-c-v3.azurewebsites.net/api/class";
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    const body = ClassData;
    try {
      const response = await axios.post(url, body, { headers });
      return response.data;
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      throw new Error(error.response.data);
    }
  }
);
export const deleteSyllabus = createAsyncThunk(
  "trainingProgram/deleteSyllabus",
  async (idS) => {
    const url = `https://f-m-c-v3.azurewebsites.net/api/syllabus/delete/${idS}`;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    try {
      const response = await axios.put(url, { headers });
      return idS;
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      throw new Error(error.response.data);
    }
  }
);
export const contentSlice = createSlice({
  name: "content",
  initialState: {
    contentData: [],
    unitData: [],
    trainerData: [],
    locationData: [],
    deletedState: "",
    loading: false,
    error: null,
    status: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContentData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContentData.fulfilled, (state, action) => {
        state.loading = false;
        state.contentData = action.payload;
      })
      .addCase(fetchContentData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteSyllabus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSyllabus.fulfilled, (state, action) => {
        state.loading = false;
        state.deletedState = action.payload;
        state.contentData = state.contentData.filter(
          (item) => item.id !== action.payload
        );
      })
      .addCase(deleteSyllabus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.contentData = state.contentData.filter(
          (item) => item.id !== action.payload
        );
      })
      .addCase(fetfchUnitDaata.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetfchUnitDaata.fulfilled, (state, action) => {
        state.loading = false;
        state.unitData = action.payload;
      })
      .addCase(fetfchUnitDaata.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchTrainerData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTrainerData.fulfilled, (state, action) => {
        state.loading = false;
        state.trainerData = action.payload;
      })
      .addCase(fetchTrainerData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createClass.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createClass.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload;
      })
      .addCase(createClass.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchLocation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLocation.fulfilled, (state, action) => {
        state.loading = false;
        state.locationData = action.payload;
      })
      .addCase(fetchLocation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
