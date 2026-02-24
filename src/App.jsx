import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import ProtectedRoute from './components/ProtectedRoute'
import Dashboard from './pages/Dashboard'
import AdminRoute from './components/AdminRoute'
import StudentDashboard from './pages/StudentDashboard'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/dashboard' element={<AdminRoute><Dashboard/></AdminRoute>}/>
        <Route path='/studentDashboard' element={<ProtectedRoute><StudentDashboard/></ProtectedRoute>}/>
      </Routes>
    </>
  )
}

export default App
