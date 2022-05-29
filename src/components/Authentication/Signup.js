import React, { useState } from "react";

//For Styling
import { Button, makeStyles } from "@material-ui/core";
import { Form, Container } from "react-bootstrap";

// Firebase
import { useNavigate, Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase";
import { setDoc, doc, Timestamp } from "firebase/firestore";

// CSS -Material UI
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

const Signup = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const loginPath = {
    color: "blue",
    textDecoration: "none",
    fontSize: "1.2rem",
  };

  // State to store Form Data
  const [data, setData] = useState({
    name: "",
    email: "",
    passworrd: "",
    confirmPassword: "",
    error: null,
    loading: false,
  });

  // Destructuring
  const { name, email, password, confirmPassword, error, loading } = data;

  // Input Handler
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // Form Submit Handler
  const handleSubmit = async (e) => {
    // Prevent Default Form Submit
    e.preventDefault();

    // Set Current Data
    setData({ ...data, error: null, loading: true });

    // Form Validation
    if (!name || !email || !password) {
      setData({ ...data, error: "All fields are required" });
    } else if (password !== confirmPassword) {
      setData({ ...data, error: "Passwords do not match" });
    } else if (password.length < 6) {
      setData({ ...data, error: "Password must be at least 6 characters" });
    } else if (password.length >= 6 && password === confirmPassword) {
      // Create User With Email And Password
      try {
        // Create User
        const result = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        // Store Data into Firebase Firestore
        await setDoc(doc(db, "User", result.user.uid), {
          uid: result.user.uid,
          name,
          email,
          createdAt: Timestamp.fromDate(new Date()),
        });

        // Clear All Form Data
        setData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          error: null,
          loading: false,
        });

        // Redirect to Home- If User is Signed Up
        navigate("/");
      } catch (err) {
        // In case of Error
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
          Register
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
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={handleChange}
              placeholder="Enter your Password"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              value={confirmPassword}
              onChange={handleChange}
              placeholder="Enter your Password Again"
            />
          </Form.Group>

          {/* Error in Form Validation */}
          {error ? <p style={{ color: "red" }}>{error}</p> : null}

          {/* Submit Button */}
          <Button
            onClick={handleSubmit}
            disabled={loading}
            variant="contained"
            color="primary"
            type="submit"
          >
            {loading ? "Signing up ..." : "SignUp"}
          </Button>

          {/* Link to Login */}
          <Link to="/login" style={loginPath}>
            <p>Already have an account ? Login</p>
          </Link>
        </Form>
      </Container>
    </>
  );
};

export default Signup;
