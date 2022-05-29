import React, { useState, useEffect } from "react";

// For Styling
import { Box } from "@material-ui/core";
import { Row } from "react-bootstrap";

import axios from "axios";

// Component
import ProductCard from "./ProductCard";

const Catelogue = (props) => {
  // States
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("");

  const menPost = async () => {
    setLoading(true);

    // Await make wait until that
    // promise settles and return its result
    const response = await axios.get(`/menProducts`);

    // After fetching data stored it in  state.
    setData(response.data);

    // Closed the loading page

    setLoading(false);
  };
  const womanPost = async () => {
    setLoading(true);

    // Await make wait until that
    // promise settles and return its result
    const response = await axios.get(`/womenProducts`);

    // After fetching data stored it in  state.
    setData(response.data);

    // Closed the loading page
    setLoading(false);
  };

  const bestSellerPost = async () => {
    setLoading(true);

    // Await make wait until that
    // promise settles and return its result
    const response = await axios.get(`/bestsellers`);

    // After fetching data stored it in state.
    setData(response.data);

    // Closed the loading page
    setLoading(false);
  };

  // To get the requested data using catelogue props
  const getFunc = () => {
    if (props.catelogue === "men") {
      setCategory("men");
      return menPost();
    } else if (props.catelogue === "women") {
      setCategory("women");
      return womanPost();
    } else if (props.catelogue === "bestseller") {
      setCategory("bestSellerProducts");
      return bestSellerPost();
    }
  };

  // Every time page reload this will execute first
  useEffect(() => {
    getFunc();
  }, []);

  return (
    <>
      {/* display product cards by Iterating through all items of an array */}
      <Box className="container" style={{ marginTop: "40px" }}>
        <Row xs={1} md={2} className="g-4">
          {/* if get the data then show products otherwise loading */}
          {loading ? (
            <h4>Loading...</h4>
          ) : (
            data.map((item) => {
              return (
                <ProductCard
                  id={item.product_id}
                  cat={category}
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

export default Catelogue;
