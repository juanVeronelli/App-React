import react, { useState } from 'react';
import "../../../public/styles.css";
import user from "../../../public/assets/user.png"


const Images = ({username, image}) => {
    return (
        <div class="col">
          <div class="card card-overlay">
            <img src='https://via.placeholder.com/150x150' class="card-img-top" alt="..." />
            <div class="profile-info">
              <img src={user} class="profile-image" alt="profile picture" />
              <h4 class="profile-name">{username}</h4>
            </div>
          </div>
        </div>
      );
};

export default Images;
