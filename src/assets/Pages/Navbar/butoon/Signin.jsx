import React, { useState } from 'react'
import "./Signup.css";
import axios from 'axios';
function Signin() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const handelChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  const handelChangeimg = (e) => {
    const { name, files } = e.target;
    setUser({
      ...user,
      [name]: files[0],
    });
  };
  const handelSubmit = async (e) => {
    
    e.preventDefault();
   
    const { data } = await axios.post(`${import.meta.env.VITE_API}/auth/signin`,{user} );
   
   setUser({
    email: "",
    password: "",
  });
  console.log("تم بنجاح ")

   };
  
  return (
    <>
    
    <div className="main-w3layouts wrapper bacgco">
        <h1>Create new account</h1>
        <div className="main-agileinfo">
          <div className="agileits-top">
          <form onSubmit={handelSubmit}>
        
              <label > Email</label>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handelChange}
              />        
                    <label > Password</label>
                    <input
                type="password"
                name="password"
                value={user.password}
                onChange={handelChange}
              />             
              <button type="submit" defaultValue="SIGNUP">
        
                Submit
              </button>
            </form>
            <p>
               <a href="/signup">Create new account</a>
            </p>
          </div>
        </div>
        <ul className="colorlib-bubbles">
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
  </ul>
      </div>
    
    </>
  )
}

export default Signin