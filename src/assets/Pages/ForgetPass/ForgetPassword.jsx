import React, { useState } from "react";
import "./ForgetPass.css";
import axios from "axios";
import { object, string } from "yup";
import { Bounce, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

function ForgetPassword() {
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
    code: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const validateData = async () => {
    const logSchema = object({
      email: string().email().required(),
      password: string().required().min(5).max(20),
      code: string().required().min(4).max(4),
    });

    try {
      await logSchema.validate(user, { abortEarly: false });
      setErrors([]);

      return true; // Validation succeeded
    } catch (err) {
      setErrors(err.errors);
      setLoading(false);
      err.errors.map((err) => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (await validateData()) {
      try {
        const { data } = await axios.patch(
          `${import.meta.env.VITE_API}/auth/forgotPassword`,
          { ...user }
        );
        setUser({
          email: "",
          password: "",
          code: "",
        });
        toast.success("Success Notification !");
        navigate("/signin");
      } catch (err) {
        setLoading(false);
        setErrors(err.errors);
        toast.error("Error sending reset password email. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <div className="main-w3layouts wrapper bacgco">
        <h1>Create new account</h1>
        <div className="main-agileinfo">
          <div className="agileits-top">
            <form onSubmit={handleSubmit}>
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
              />
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={user.password}
                onChange={handleChange}
              />
              <label>Code</label>
              <input
                type="text"
                name="code"
                value={user.code}
                onChange={handleChange}
              />
              <button
                type="submit"
                className="btn btn-outline-success"
                disabled={loading}
              >
                {!loading ? "Submit" : "Please wait..."}
              </button>
            </form>
           
          </div>
        </div>
        <ul className="colorlib-bubbles">
          {[...Array(16)].map((_, index) => (
            <li key={index}></li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default ForgetPassword;
