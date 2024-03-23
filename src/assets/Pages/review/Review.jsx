import React, { useState } from "react";
import "./rev.css";
import axios from "axios";
import { Bounce, Slide, toast } from "react-toastify";
import { object, string } from "yup";
import { Link, useNavigate, useParams } from "react-router-dom";

function Review() {
  const { id } = useParams();
  console.log(id);
  const [errors, setError] = useState([]);
  const navgate = useNavigate();
  const [loader, setLoadr] = useState(false);
  const [user, setUser] = useState({
    comment: "",
    rating: "",
  });
  const handelChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  
  const validationData = async () => {
    const regiSchema = object({
      comment: string().required().min(5).max(20),
      rating: string().required().max(20),
    });

    try {
      await regiSchema.validate(user, { abortEarly: false });
      setError([]); // Clear any previous errors
      return true; // Validation succeeded
    } catch (err) {
      setError(err.errors);
      setLoadr(false);
       toast.error(err, {
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
  };
  const handelSubmit = async (e) => {
    e.preventDefault();
    setLoadr(true);
    if (await validationData()) {
      try {
        const { data } = await axios.post(
          `${import.meta.env.VITE_API}/products/${id}/review`,
          {
            comment: user.comment,
            rating: user.rating,
          },
          {
            headers: {
              Authorization: `Tariq__${token}`,
            },
          }
        );

        setUser({
          comment: "",
          rating: "",
        });
        if (data.message == "success") {
          toast.success("تم اضافة تعليق  بنجاح !", {
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
              <label> Comment</label>
              <input
                type="text"
                name="comment"
                value={user.comment}
                onChange={handelChange}
              />
              <label> Rating</label>
              <br /> <br />
              <input
                type="number"
                name="rating"
                value={user.rating}
                onChange={handelChange}
              />
              <br /> <br />
              <button
                type="submit"
                className="btn btn-outline-success"
                disabled={loader ? "disabled" : null}
              >
                {!loader ? "Add" : "wait...."}
              </button>
            </form>
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

export default Review;
