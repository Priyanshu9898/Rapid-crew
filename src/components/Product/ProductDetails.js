import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

// For Styling
import { Box, Typography, makeStyles } from "@material-ui/core";
import { Row, Col, Container, Accordion } from "react-bootstrap";

// Components
import ProductCard from "./ProductCard";
import StarRating from "./StarRating";

// CSS- Material UI
const useStyle = makeStyles((theme) => ({
  img: {
    width: "350px",
    height: "350px",
    [theme.breakpoints.down("sm")]: {
      width: "350px",
      height: "350px",
    },
    [theme.breakpoints.down("md")]: {
      width: "300px",
      height: "300px",
    },
  },
  main: {
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
  },
  header: {
    fontSize: "30px",
    fontWeight: "bold",
    [theme.breakpoints.down("sm")]: {
      fontSize: "20px",
    },
  },
  type: {
    fontSize: "20px",
  },
  txt: {
    color: "grey",
  },
  headTxt: {
    fontSize: "16px",
    fontWeight: "bold",
  },
  headSpan: {
    fontWeight: "normal",
    fontSize: "15px",
  },
}));

const ProductDetails = () => {
  const classes = useStyle();

  // Get the title from url
  const { title } = useParams();

  // State for Product Details
  const [similarProd, setSimilarProd] = useState([]);
  const [recommandProd, setRecommandProd] = useState([]);
  const [loading, setLoading] = useState(true);
  const [thisProduct, setThisProduct] = useState({});

  // Set data for similar Products
  const setPData = (data) => {
    setSimilarProd(data);
  };

  // Set data for recommand Products
  const setRData = (data) => {
    setRecommandProd(data);
  };

  // Set data of the current product
  const setProd = (data) => {
    setThisProduct(data);
  };

  // Get the data from the API
  const getSimilarProd = async (e) => {
    setLoading(true);

    // Get all products data from the API
    const all = await axios.get(`/allProducts`);

    // fetch the current product data using product id from all products data
    setProd(all.data.filter((item) => item.title == title));

    setLoading(false);

    // Passing title to the API to get all similar products to the current product
    const response = await axios.get(`/prod/${title}`);

    // Set the data to the state
    setPData(response.data);

    // Passing title to the API to get recommandation to the current product
    const response2 = await axios.get(`/recommand/${title}`);
    setRData(response2.data);
  };

  // Every time page reloads, This will be executed first
  useEffect(() => {
    getSimilarProd();
  }, []);

  return (
    <>
      {/* if get the data then show otherwise loading  */}
      {loading ? (
        <>
          <h4>Loading...</h4>
        </>
      ) : (
        <>
          <Container>
            <Row>
              {/* Product Images */}
              <Col xs={12} md={7} xl={7} style={{ marginTop: " 40px" }}>
                <Row>
                  <Col className={classes.main}>
                    <img
                      src={thisProduct[0].img1}
                      alt="product"
                      className={classes.img}
                    />
                  </Col>
                  <Col className={classes.main}>
                    <img
                      src={thisProduct[0].img2}
                      alt="product"
                      className={classes.img}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col className={classes.main}>
                    <img
                      src={thisProduct[0].img3}
                      alt="product"
                      className={classes.img}
                    />
                  </Col>
                  <Col className={classes.main}>
                    <img
                      src={thisProduct[0].img4}
                      alt="product"
                      className={classes.img}
                    />
                  </Col>
                </Row>
              </Col>

              {/* Product Data */}
              <Col xs={12} md={5} xl={5}>
                <Box className="container" style={{ marginTop: "40px" }}>
                  <Typography className={classes.header}>
                    {thisProduct[0].title}
                  </Typography>
                  <Typography className={classes.type}>
                    {thisProduct[0].product_type}
                  </Typography>
                  <Typography className={classes.txt}>
                    By the RapidCrew
                  </Typography>

                  <hr />
                  <Typography className={classes.price}>
                    ₹ {thisProduct[0].variant_price}
                    <span
                      style={{
                        textDecoration: "line-through",
                        marginLeft: "10px",
                      }}
                    >
                      ₹ {thisProduct[0].variant_compare_at_price}
                    </span>
                    <span
                      className={classes.discount}
                      style={{ color: "red", marginLeft: "10px" }}
                    >
                      {(
                        ((thisProduct[0].variant_compare_at_price -
                          thisProduct[0].variant_price) /
                          thisProduct[0].variant_compare_at_price) *
                        100
                      ).toFixed()}
                      %OFF
                    </span>
                  </Typography>
                  <Typography className={classes.txt}>
                    Price inclusive of all taxes
                  </Typography>
                  <Typography
                    className={classes.type}
                    style={{ marginTop: "20px" }}
                  >
                    Enter Your Ratings
                  </Typography>

                  <Box style={{ marginTop: "10px" }}>
                    <StarRating />
                  </Box>

                  {/* Product Details */}
                  <Box style={{ marginTop: "20px" }}>
                    <Accordion defaultActiveKey={["0"]} alwaysOpen>
                      <Accordion.Item eventKey="0">
                        <Accordion.Header>Product Details</Accordion.Header>
                        <Accordion.Body>
                          <Typography className={classes.headTxt}>
                            Product Type:{" "}
                            <span className={classes.headSpan}>
                              {" "}
                              {thisProduct[0].product_type}
                            </span>
                          </Typography>
                          <Typography className={classes.headTxt}>
                            Brand:{" "}
                            <span className={classes.headSpan}>
                              {" "}
                              {thisProduct[0].brand}
                            </span>
                          </Typography>
                          <br />
                          <Typography className={classes.headTxt}>
                            Material & Care:{" "}
                            <span className={classes.headSpan}>
                              {" "}
                              {thisProduct[0].dominant_material}
                            </span>
                          </Typography>
                          <br />
                          <Typography className={classes.headTxt}>
                            Color:{" "}
                            <span className={classes.headSpan}>
                              {" "}
                              {thisProduct[0].actual_color}
                            </span>
                          </Typography>

                          <Typography className={classes.headTxt}>
                            Dominant Color:{" "}
                            <span className={classes.headSpan}>
                              {" "}
                              {thisProduct[0].dominant_color}
                            </span>
                          </Typography>
                        </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item eventKey="1">
                        <Accordion.Header>Product Description</Accordion.Header>
                        <Accordion.Body>
                          <Typography className={classes.headTxt}>
                            Product Details:{" "}
                            <span className={classes.headSpan}>
                              {thisProduct[0].product_details}
                            </span>
                          </Typography>
                          <br />
                          <Typography className={classes.headTxt}>
                            Complete The Look:{" "}
                            <span className={classes.headSpan}>
                              {thisProduct[0].complete_the_look}
                            </span>
                          </Typography>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  </Box>
                </Box>
              </Col>
            </Row>
          </Container>
        </>
      )}

      {/* show similar Products */}
      <Box
        className="container"
        style={{ marginTop: "40px", marginBottom: "30px" }}
      >
        <Typography
          style={{
            textAlign: "left",
            marginTop: "20px",
            fontSize: "30px",
            fontWeight: "bold",
            marginBottom: "20px",
          }}
        >
          Similar Products
        </Typography>
        <Row xs={1} md={2} className="g-4">
          {loading ? (
            <h4>Loading...</h4>
          ) : (
            similarProd.map((item) => {
              return (
                <ProductCard
                  id={item.product_id}
                  key={item.product_id}
                  url={item.img1}
                  title={item.title}
                  pTitle={item.title}
                  type={item.product_type}
                  price={item.variant_price}
                  aPrice={item.variant_compare_at_price}
                />
              );
            })
          )}
        </Row>
      </Box>

      {/* show recommand products */}
      <Box className="container" style={{ marginTop: "40px" }}>
        <Typography
          style={{
            textAlign: "left",
            marginTop: "20px",
            fontSize: "30px",
            fontWeight: "bold",
            marginBottom: "20px",
          }}
        >
          People Are Also Buying
        </Typography>
        <Row xs={1} md={2} className="g-4">
          {loading ? (
            <h4>Loading...</h4>
          ) : (
            recommandProd.map((item) => {
              return (
                <ProductCard
                  id={item.product_id}
                  key={item.product_id}
                  url={item.img1}
                  title={item.title}
                  pTitle={item.title}
                  type={item.product_type}
                  price={item.variant_price}
                  aPrice={item.variant_compare_at_price}
                />
              );
            })
          )}
        </Row>
      </Box>
    </>
  );
};

export default ProductDetails;
