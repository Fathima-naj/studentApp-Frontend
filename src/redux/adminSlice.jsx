import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../auth/axiosInstance";

export const createStudent = createAsyncThunk(
  "student/createStudent",
  async (formData, thunkAPI) => {
    try {
      const res = await axiosInstance.post(
        "/admin/createStudent",
        formData
      );
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Create failed"
      );
    }
  }
);

export const getStudents = createAsyncThunk(
  "student/getStudents",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get("/admin/getStudent");
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Fetch failed"
      );
    }
  }
);

export const updateStudent = createAsyncThunk(
  "student/updateStudent",
  async ({ id, formData }, thunkAPI) => {
    try {
      const res = await axiosInstance.put(
        `/admin/update/${id}`,
        formData
      );
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Update failed"
      );
    }
  }
);

export const deleteStudent = createAsyncThunk(
  "student/deleteStudent",
  async (id, thunkAPI) => {
    try {
      await axiosInstance.delete(`/admin/delete/${id}`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Delete failed"
      );
    }
  }
);

const initialState = {
  students: [],
  loading: false,
  error: null
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  extraReducers: (builder) => {
    builder

      .addCase(getStudents.pending, (state) => {
        state.loading = true;
      })
      .addCase(getStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.students = action.payload;
      })
      .addCase(getStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createStudent.fulfilled, (state, action) => {
        state.students.push(action.payload);
        state.error=action.payload|| action.error.message
      })
      .addCase(updateStudent.fulfilled, (state, action) => {
        state.students = state.students.map((student) =>
            student._id === action.payload._id
            ? action.payload
            : student
        );
        })

      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.students = state.students.filter(
          (student) => student._id !== action.payload
        );
      });
  }
});

export default adminSlice.reducer;