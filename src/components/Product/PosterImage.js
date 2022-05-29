import React from "react";
// for styling
import { makeStyles } from "@material-ui/core";

// CSS - Material UI
const useStyles = makeStyles({
  image: {
    width: "100%",
    height: "auto",
  },
});

const PosterImage = (props) => {
  const classes = useStyles();

  return (
    <>
      {/* getting data from props */}
      <img src={props.url} alg={props.alt} className={classes.image} />
    </>
  );
};

export default PosterImage;
