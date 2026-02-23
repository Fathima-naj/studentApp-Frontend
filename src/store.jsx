import { configureStore } from '@reduxjs/toolkit'
import userReducer from "./redux/userSlice"
import studentReducer from './redux/studentSlice'

export const store = configureStore({
  reducer: {
    user:userReducer,
    student:studentReducer
  },
})