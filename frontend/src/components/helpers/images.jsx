import react, { useState } from "react";
import "../../../public/images.css";
import user from "../../../public/assets/user.png";

const Images = ({ user, username, image }) => {
  return (
    <div className="card card-overlay">
      <img src={image} className="" alt="..." />
      <div className="profile-info">
        <img
          src={user.user.profileImage}
          className="profile-image image-icon"
          alt="profile picture"
        />
        <h4 className="profile-name">{username}</h4>
        <span className="profile-date">{user.date}</span>
      </div>
    </div>
  );
};

export default Images;
