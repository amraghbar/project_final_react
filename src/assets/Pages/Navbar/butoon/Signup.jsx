import React, { useState } from "react";
import "./Signup.css";
import axios from "axios";
function Signup() {
  const [user, setUser] = useState({
    userName: "",
    email: "",
    password: "",
    image: "",
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
    const fromData = new FormData();
    fromData.append("userName", user.userName);
    fromData.append("email", user.email);
    fromData.append("password", user.password);
    fromData.append("image", user.image);

    const { data } = await axios.post(
      `${import.meta.env.VITE_API}/auth/signup`,
      fromData
    );
    setUser({
      userName: "",
      email: "",
      password: "",
      image: "",
    });
    console.log(data);
  };
  return (
    <>
      <div className="main-w3layouts wrapper bacgco">
        <h1>Create new account</h1>
        <div className="main-agileinfo">
          <div className="agileits-top">
            <form onSubmit={handelSubmit}>
              <label> User name</label>
              <input
                type="text"
                name="userName"
                value={user.userName}
                onChange={handelChange}
              />

              <label> email</label>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handelChange}
              />

              <label> Password</label>
              <input
                type="password"
                name="password"
                value={user.password}
                onChange={handelChange}
              />

              <label>Image </label>

              <br/>
              <input type="file" name="image" onChange={handelChangeimg} />
              <br/>
              <br/> <br/>
              <button type="submit">submit</button>
            </form>
            <p>
              Do You Have An Account? <a href="/signin">Sign In!</a>
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
  );
}

export default Signup;
