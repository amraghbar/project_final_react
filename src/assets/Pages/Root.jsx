import React from 'react'
import Navbar from './Navbar/Navbar'
import Home from './Home/Home'
import { Outlet } from 'react-router-dom'
import Hero from './Hero/Hero'

function Root() {
  return (
    
    <>
   <Navbar/>
   <Outlet/>

    </>
  )
}

export default Root