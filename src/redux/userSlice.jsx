import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../auth/axiosInstance";

export const registerUser=createAsyncThunk('/user/registerUser',
    async(formData,thunkAPI)=>{
        try {
        const res=await axiosInstance.post('/user/register',formData)
        return  res.data;
        } catch (error) {
           return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

export const loginUser=createAsyncThunk('/user/loginUser',
    async(formData,thunkAPI)=>{
        try {
            const res=await axiosInstance.post('/user/login',formData)
            console.log('res.data');
            
            return res.data;
        } catch (error) {
             return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

const initialState = {
  user: null,
  loading: false,
  error: null,
  role:null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

     
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        localStorage.setItem("token", action.payload.token);
        // localStorage.setItem("role",action.payload.user.role)
        state.role=action.payload.user.role;
        })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { logout ,clearError} = userSlice.actions;
export default userSlice.reducer;