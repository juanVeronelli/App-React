import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import cookie from "js-cookie";

import axios from "axios";
const UploadMenu = () => {
  const navigation = useNavigate();
  const [image, setImage] = useState({
    title: String,
    description: String,
    image: File,
  });

  const handleChange = (event) => {
    event.preventDefault();
    setImage({
      ...image,
      [event.target.name]:
        event.target.name != "image"
          ? event.target.value
          : event.target.files[0],
    });
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      const date = new Date();
      const formData = new FormData();
      formData.append("title", image.title);
      formData.append("description", image.description);
      formData.append("date", date.toLocaleDateString());
      formData.append("image", image.image);

      await axios.post("http://localhost:3000/images/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-access-token": cookie.get("token"),
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

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
            >
              LogOut
            </button>
          </div>
        </div>
      </nav>
      <div className="container">
        <div className="row justify-content-center">
          <h1 className="text-center mb-0 mt-5">Upload Photo</h1>
          <div className="d-flex w-100 justify-content-center">
            <form
              className="my-5 justify-content-center"
              encType="multipart/form-data"
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                className="form-control mb-3 w-100"
                placeholder="Photo title"
                name="title"
                onChange={handleChange}
              />
              <textarea
                placeholder="Description"
                className="form-control mb-3 w-100"
                name="description"
                rows={6}
                cols={50}
                style={{ resize: "none" }}
                onChange={handleChange}
              ></textarea>
              <input
                type="file"
                className="form-control w-100"
                placeholder="Picture"
                name="image"
                onChange={handleChange}
              />
              <button
                type="submit"
                className="btn w-100 btn-purple rounded-pill mt-5 mb-5"
              >
                Post!
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadMenu;
