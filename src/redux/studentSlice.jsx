import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../auth/axiosInstance";

export const getOwnData = createAsyncThunk(
  "student/getOwnData",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get("/student/getStudent");
      console.log(res.data); 
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || "Fetch failed");
    }
  }
);

const initialState = {
  student: null,  
  loading: false,
  error: null,
};

const studentSlice = createSlice({
  name: "student",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getOwnData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOwnData.fulfilled, (state, action) => {
        state.loading = false;
        state.student = action.payload; 
      })
      .addCase(getOwnData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default studentSlice.reducer;