import React, { useState } from "react";

import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  on: {
    color: "#000",
  },
  off: {
    color: "#ccc",
  },
}));

const StarRating = () => {
  const classes = useStyles();

  // States
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <div className="star-rating">
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            type="submit"
            key={index}
            className={index <= (hover || rating) ? classes.on : classes.off}
            onClick={() => setRating(index)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}
            style={{
              backgroundColor: "transparent",
              border: "none",
              outline: "none",
              cursor: "pointer",
            }}
          >
            <span className="star">&#9733;</span>
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;
