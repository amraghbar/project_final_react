import React from "react";
import Navbar from "./Navbar/Navbar";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function Root() {
  return (
    <>
      <ToastContainer position="top-right" />
      <Navbar />
      <Outlet />
    </>
  );
}

export default Root;
