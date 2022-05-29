import React from "react";
// Component
import PosterImage from "./PosterImage";
import Catelogue from "./Catelogue";

const Men = () => {
  return (
    <>
      {/* Poster */}
      <PosterImage url="./images/Category/Men.jpg" alt="MEN" />

      {/* header */}
      <p
        style={{
          textAlign: "center",
          marginTop: "20px",
          fontSize: "30px",
          fontWeight: "bold",
        }}
      >
        Products for Men
      </p>

      {/* Products Catalogue */}
      <Catelogue catelogue="men" />
    </>
  );
};

export default Men;
