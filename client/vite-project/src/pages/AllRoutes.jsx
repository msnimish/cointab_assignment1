import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import Login from './Login'
// export let backend_url = "http://localhost:8000";
export let backend_url = "https://encouraging-red-hospital-gown.cyclic.app"

const AllRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Login/>}></Route>
        <Route path="/home" element={<Home/>}></Route>
    </Routes>
  )
}

export default AllRoutes