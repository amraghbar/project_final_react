import React, { useState } from "react";
import "./Signup.css";
import axios from "axios";
import { Bounce, Slide, toast } from "react-toastify";
import { object, string } from "yup";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const [errors, setError] = useState([]);
  const navgate=useNavigate();
  const [loader,setLoadr]=useState(false);
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
    setLoadr(true)
    if (await validationData()) {
      const fromData = new FormData();
      fromData.append("userName", user.userName);
      fromData.append("email", user.email);
      fromData.append("password", user.password);
      fromData.append("image", user.image);

      try {
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
        if (data.message == "success") {
          toast.success("تم التجسيل بنجاح !", {
            position: "bottom-center",
            autoClose: 5018,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
          });
        }
        navgate('/')
      } catch (err) {
        toast.error("حدث خطأ أثناء التسجيل!", {
            position: "bottom-center",
            autoClose: 5018,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
          });
      }
      finally {
        setLoadr(false);
      }
    }
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
      setError([]); // Clear any previous errors
      return true; // Validation succeeded
    } catch (err) {
      setError(err.errors);
      setLoadr(false);
      return false; // Validation failed
    }
  };
  return (
    <>
      <div>
        {errors.length > 0
          ? errors.map((x, index) => <p key={index}>{x}</p>)
          : ""}
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
              <button type="submit" className="btn btn-outline-success" disabled={loader?'disabled':null}>
               {!loader?'Register' : 'wait....'} </button>
            </form>
            <p>
              Do You Have An Account? <Link to="/signin">Sign In!</Link>
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