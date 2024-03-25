import React from "react";
import { Link, NavLink } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import { FaThreads } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

import { FaGithub } from "react-icons/fa";

function Footer() {
  return (
    <>
      <footer className="text-center text-lg-start  bg-danger text-white mt-4">
        {/* Section: Social media */}
        <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
          {/* Left */}
          <div className=" me-5 d-none d-lg-block">
            <span>Get connected with us on social networks:</span>
          </div>
          {/* Right */}
          <div>
            <Link
              to="https://www.facebook.com/amr.aghbar.1"
              className="me-4 text-reset"
            >
            <FaFacebook />

            </Link>
            <Link
              to="https://www.threads.net/@_a._.m._.r._"
              className="me-4 text-reset"
            >
             <FaThreads />

            </Link>
            <Link to="mailto:amrtaghbar@gmil.com" className="me-4 text-reset">
            <MdEmail />

            </Link>
            <Link
              to="https://www.instagram.com/_a._.m._.r._/"
              className="me-4 text-reset"
            >
              <FaInstagram />

            </Link>
            <Link
              to="https://www.linkedin.com/in/amr-aghbar-240617253/"
              className="me-4 text-reset"
            >
            <FaLinkedin />

            </Link>
            <Link to="https://github.com/amraghbar" className="me-4 text-reset">
            <FaGithub />

            </Link>
          </div>
          {/* Right */}
        </section>

        <section >
          <div className="container text-center text-md-start mt-5">
            <div className="row mt-3">
              <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                {/* Content */}
                <h6 className="text-uppercase fw-bold mb-4">
                  <i className="fas fa-gem me-3" />
                  <img src="6862535.png" style={{ width: '80%' }} />
                </h6>

              </div>

              <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
              <NavLink className="nav-link text-light" to="/Products">
                  Products
                </NavLink>
              </div>

             
              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                <p>
                  <i className="fas fa-home me-3" /> Palestine , Nablus
                </p>
                <p>
                  <i className="fas fa-envelope me-3" />
                  amrtaghbar@gmail.com{" "}
                </p>
                <p>
                  <i className="fas fa-phone me-3" /> 059 503 1558{" "}
                </p>
                <p>
                  <i className="fas fa-print me-3" />{" "}
                </p>
              </div>
            </div>
          </div>
        </section>

        <div
          className="text-center p-4"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
        >
          <Link className="text-reset fw-bold" to="/">
            Online Shop --Amr Aghbar
          </Link>
        </div>
      </footer>
    </>
  );
}

export default Footer;
