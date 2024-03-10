import React from "react";
import { Navigate } from "react-router-dom";

function PRoutes({ child }) {
  const token = localStorage.getItem("userToken");
  if (!token) {
    return <Navigate to="/signin" replace />;
  }
  return child;
}

export default PRoutes;
