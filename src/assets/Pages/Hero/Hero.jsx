import React, { useContext } from "react";
import style from "./Hero.module.css";
import { UserContext } from "../../Context/User";

import { Link } from "react-router-dom";
import Signin from "./../Navbar/butoon/Signin";
function Hero() {
  const { userToken } = useContext(UserContext);
  return (
    <header className={style.hedflex}>
      <div
        className={`p-5 text-center bg-image ${style.herimg}`}
        style={{
          backgroundImage: 'url("hero.jpg")',
          height: 695,
          width: "87%",
        }}
      >
        <div className={`mask ${style.herobg}`}>
          <div className="d-flex justify-content-center align-items-center h-100">
            <div className="text-white p-3">
              {userToken ? (
                <>
                  <h1 className={`mb-3 ${style.texthero}`}>
                    {" "}
                    welcome 
                  </h1>
                  <h4 className={`mb-3 ${style.texthero}`}>Subheading</h4>
                </>
              ) : (
                <>
                  <h1 className={`mb-3 ${style.texthero}`}>Heading</h1>
                  <h4 className={`mb-3 ${style.texthero}`}>Subheading</h4>
                  <Link
                    data-mdb-ripple-init
                    className="btn btn-outline-light btn-lg"
                    to="/signup"
                    role="button"
                  >
                    Login
                  </Link>
                  <Link
                    data-mdb-ripple-init
                    className="btn btn-outline-light btn-lg"
                    to="/signin"
                    role="button"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Background image */}
    </header>
  );
}

export default Hero;
