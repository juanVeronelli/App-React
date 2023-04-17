import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Container from "./helpers/container";

// styles
import { Link } from "react-router-dom";

const Home = () => {
  const state = useLocation();
  const navigation = useNavigate();
  const token = state.state.userData

  useEffect(() => {
    try {
      if (token) {

        const decodedToken = jwt_decode(token);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp < currentTime) {
          alert("la sesion a expirado seras redirigdo");
          navigation("/login");
        }
      } else if (!token) {
        navigation("/login");
      }
    } catch {
      navigation("/login");
    }
  }, [state]);

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
                to='/home'
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/profile">
                Profile
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard">
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
            Post photo
          </button>
        </div>
      </div>
    </nav>
      <div className="container mt-5">
        <h1> Images posted by users</h1>
        <div className="row row-cols-1 row-cols-md-3 g-4 mt-2">
          <Container token= {token} />
        </div>
      </div>
    </>
  );
};

export default Home;
