import React, { useState } from "react";

// For Styling
import { Button, makeStyles } from "@material-ui/core";
import { Form, Container } from "react-bootstrap";

// Firebase
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { Timestamp, collection, addDoc } from "firebase/firestore";

// CSS- Material UI
const useStyles = makeStyles((theme) => ({
  component: {
    marginTop: "5rem",
    marginBottom: "5rem",
    width: "600px",
    [theme.breakpoints.down("md")]: {
      marginTop: "2rem",
      marginBottom: "2rem",

      width: "70%",
    },
    [theme.breakpoints.down("sm")]: {
      marginTop: "2rem",
      marginBottom: "2rem",
      width: "100%",
    },
  },
}));

const Contact = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  // State to store Form Data
  const [data, setData] = useState({
    name: "",
    email: "",
    number: "",
    text: "",
    error: null,
    loading: false,
  });

  // Destructuring
  const { name, email, number, text, error, loading } = data;

  // Input Handler
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // Submit Handler
  const handleSubmit = async (e) => {
    // Prevent Default Form Submit
    e.preventDefault();

    // Set Loading State
    setData({ ...data, error: null, loading: true });

    // Form Validation
    if (!name || !email || !number || !text) {
      setData({ ...data, error: "All fields are required" });
    } else if (!email.includes("@")) {
      setData({ ...data, error: "Enter Valid Email Address" });
    } else if (number.length !== 10) {
      setData({ ...data, error: "Number should be of length 10" });
    } else if (text.length < 10) {
      setData({ ...data, error: "Enter Valid Message" });
    } else {
      // Add Data to Firebase Firestore
      try {
        const colRef = collection(db, "Contact");

        const newDoc = await addDoc(colRef, {
          name,
          email,
          number,
          text,
          createdAt: Timestamp.fromDate(new Date()),
        });

        // Clear Form
        setData({
          name: "",
          email: "",
          number: "",
          text: "",
          error: null,
          loading: false,
        });

        // Redirect to Home- if Successful Submission
        navigate("/");
      } catch (err) {
        // Set Error State
        setData({ ...data, error: err.message, loading: false });
      }
    }
  };

  return (
    <>
      <Container className={classes.component}>
        {/* header */}
        <p
          style={{
            textAlign: "center",
            marginTop: "20px",
            fontSize: "30px",
            fontWeight: "bold",
          }}
        >
          Contact Us
        </p>

        {/* Form */}
        <Form>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={name}
              id="name"
              placeholder="Enter your Name"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={handleChange}
              placeholder="Enter your email address"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="phone"
              name="number"
              id="number"
              value={number}
              onChange={handleChange}
              placeholder="Enter your Phone Number"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Enter Your Query</Form.Label>
            <Form.Control
              type="text"
              name="text"
              id="text"
              value={text}
              onChange={handleChange}
              placeholder="Tell Us About Your Problem"
            />
          </Form.Group>

          {/* In case of Error in Form Validation */}
          {error ? <p style={{ color: "red" }}>{error}</p> : null}

          {/* Button */}
          <Button
            onClick={handleSubmit}
            disabled={loading}
            variant="contained"
            color="primary"
            type="submit"
          >
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default Contact;
