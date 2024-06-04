import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createSyllabusAPI,
} from "../../api/syllabus";


export const createSyllabus = createAsyncThunk(
  "syllabus/createSyllabus",
  async (syllabusData, thunkAPI) => {
    try {
      const response = await createSyllabusAPI(syllabusData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

