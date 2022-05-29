import React, { useState } from "react";

// For Styling
import { Box, makeStyles, Typography, Button } from "@material-ui/core";
import { Row } from "react-bootstrap";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

// Components
import ProductCard from "../Product/ProductCard";

// For Styling
const Input = styled("input")({
  display: "none",
});

// CSS- Material UI
const useStyles = makeStyles({
  rec: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "30px",
    padding: "0 40px",
  },
  inp: {
    display: "flex",
    flexDirection: "row",
  },
  recImage: {
    width: "350px",
    height: "350px",
    objectFit: "contain",
    marginTop: "40px",
  },
  btn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "15px",
    // backgroundColor: "#f5f5f5",
    margin: "auto",
  },

  txt: {
    marginTop: "40px",
    fontSize: "30px",
    fontWeight: "bold",
  },
});

// Function For Sending Post request to the API
function POST(path, data) {
  return fetch(path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

const Recommandation = () => {
  const classes = useStyles();

  // States
  const [img, setImg] = useState(null);
  const [prodData, setProdData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Sending Image data to the API and fetch similar images
  const givReco = async (e) => {
    POST("/imageData", { data: img }).then(async (resp) => {
      const r = await resp.json();

      setProdData(r);
      setLoading(false);
    });
  };

  // Function for reading uploaded image
  const imageHandler = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImg(reader.result);
      }
    };

    reader.readAsDataURL(file);
  };

  return (
    <>
      {/* header */}
      <p
        style={{
          textAlign: "center",
          marginTop: "40px",
          fontSize: "30px",
          fontWeight: "bold",
        }}
      >
        Get Recommendation
      </p>

      <Box className={classes.rec}>
        <Box className={classes.inp}>
          <label htmlFor="contained-button-file">
            <Input
              accept="image/*"
              id="contained-button-file"
              multiple
              type="file"
              onChange={imageHandler}
            />
            <Button variant="contained" component="span" color="primary">
              Upload
            </Button>
          </label>
          <label htmlFor="icon-button-file">
            <Input
              accept="image/*"
              id="icon-button-file"
              type="file"
              onChange={imageHandler}
            />
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
            >
              <PhotoCamera />
            </IconButton>
          </label>
        </Box>

        {/* If image Uploaded */}
        {img ? (
          <>
            <img src={img} alt="Picture" className={classes.recImage} />
            <Box className={classes.products}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                onClick={givReco}
                className={classes.btn}
              >
                Recommendation
              </Button>

              {/* If data is still Not fetch the loading otherwise show data */}
              {loading ? (
                <></>
              ) : (
                <>
                  <Typography className={classes.txt}>
                    Products For You
                  </Typography>

                  
                  {/* Product card */}
                  <Box
                    className="container"
                    style={{ marginTop: "20px", marginBottom: "30px" }}
                  >
                    <Row xs={1} md={2} className="g-4">
                      {/* Iterating through array of jason objects using map */}
                      {prodData.map((item) => {
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
                      })}
                    </Row>
                  </Box>
                </>
              )}
            </Box>
          </>
        ) : (
          <> </>
        )}
      </Box>
    </>
  );
};

export default Recommandation;
