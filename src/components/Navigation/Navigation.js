import React from "react";

// Firebase
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

// For Styling
import { Navbar, Nav, Container, Button } from "react-bootstrap";


const Navigation = () => {

  // Get the current logged in user
  const { currentUser } = useAuth();
  
  const navigate = useNavigate();

  // Sign Out Handler
  const handleSignout = async () => {
    await signOut(auth);

    navigate("/login");
  };

  return (
    <>
    {/* Navbar */}
      <Navbar bg="bright" expand="lg">
        <Container fluid>

        {/* Brand Name */}
          <Navbar.Brand href="/">RapidCrew</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >

            {/* Nav Links */}
              <Nav.Link href="/men">Men</Nav.Link>
              <Nav.Link href="/women">Women</Nav.Link>
              <Nav.Link href="/bestseller">BestSellers</Nav.Link>
              <Nav.Link href="/recommand">Recommendation</Nav.Link>
              <Nav.Link href="/contact">Contact Us</Nav.Link>

            </Nav>

            {/* If User is Logged in then show Logout Button otherwise signin/signup */}
            {currentUser ? (
              <>
                <Button
                  variant="outline-dark"
                  onClick={handleSignout}
                  style={{ marginLeft: "10px" }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Nav.Link href="/login">Login/SignUp</Nav.Link>
              </>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Navigation;
