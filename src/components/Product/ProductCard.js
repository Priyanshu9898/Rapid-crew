import React from "react";

// For Styling
import { makeStyles } from "@material-ui/core";
import { Card, Col } from "react-bootstrap";

// CSS -Material UI
const useStyles = makeStyles((theme) => ({
  image: {
    width: "100%",
    height: "450px",
    [theme.breakpoints.down("sm")]: {
      height: "300px",
    },
  },
  link: {
    textDecoration: "none",
    color: "inherit",
  },
  txt: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "14px",
    },
  },
}));

const ProductCard = (props) => {
  const classes = useStyles();

  return (
    <>
      {/* Getting data from props */}
      <Col xs={6} md={4} lg={4}>
        <a href={`/${props.title}`} className={classes.link}>
          <Card>
            <Card.Img variant="top" src={props.url} className={classes.image} />
            <Card.Body>
              <Card.Title className={classes.txt}>{props.title}</Card.Title>
              <Card.Text className={classes.txt}>{props.type}</Card.Text>
              <Card.Text>
                ₹ {props.price}
                <span
                  style={{ textDecoration: "line-through", marginLeft: "10px" }}
                >
                  ₹ {props.aPrice}
                </span>
                <span style={{ color: "red", marginLeft: "10px" }}>
                  {(
                    ((props.aPrice - props.price) / props.aPrice) *
                    100
                  ).toFixed()}
                  %OFF
                </span>
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <Card.Text>Inclusive of All Taxes</Card.Text>
            </Card.Footer>
          </Card>
        </a>
      </Col>
    </>
  );
};

export default ProductCard;
