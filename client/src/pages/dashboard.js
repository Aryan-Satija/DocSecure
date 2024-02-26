import React from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar } from '../components/navbar'
export const Dashboard = () => {
  return (
    <div>
      <Navbar/>
      <Outlet/>
    </div>
  )
}
