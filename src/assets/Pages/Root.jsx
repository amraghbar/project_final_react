import React from "react";
import Navbar from "./Navbar/Navbar";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Footer from "./Footer/Footer";

function Root() {
  return (
    <div className="container-fluid">
      <Navbar />
      <Outlet />
      <Footer/>
      <ToastContainer />
    </div>
  );
}

export default Root;
