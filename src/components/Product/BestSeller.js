import React from "react";

// Components
import PosterImage from "./PosterImage";
import Catelogue from "./Catelogue";

const BestSeller = () => {
  return (
    <>
      {/* Poster */}
      <PosterImage
        url="./images/Collection/BestSellerPoster.jpg"
        alt="BestSeller"
      />

      {/* header */}
      <p
        style={{
          textAlign: "center",
          marginTop: "20px",
          fontSize: "30px",
          fontWeight: "bold",
        }}
      >
        Most Loved Products
      </p>

      {/* Get the catalogue of data */}
      <Catelogue catelogue="bestseller" />
    </>
  );
};

export default BestSeller;
