import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const token =
  "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIzIiwiaWF0IjoxNjc4OTUzNjMyLCJleHAiOjE3NDIwNjc1MzZ9.oNbSE1phniTjfoBldw2ZfMJrjF4GsL1aqZr6HaDF21tD5c3DbQZaTnryLeRaLbu3DZlhRZSBXsZdIzroOWDsXQ";

export const fetchTrainingClassDataDetail = createAsyncThunk(
  "trainingClass/fetchTrainingClassData",
  async (queryParams) => {
    const { id } = queryParams;
    const baseUrl = `https://f-m-c-v3.azurewebsites.net/api/class/${id}`;
    // API
    const queryUrl = new URL(baseUrl);

    // add each query parameter to the URL
    for (const [key, value] of Object.entries(queryParams)) {
      queryUrl.searchParams.append(key, value);
    }

    try {
      const response = await axios.get(queryUrl.toString(), {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response === "Error Message : Training Class not found!") {
        return "Class not found";
      }
      return response;
    } catch (error) {
      throw new Error(error.response.data);
    }
  }
);

export const fetchTrainerTrainingClass = createAsyncThunk(
  "trainingClass/fetchTrainerTrainingClass",
  async (queryParams) => {
    const { id } = queryParams;
    const baseUrl = `https://f-m-c-v3.azurewebsites.net/api/user/all-class-trainers?${id}`;
    // API
    const queryUrl = new URL(baseUrl);

    // add each query parameter to the URL
    for (const [key, value] of Object.entries(queryParams)) {
      queryUrl.searchParams.append(key, value);
    }

    try {
      const response = await axios.get(queryUrl.toString(), {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response === "Error Message : Training Class not found!") {
        return "Class not found";
      }
      return response;
    } catch (error) {
      throw new Error(error.response.data);
    }
  }
);

export const fetchTrainingProgram = createAsyncThunk(
  "trainingClass/fetchTrainingProgram",
  async (queryParams) => {
    const { id } = queryParams;
    const baseUrl = `https://f-m-c-v3.azurewebsites.net/api/training-program/${id}`;
    // API
    const queryUrl = new URL(baseUrl);

    // add each query parameter to the URL
    for (const [key, value] of Object.entries(queryParams)) {
      queryUrl.searchParams.append(key, value);
    }

    try {
      const response = await axios.get(queryUrl.toString(), {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response === "Error Message : Training Class not found!") {
        return "Class not found";
      }
      return response;
    } catch (error) {
      throw new Error(error.response.data);
    }
  }
);

export const fetchAdminTraining = createAsyncThunk(
  "trainingClass/fetchAdminTraining",
  async (queryParams) => {
    const { id } = queryParams;
    const baseUrl = `https://f-m-c-v3.azurewebsites.net/api/user/all-class-admins?${id}`;
    // API
    const queryUrl = new URL(baseUrl);

    // add each query parameter to the URL
    for (const [key, value] of Object.entries(queryParams)) {
      queryUrl.searchParams.append(key, value);
    }

    try {
      const response = await axios.get(queryUrl.toString(), {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response === "Error Message : Training Class not found!") {
        return "Class not found";
      }
      return response;
    } catch (error) {
      throw new Error(error.response.data);
    }
  }
);


export const fetchTrainingListProgram = createAsyncThunk(
  "trainingClass/fetchTrainingListProgram",
  async (queryParams) => {
    const baseUrl = `https://f-m-c-v3.azurewebsites.net/api/training-program/list?pageNo=0&pageSize=10`;
    // API
   
    try {
      const response = await axios.get(baseUrl, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response === "Error Message : Training Class not found!") {
        return "Class not found";
      }
      return response;
    } catch (error) {
      throw new Error(error.response);
    }
  }
);

export const trainingClassDetailSlice = createSlice({
  name: "trainingClassDetail",
  initialState: {
    trainingClassDataDetail: [],
    trainingTrainerClassdata: null,
    listTrainingProgram: [],
    trainingProgram: [],
    adminTraining:[],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrainingClassDataDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTrainingClassDataDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.trainingClassDataDetail = action.payload;
      })
      .addCase(fetchTrainingClassDataDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchTrainerTrainingClass.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTrainerTrainingClass.fulfilled, (state, action) => {
        state.loading = false;
        state.trainerTrainerClassdata = action.payload;
      })
      .addCase(fetchTrainerTrainingClass.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchTrainingProgram.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTrainingProgram.fulfilled, (state, action) => {
        state.loading = false;
        state.trainingProgram = action.payload;
      })
      .addCase(fetchTrainingProgram.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchTrainingListProgram.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTrainingListProgram.fulfilled, (state, action) => {
        state.loading = false;
        state.listTrainingProgram = action.payload;
      })
      .addCase(fetchTrainingListProgram.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      }).addCase(fetchAdminTraining.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminTraining.fulfilled, (state, action) => {
        state.loading = false;
        state.adminTraining = action.payload;
      })
      .addCase(fetchAdminTraining.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { reducer: classDetailReducer } = trainingClassDetailSlice;
export default classDetailReducer;
