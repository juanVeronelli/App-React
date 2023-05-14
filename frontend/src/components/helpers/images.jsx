import react, { useState } from 'react';
import "../../../public/styles.css";
import user from "../../../public/assets/user.png"


const Images = ({username, image}) => {
    return (
        <div className="col">
          <div className="card card-overlay">
            <img src='https://via.placeholder.com/150x150' className="card-img-top" alt="..." />
            <div className="profile-info">
              <img src={user} className="profile-image" alt="profile picture" />
              <h4 className="profile-name">{username}</h4>
            </div>
          </div>
        </div>
      );
};

export default Images;
