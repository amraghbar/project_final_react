import React, { useContext, useState } from "react";
import "./Signup.css";
import axios from "axios";
import { object, string } from "yup";
import { Bounce, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../../Context/User";

function Signin() {
  const { setUserToken } = useContext(UserContext)
  const [errors, setError] = useState([]);
  const navgate = useNavigate();
  const [loader, setLoadr] = useState(false);
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
  
  const validationData = async () => {
    const logSchema = object({
      email: string().email().required(),
      password: string().required().min(5).max(20),
    });

    try {
      await logSchema.validate(user, { abortEarly: false });
      setError([]);

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
      try {
        const { data } = await axios.post(
          `${import.meta.env.VITE_API}/auth/signin`,
          { email: user.email, password: user.password }
        );
        setUser({
          email: "",
          password: "",
        });
        setUserToken(data.token);
        toast.success("Success SigIn !");
        navgate("/Categories");

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
              <button
                type="submit"
                defaultValue="SIGNUP"
                className="btn btn-outline-success"
              >
                {!loader ? "SIGNUP" : "wait...."}
              </button>
            </form>
            <p>
              <Link to="/signup">Create new account</Link>
            </p>
            <p>
              <Link to="/sendcode">Forget Password</Link>
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
