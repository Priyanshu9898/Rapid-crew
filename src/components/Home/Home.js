import React, { useState, useEffect } from "react";
import axios from "axios";

// components
import PosterCarousal from "./Carousals/PosterCarousal";
import Header from "./Header";
import CompanyMoto from "./CompanyMoto";
import MainCard from "./MainCard";
import ProductCard from "../Product/ProductCard";

// For Styling
import { Box, Grid } from "@material-ui/core";
import Row from "react-bootstrap/Row";

const Home = () => {
  // States
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(6);

  const loadPost = async () => {
    setLoading(true);

    // Await make wait until that
    // promise settles and return its result
    const response = await axios.get("/bestsellers");

    // After fetching data stored it in state.
    setData(response.data);

    // Closed the loading page
    setLoading(false);
  };

  // Every Time page reload if will execute first
  useEffect(() => {
    loadPost();
  }, []);

  return (
    <>
      {/* Poster */}
      <PosterCarousal />

      {/* header */}
      <Header header="COLLECTIONS" />

      {/* Collection Images */}
      <Grid container style={{ marginTop: "10px", marginBottom: "15px" }}>
        <MainCard
          url="./images/Collection/NewArrival.jpg"
          alt="New Arrival Collection"
          link="/"
        />
        <MainCard
          url="./images/Collection/bestseller.jpg"
          alt="BestSeller Collection"
          link="/bestSeller"
        />
        <MainCard
          url="./images/Collection/NewArrivals_solids.jpg"
          alt="Basic Collection"
          link="/"
        />
      </Grid>

      {/* header-2 */}
      <Header header="Recommendation For You" />

      {/* Get the catalogue of data */}
      <Box
        className="container"
        style={{ marginTop: "40px", marginBottom: " 30px" }}
      >
        <Row xs={1} md={2} className="g-4">
          {loading ? (
            <h4>Loading...</h4>
          ) : (
            data
              .slice(10, count + 10)
              .map((item) => (
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
              ))
          )}
        </Row>
      </Box>

      {/* Company Moto - Extra*/}
      <CompanyMoto />
    </>
  );
};

export default Home;
