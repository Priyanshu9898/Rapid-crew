import React, { useState } from "react";

// For Styling
import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";

const PosterCarousal = () => {

  // State
  const [index, setIndex] = useState(0);

  // Carousel
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <Link to="/bestSeller">
          <img
            className="d-block w-100"
            src="./images/Banners/banner1.jpg"
            alt="First slide"
          />
        </Link>
      </Carousel.Item>
      <Carousel.Item>
        <Link to="/bestSeller">
          <img
            className="d-block w-100"
            src="./images/Banners/banner2.jpg"
            alt="Second slide"
          />
        </Link>
      </Carousel.Item>
      <Carousel.Item>
        <Link to="/bestSeller">
          <img
            className="d-block w-100"
            src="./images/Banners/banner3.png"
            alt="Third slide"
          />
        </Link>
      </Carousel.Item>
    </Carousel>
  );
};

export default PosterCarousal;
