import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import "./Navbar.css";
import style from "../Carts/Cartshop.module.css";
import { Button } from "react-bootstrap";
import { UserContext } from "../../Context/User";

function Navbar() {
  const [show, setShow] = useState(false);
  const { userName, setUserToken, setUserName, userToken } =
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
      <nav className="  navbar navbar-expand-md bg-danger position-sticky shadow p-4 mb-8  rounded ">
        <div className="container-fluid">
          <Link className="navbar-brand text-primary" to="/">
            Shope
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
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
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
                  className="collapse navbar-collapse"
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
                  <div>
                    <NavLink className="nav-item bg-danger" to="/cart">
                      <button
                        className={`btn" btn-outline-success nav-item bg-danger ${style.btncl}`}
                        type="submit"
                        onClick={handleShow}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="22"
                          height="30"
                          fill="currentColor"
                          className="bi bi-cart-dash text-light"
                          viewBox="0 0 16 16"
                        >
                          <path d="M6.5 7a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1z" />
                          <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zm3.915 10L3.102 4h10.796l-1.313 7zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                        </svg>
                      </button>
                    </NavLink>
                  </div>
                </div>
                <Button onClick={logout} className="btn btn-outline-danger">
                  Log out{" "}
                </Button>
              </>
            ) : (
              <>
                <form className="d-flex gap-3" role="search">
                  <div className="d-flex ">
                    <input
                      className="form-control me-2"
                      type="search"
                      placeholder="Search Categories"
                      aria-label="Search"
                    />
                    <button className="btn btn-outline-success" type="submit">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-search text-light"
                        viewBox="0 0 16 16"
                      >
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                      </svg>
                    </button>
                  </div>
                  {/* seacevh */}
                  <button className="btn btn-outline-success" type="submit">
                    <li className="nav-item dropdown list-unstyled">
                      <NavLink
                        className="nav-link dropdown-toggle"
                        to
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-person-circle text-light "
                          viewBox="0 0 16 16"
                        >
                          <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                          <path
                            fillRule="evenodd"
                            d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                          />
                        </svg>
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
