import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Container from "../helpers/container";
import cookie from 'js-cookie'


import expired from '../helpers/expiredToken'
// styles
import { Link } from "react-router-dom";

const Home = () => {
  const navigation = useNavigate();
  const token = cookie.get('token');


  useEffect(() => {
    try {
      if(expired(token)) return navigation("/login")
    } catch {
      navigation("/login");
    }
  }, []);

  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/home">
          Llive <span className="fw-bold">JPG</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className="nav-link active"
                aria-current="page"
                to={'/home'}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={'/profile'}>
                Profile
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={"/dashboard"}>
                Dashboard
              </Link>
            </li>
          </ul>
          <button
            type="button"
            className="btn btn-purple rounded-pill"
            data-bs-toggle="modal"
            data-bs-target="#postModal"
          >
            New Photo
          </button>
        </div>
      </div>
    </nav>
      <div className="container mt-5">
        <div className="row row-cols-1 row-cols-md-3 g-4 mt-2">
          <Container token= {token} />
        </div>
      </div>
    </>
  );
};

export default Home;
