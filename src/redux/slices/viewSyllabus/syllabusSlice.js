import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const fetchListSyllabus = createAsyncThunk(
  "syllabus/fetchListSyllabus",
  async ({queryParams, token}, thunkAPI) => {
    const baseUrl = "https://f-m-c-v3.azurewebsites.net/api/syllabus/list";
    const queryUrl = new URL(baseUrl);

    for (const [key, value] of Object.entries(queryParams)) {
      queryUrl.searchParams.append(key, value);
    }

    try {
      const response = await axios.get(queryUrl.toString(), {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response === "Error Message : Syllabus not found!") {
        return "Syllabus not found";
      }
      return response;
    } catch (error) {
      throw new Error(error.response);
    }
  }
);

export const outputStandardSyllabus = createAsyncThunk(
  "syllabus/outputStandardSyllabus",
  async ({id, token}, thunkAPI) => {
    const baseUrl = `https://f-m-c-v3.azurewebsites.net/api/osd/syllabus/${id}`;
    const response = await fetch(baseUrl, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();

    return data;
  }
);

export const uploadSyllabus = createAsyncThunk(
  "syllabus/uploadSyllabus",
  async (fileContent) => {
    try {
      const response = await axios.post(
        "https://f-m-c-v3.azurewebsites.net/api/syllabus/read-file",
        {
          data: fileContent,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.data === "Error Message : View Syllabus not found!") {
        return "Syllabus not found";
      }
      return response.data;
    } catch (error) {
      throw new Error(error.response.data);
    }
  }
);

export const deleteSyllabus = createAsyncThunk(
  "syllabus/deleteSyllabus",
  async ({id, token}) => {
    const baseUrl = `https://f-m-c-v3.azurewebsites.net/api/syllabus/delete/${id}`;
    const response = await fetch(baseUrl, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    // console.log("Test delete", data);
    return data;
  }
);

export const duplicateSyllabus = createAsyncThunk(
  "syllabus/deleteSyllabus",
  async ({id, token}) => {
    const baseUrl = `https://f-m-c-v3.azurewebsites.net/api/syllabus/duplicate/${id}`;
    const response = await fetch(baseUrl, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    // console.log("Test duplicate", data);
    return data;
  }
);

export const viewDetailSyllabus = createAsyncThunk(
  "syllabus/viewDetailSyllabus",
  async ({id, token}, thunkAPI) => {
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


export const syllabusSlice = createSlice({
  name: "syllabus",
  initialState: {
    syllabusListData: [],
    syllabusDetailData: {},
    outputStandardSyllabusData: [],
    post: [],
    loading: false,
    error: null,
  },
  reducers: {
    changeStatus: (state, action) => {
      state.syllabusDetailData.status = action.payload;
    },
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

  },
});

export const { changeStatus } = syllabusSlice.actions;

