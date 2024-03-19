import React from 'react'
import { Navigate } from 'react-router-dom';

function unProtectedRoutes({children}) {
    const token=localStorage.getItem('userToken');
    if(!token){
      return children;
    }
  return <Navigate to='/signin'  replace/>

}

export default unProtectedRoutes