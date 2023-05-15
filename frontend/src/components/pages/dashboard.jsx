import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Dash from "../helpers/dashphotos";
import axios from "axios";
import '../../../public/images.css'
import cookie from "js-cookie";

const dashboard = () => {
  const cards = [];
  const navigation = useNavigate();
  const [imagesData, setImagesData] = useState(null);

  const handleLogout = async (event) => {
    event.preventDefault();
    cookie.remove("token");
    navigation("/login");
  };

  useEffect(()=>{
    axios.get('http://localhost:3000/images/dashboard', {
      headers: {
        'x-access-token': cookie.get("token")
      }
    }).then((response) => {
      setImagesData(response.data.data);
    })
  })

  if (!imagesData)
  return (
    <>
      {" "}
      <h1> Loading... </h1>
    </>
  );

  const { count, images } = imagesData;
  for (let i = 0; i < count; i++) {
    cards.push(
      <Dash
        key={i}
        user={images[i]}
        image={images[i].url}
      />
    );
  }
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
                  to={"/home"}
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/profile"}>
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
              className="btn btn-purple rounded-pill custome"
              data-bs-toggle="modal"
              data-bs-target="#postModal"
              onClick={handleLogout}
            >
              LogOut
            </button>
          </div>
        </div>
      </nav>
        <h1 className="title"> Your Photos </h1>
      <div className="grid-container">
        <div className="grid-display">
            {cards}
        </div>
      </div>
    </>
  );
};

export default dashboard;
