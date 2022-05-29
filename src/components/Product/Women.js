import React from "react";

// Components
import PosterImage from "./PosterImage";
import Catelogue from "./Catelogue";

const Women = () => {
  return (
    <>
      {/* poster */}
      <PosterImage url="./images/Category/Woman.jpg" alt="MEN" />
      {/* header */}
      <p
        style={{
          textAlign: "center",
          marginTop: "20px",
          fontSize: "30px",
          fontWeight: "bold",
        }}
      >
        Products for Women
      </p>
      {/* Products Catalogue */}
      <Catelogue catelogue="women" />
    </>
  );
};

export default Women;
