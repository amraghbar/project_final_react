import React from 'react'
import "./Signup.css";
function Signin() {
  return (
    <>
    
    <div className="main-w3layouts wrapper bacgco">
        <h1>Create new account</h1>
        <div className="main-agileinfo">
          <div className="agileits-top">
            <form >
        
              <label > Email</label>
              <input className="text email" type="email" name="email" />
              <label > Password</label>
              <input className="text" type="password"name="password" />
             
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