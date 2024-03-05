import React, { useState } from "react";
import "./Signup.css";
import axios from "axios";
import { object, string } from "yup";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function Signin() {
  const [errors, setError] = useState([]);

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
  const validationData = async () => {
    const regiSchema = object({
      email: string().email().required(),
      password: string().required().min(5).max(20),
    });

    try {
      await regiSchema.validate(user, { abortEarly: false });
      setError('');

      return true; // Validation succeeded
    } catch (err) {
      console.log("err", err.errors);
      setError(err.errors);
      return false; // Validation failed
    }
  };
  const handelSubmit = async (e) => {
    e.preventDefault();
    if (await validationData()) {
      try {
        const { data } = await axios.post(
          `${import.meta.env.VITE_API}/auth/signin`,
          { user }
        );

        setUser({
          email: "",
          password: "",
        });
        toast.success("Success Notification !");
      } catch (error) {
        toast.error("حدث خطأ في عملية الدخول!");
      }
    }
  };

  return (
    <>
      {errors.length > 0
        ? errors.map((x, index) => <p key={index}>{x}</p>)
        : " "}

      <div className="main-w3layouts wrapper bacgco">
        <h1>Create new account</h1>
        <div className="main-agileinfo">
          <div className="agileits-top">
            <form onSubmit={handelSubmit}>
              <label> Email</label>
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
              <button type="submit" defaultValue="SIGNUP">
                Submit
              </button>
            </form>
            <p>
              <Link to="/signup">Create new account</Link>
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

export default Signin;
