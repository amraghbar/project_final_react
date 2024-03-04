import React, { useState } from "react";
import "./Signup.css";
import axios from "axios";
import { toast } from "react-toastify";
import { object, string } from "yup";

function Signup() {
  const [errors, setError] = useState([]);
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
  const validationData = async () => {
    const regiSchema = object({
      userName: string().required().min(5).max(20),
      email: string().email().required(),
      password: string().required().min(5).max(20),
      image: string().required(),
    });
  
    try {
      await regiSchema.validate(user, { abortEarly: false });
      setError('');

      return true; // Validation succeeded
    } catch (err) {
      console.log("err", err.errors);
      setError(err.errors)
      return false; // Validation failed
    }
  };
  

  const handelSubmit = async (e) => {
    e.preventDefault();

    if(await validationData()){
      try {
       
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
  
        toast.success("Success Notification !");
      } catch (error) {
        console.log(error);
        toast.error("حدث خطأ في عملية التسجيل!");
      }
    }
   
  };
  return (
    <>
<div>
  {errors.length > 0 ? errors.map((x, index) => <p key={index}>{x}</p>) : ""}
</div>
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
              <br />
              <input type="file" name="image" onChange={handelChangeimg} />
              <br />
              <br /> <br />
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
