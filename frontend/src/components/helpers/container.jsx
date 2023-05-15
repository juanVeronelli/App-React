import React, { useState, useEffect } from "react";
import Images from "./images";
import axios from "axios";

const Container = (props) => {
  const { token } = props;
  const cards = [];

  const [imagesData, setImagesData] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/images/g", {
        method: "GET",
        headers: {
          "x-access-token": token,
        },
      })
      .then((response) => {
        setImagesData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
      <Images
        key={i}
        user={images[i]}
        image={images[i].url}
        username={images[i].user.username}
      />
    );
  }

  return <>{cards}</>;
};

export default Container;
