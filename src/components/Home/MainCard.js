import React from "react";

// For Styling
import { Box, makeStyles, Grid } from "@material-ui/core";

import { Link } from "react-router-dom";

// CSS - Material UI
const useStyles = makeStyles({
  card: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  image: {
    width: "100%",

    height: "450px",
  },
});

const MainCard = (props) => {
  const classes = useStyles();

  return (
    <>
      <Grid item xs={12} md={4} xl={4}>
        <Link to={props.link}>
          <Box className={classes.card}>
            <Box className={classes.img}>
              <img src={props.url} alt={props.alt} className={classes.image} />
            </Box>
          </Box>
        </Link>
      </Grid>
    </>
  );
};

export default MainCard;
