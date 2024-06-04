import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchListSyllabus = createAsyncThunk(
  "syllabus/fetchListSyllabus",
  async (queryParams) => {
    const baseUrl = "https://f-m-c-v3.azurewebsites.net/api/syllabus/list";
    const response = await fetch(baseUrl, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    return data;
  }
);

export const outputStandardSyllabus = createAsyncThunk(
  "syllabus/outputStandardSyllabus",
  async (syllabusId, thunkAPI) => {
    const baseUrl = `https://f-m-c-v3.azurewebsites.net/api/osd/syllabus/${syllabusId}`;
    const response = await fetch(baseUrl, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    return data;
  }
);

export const deleteSyllabus = createAsyncThunk(
  "syllabus/deleteSyllabus",
  async (syllabusId) => {
    const baseUrl = `https://f-m-c-v3.azurewebsites.net/api/syllabus/delete/${syllabusId}`;
    const response = await fetch(baseUrl, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    return data;
  }
);

export const viewDetailSyllabus = createAsyncThunk(
  "syllabus/viewDetailSyllabus",
  async ({ id, token }, thunkAPI) => {
    const response = await fetch(
      `https://f-m-c-v3.azurewebsites.net/api/syllabus/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    return data;
  }
);

export const durationDataPieChart = createAsyncThunk(
  "syllabus/durationDataPieChart",
  async (params, thunkAPI) => {
    const { id, token } = params;
    const response = await fetch(
      `https://f-m-c-v3.azurewebsites.net/api/syllabus/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "*/*",
        },
      }
    );
    const data = await response.json();
    return data;
  }
);

export const deliveryDataPieChart = createAsyncThunk(
  "syllabus/deliveryDataPieChart",
  async (params, thunkAP) => {
    const { id, token } = params;
    const baseUrl = `https://f-m-c-v3.azurewebsites.net/api/delivery/${id}`;
    const response = await fetch(baseUrl, {
      headers: { Authorization: `Bearer ${token}` },
      Accept: "*/*",
    });
    const data = await response.json();

    return data;
  }
);

export const syllabusSlice = createSlice({
  name: "syllabus",
  initialState: {
    syllabusListData: [],
    syllabusDetailData: [],
    outputStandardSyllabusData: [],
    post: [],
    loading: false,
    error: null,
    durationData: [],
    deliveryData: [],
  },
  reducers: {
    // deleteSyllabus: (state, action) => {
    //   state.syllabusListData = state.syllabusListData.filter(
    //     (data) => data.id !== action.payload
    //   );
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchListSyllabus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchListSyllabus.fulfilled, (state, action) => {
        state.loading = false;
        state.syllabusListData = action.payload;
      })
      .addCase(fetchListSyllabus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(outputStandardSyllabus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(outputStandardSyllabus.fulfilled, (state, action) => {
        state.loading = false;
        state.outputStandardSyllabusData = action.payload;
      })
      .addCase(outputStandardSyllabus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(viewDetailSyllabus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(viewDetailSyllabus.fulfilled, (state, action) => {
        state.loading = false;
        state.syllabusDetailData = action.payload;
      })
      .addCase(viewDetailSyllabus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteSyllabus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSyllabus.fulfilled, (state, action) => {
        state.loading = false;
        state.post = action.payload;
      })
      .addCase(deleteSyllabus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // ---------------------------------
      .addCase(deliveryDataPieChart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deliveryDataPieChart.fulfilled, (state, action) => {
        state.loading = false;
        state.deliveryData = action.payload;
      })
      .addCase(deliveryDataPieChart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // ------------------------------------------
      .addCase(durationDataPieChart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(durationDataPieChart.fulfilled, (state, action) => {
        state.loading = false;
        state.durationData = action.payload;
      })
      .addCase(durationDataPieChart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// export const { deleteSyllabus } = syllabusSlice.actions;

export const { reducer: syllabusReducer } = syllabusSlice;

export default syllabusReducer;
