import React from "react";

// for styling
import { Typography, makeStyles } from "@material-ui/core";

// CSS - Material UI
const useStyles = makeStyles({
  title: {
    marginTop: "22px",
    fontSize: "30px",
    textAlign: "center",
    fontWeight: "bold",
  },
});

const HeaderContent = (props) => {
  const classes = useStyles();

  return (
    <>
      <Typography className={classes.title}>{props.header}</Typography>
    </>
  );
};

export default HeaderContent;
