import React, { useState } from "react";
// For Styling
import { Button, makeStyles } from "@material-ui/core";
import { Form, Container } from "react-bootstrap";

// Firebase
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

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

const Login = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const loginPath = {
    color: "blue",
    textDecoration: "none",
    fontSize: "1.2rem",
  };

  // State to store Form Data
  const [data, setData] = useState({
    email: "",
    password: "",
    error: null,
    loading: false,
  });

  // Destructuring
  const { email, password, error, loading } = data;

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
    if (!email || !password) {
      setData({ ...data, error: "All fields are required" });
    } else {
      // Sign In User with Try and Catch
      try {
        // Sign In User
        const result = await signInWithEmailAndPassword(auth, email, password);

        // Clear All Form Data
        setData({
          email: "",
          password: "",
          error: null,
          loading: false,
        });

        // Redirect to Home Page- If User is Signed In
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
        {/* Header */}
        <p
          style={{
            textAlign: "center",
            marginTop: "20px",
            fontSize: "30px",
            fontWeight: "bold",
          }}
        >
          Login
        </p>
        {/* Login Form*/}
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
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
              value={password}
              onChange={handleChange}
              placeholder="Enter your Password"
            />
          </Form.Group>

          {/* Error in Form Validation */}
          {error ? <p style={{ color: "red" }}>{error}</p> : null}

          {/* Submit Button */}
          <Button
            style={{ marginTop: 15 }}
            variant="contained"
            type="submit"
            color="primary"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Logging in ..." : "Login"}
          </Button>

        
          

          {/* Sign Up */}
          <Link to="/register" style={loginPath}>
            <p>Don't have an account ? Register</p>
          </Link>
        </Form>
      </Container>
    </>
  );
};

export default Login;
