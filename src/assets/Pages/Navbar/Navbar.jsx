import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import "./Navbar.css";
import style from "../Carts/Cartshop.module.css";
import { Button } from "react-bootstrap";
import { UserContext } from "../../Context/User";
import { BsPersonCircle } from "react-icons/bs";
import { FaShoppingCart } from "react-icons/fa";

function Navbar() {
  const [show, setShow] = useState(false);
  const { userName, userToken, setUserName, setUserToken } =
    useContext(UserContext);
  const navigate = useNavigate();
  const logout = () => {
    setUserName(null);
    setUserToken("");
    navigate("/home");
  };
  const handleShow = () => setShow(true);
  return (
    <>
      <nav className="navbar navbar-expand-md bg-danger fixed-bottom sticky-top shadow p-4 mb-8 rounded ">
        <div className="container-fluid">
          <Link className="navbar-brand text-primary col-2" to="/">
            <img src="6862535.png" style={{ width: "47%" }} />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse gap-3"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link text-light" to="/">
                  Home
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link text-light" to="/Products">
                  Products
                </NavLink>
              </li>
            </ul>

            {userToken ? (
              <>
                <div
                  className="collapse navbar-collapse "
                  id="navbarSupportedContent"
                >
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <NavLink className="nav-link text-light" to="/Categories">
                      Categories
                    </NavLink>

                    <NavLink className="nav-link text-light">
                      welcome {userName}
                    </NavLink>
                  </ul>
                  <div className="d-flex flex-wrap justify-content-center align-items-center gap-3">
                    <div>
                      <NavLink className="nav-link text-light" to="/Profile">
                        <BsPersonCircle className="bi bi-cart-dash text-light btn-outline-dark" />
                      </NavLink>
                    </div>
                    <div>
                      <NavLink className="nav-item bg-danger" to="/cart">
                        <button
                          className={`btn" btn-outline-success text-light nav-item bg-danger ${style.btncl}`}
                          type="submit"
                          onClick={handleShow}
                        >
                          <FaShoppingCart className="bi bi-cart-dash text-light btn-outline-light" />
                        </button>
                      </NavLink>
                    </div>
                  </div>
                </div>
                <Button onClick={logout} className="btn  ">
                  Log out{" "}
                </Button>
              </>
            ) : (
              <>
                <form className="d-flex gap-3" role="search">
                  <NavLink className="nav-item bg-danger" to="/cart">
                    <button
                      className={`btn" btn-outline-success nav-item bg-danger `}
                      type="submit"
                      onClick={handleShow}
                    >
                      <FaShoppingCart  className="bi bi-cart-dash text-light btn-outline-light " />
                    </button>
                  </NavLink>
                  <button className="btn btn-outline-success" type="submit">
                    <li className="nav-item dropdown list-unstyled">
                      <NavLink
                        className="nav-link dropdown-toggle"
                        to
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <BsPersonCircle className="bi bi-cart-dash text-light btn-outline-dark" />
                      </NavLink>

                      {/* login */}
                      <ul className="dropdown-menu">
                        <li className="nav-item">
                          <NavLink className="nav-link " to="/signup">
                            Sign Up
                          </NavLink>
                        </li>
                        <li className="nav-item">
                          <NavLink className="nav-link nav-item" to="/signin">
                            Sign IN
                          </NavLink>
                        </li>
                      </ul>
                    </li>
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
