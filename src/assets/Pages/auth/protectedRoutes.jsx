import React from 'react'
import { Navigate } from 'react-router-dom';

function protectedRoutes({child}) {
    const token=localStorage.getItem('userToken');
    if(!token){
        return <Navigate to="/signin"  replace />
    }
  return child;
}

export default protectedRoutes