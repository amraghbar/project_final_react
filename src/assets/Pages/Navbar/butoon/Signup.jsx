import React, { useState } from "react";
import "./Signup.css";
import axios from "axios";
import { Bounce, Slide, toast } from "react-toastify";
import { object, string } from "yup";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const [errors, setError] = useState([]);
  const navgate = useNavigate();
  const [loader, setLoadr] = useState(false);
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
      image: string()
        .required()
        ,
    });

    try {
      await regiSchema.validate(user, { abortEarly: false });
      setError([]); // Clear any previous errors
      return true; // Validation succeeded
    } catch (err) {
      setError(err.errors);
      setLoadr(false);
      errors.map((err) => {
        return toast.error(err, {
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
      });
      return false; // Validation failed
    }
  };
  const handelSubmit = async (e) => {
    e.preventDefault();
    setLoadr(true);
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
          toast.success("يرجى تاكيد على الحساب من خلال الايميل!", {
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
        navgate("/signin");
      } catch (err) {
        setLoadr(false);
        setError(err.errors);
      } finally {
        setLoadr(false);
      }
    }
  };

  return (
    <>
      <div className="main-w3layouts wrapper bacgco">
        <h1>Create new account</h1>
        <div className="main-agileinfo">
          <div className="agileits-top">
            <form onSubmit={handelSubmit}>
              <label className="text-light"> User name</label>
              <input
                type="text"
                name="userName"
                value={user.userName}
                onChange={handelChange}
              />
              <label className="text-light"> email</label>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handelChange}
              />
              <label className="text-light"> Password</label>
              <input
                type="password"
                name="password"
                value={user.password}
                onChange={handelChange}
              />
              <label className="text-light">Image </label>
              <br />
              
              <input
                type="file"
                id="File Image "
                name="image"
                onChange={handelChangeimg}
                className="text-light"
              />
              <br />
              <br /> <br />
              <button
                type="submit"
                className="btn btn-light text-danger"
                disabled={loader ? "disabled" : null}
              >
                {!loader ? "Register" : "wait...."}
              </button>
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
