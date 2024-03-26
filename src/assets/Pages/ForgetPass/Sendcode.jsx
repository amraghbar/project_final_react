import React, { useState } from "react";
import "./ForgetPass.css";
import axios from "axios";
import { object, string } from "yup";
import { Bounce, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function ForgetPass() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true);

    try {
      const logSchema = object({
        email: string().email().required(),
      });

      await logSchema.validate({ email }, { abortEarly: false });

      const { data } = await axios.patch(`${import.meta.env.VITE_API}/auth/sendcode`, { email });
      console.log(data)
      setMessage(data.message);
      toast.success("Reset code sent successfully!");
      navigate("/ForgetPassword");
    } catch (err) {
      setErrors(err.errors);
      setMessage('Error sending reset password email. Please try again.');
      toast.error('Please provide a valid email address.', {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-w3layouts wrapper bacgco">
      <h1>Forgot Password</h1>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        
        <label>Email</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleChange}
              />
        <button type="submit" className="btn btn-outline-success" disabled={loading}>
          {loading ? "Sending..." : "Send Reset Code"}
        </button>
      </form>
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
  );
}

export default ForgetPass;
