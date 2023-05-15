import react, { useState } from "react";
import "../../../public/images.css";
import user from "../../../public/assets/user.png";
import axios from "axios";
import Cookies from "js-cookie";
const Dash = ({ user, username, image }) => {
    const handleRemove = async() => {
        axios.post('http://localhost:3000/images/remove', user, {
            headers:{
                'x-access-token': Cookies.get("token")
            }
        })
    }
  return (
    <div className="card card-overlay">
      <img src={image} className="" alt="..." />
      <div className="profile-info">
        <button className="btn-red rounded-pill" onClick={handleRemove}> Remove  </button>
      </div>
    </div>
  );
};

export default Dash;
