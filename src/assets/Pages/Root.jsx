import React from 'react'
import Navbar from './Navbar/Navbar'
import Home from './Home/Home'
import { Outlet } from 'react-router-dom'

function Root() {
  return (
    
    <>
   <Navbar/>
   <Outlet/>
    </>
  )
}

export default Root