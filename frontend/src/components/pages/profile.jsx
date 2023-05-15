import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import cookie from "js-cookie";

import axios from "axios";

import expired from "../helpers/expiredToken";

import "../../../public/background.css";
import defaultPicture from "../../../public/assets/user.png";

function ProfilePage() {
  const navigation = useNavigate();
  const [user, setUser] = useState({
    username: String,
    email: String,
    birthdate: Date,
    profilePicture: File,
  });

  const [editUser, setEditUser] = useState({
    username: String,
    birthdate: Date,
    profilePicture: File,
  });

  const [open, setOpen] = useState(false);

  const editProfile = () => {
    setOpen(true);
    return open;
  };

  const handleChange = (event) => {
    setEditUser({
      ...editUser,
      [event.target.name]:
        event.target.name != "profilePicture"
          ? event.target.value
          : event.target.files[0],
    });
  };

  const handleLogout = async (event) => {
    event.preventDefault();
    cookie.remove("token");
    navigation("/login");
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      const userData = {
        username: editUser.username,
        birthdate: editUser.birthdate,
        profilePicture: editUser.profilePicture,
      };
      console.log(userData);
      await axios.post("http://localhost:3000/upload", userData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-access-token": cookie.get("token"),
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    try {
      if (expired(cookie.get("token"))) return navigation("/login");

      axios
        .get(`http://localhost:3000/profile`, {
          method: "GET",
          headers: {
            "x-access-token": cookie.get("token"),
          },
        })
        .then((response) => {
          setUser({
            username: response.data.user.username,
            email: response.data.user.email,
            birthdate: response.data.user.birthday,
            profilePicture: response.data.user.profileImage,
          });
        });
    } catch (err) {
      console.log(err);
    }
  });

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
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-10 col-lg-10 col-xl-10">
            <div className="card shadow-lg border-0 rounded-lg mt-4">
              <div className="card-header text-center">
                <h1 className="text-center font-weight-light mb-4 my-4 fs-2 ">
                  {" "}
                  Your profile{" "}
                </h1>
                <img
                  src={user.profilePicture || defaultPicture}
                  className="img-fluid"
                  alt=""
                />
                <div className={open ? "hidden" : "visible"}>
                  <h2 className=" font-weight-light mt-5 ">
                    {" "}
                    Username: {user.username}{" "}
                  </h2>
                  <h2 className=" font-weight-light mt-5">
                    {" "}
                    Email: {user.email}{" "}
                  </h2>
                  <h2 className=" font-weight-light mt-5">
                    {" "}
                    Birthdate: {user.birthdate}{" "}
                  </h2>
                  <button
                    onClick={editProfile}
                    className="btn btn-purple rounded-pill mt-5 mb-5"
                  >
                    {" "}
                    Edit Profile{" "}
                  </button>
                </div>
                <div className={open ? "visible" : "hidden"}>
                  <div className="d-flex w-100 justify-content-center">
                    <form
                      className="my-5"
                      encType="multipart/form-data"
                      onSubmit={handleSubmit}
                    >
                      <input
                        type="text"
                        className="form-control mb-3 w-100"
                        placeholder="Username"
                        name="username"
                        onChange={handleChange}
                      />
                      <input
                        type="date"
                        className="form-control mb-3 w-100"
                        name="birthdate"
                        placeholder="Birthday"
                        onChange={handleChange}
                      />
                      <input
                        type="file"
                        className="form-control w-100"
                        placeholder="Profile Picture"
                        name="profilePicture"
                        onChange={handleChange}
                      />
                      <button
                        type="submit"
                        className="btn btn-purple rounded-pill mt-5 mb-5"
                      >
                        Update Profile
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfilePage;
