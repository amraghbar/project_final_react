import React from 'react'
import { Navigate } from 'react-router-dom';

function unProtectedRoutes({child}) {
    const token=localStorage.getItem('userToken');
    if(token){
      return child;
    }
  return <Navigate to='/home'  replace/>

}

export default unProtectedRoutes