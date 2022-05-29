import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import react-slick
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Components-Home
import Home from "./components/Home/Home";

// Authentication Component
import Login from "./components/Authentication/Login";
import Signup from "./components/Authentication/Signup";

// Navbar Component
import Navigation from "./components/Navigation/Navigation";

// Contact Component
import Contact from "./components/Contact/Contact";

// Men Component
import Men from "./components/Product/Men";
// Women Component
import Women from "./components/Product/Women";
// BestSeller Component
import BestSeller from "./components/Product/BestSeller";

// ProductDetails Component
import ProductDetails from "./components/Product/ProductDetails";

// Recommendation Component
import Recommandation from "./components/RecommadProd/Recommandation";

// AuthContext
import AuthContextProvider from "./contexts/AuthContext";

const App = () => {
  return (
    <>
      {/* Wrapping app into AuthContextProvider */}
      <AuthContextProvider>
        {/* Routers */}
        <BrowserRouter>
          {/* All pages Contain Navbar */}
          <Navigation />

          {/* Path */}
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/contact" element={<Contact />} />
            <Route exact path="/men" element={<Men />} />
            <Route exact path="/women" element={<Women />} />
            <Route exact path="/bestseller" element={<BestSeller />} />
            <Route exact path="/men/:title" element={<ProductDetails />} />
            <Route exact path="/women/:title" element={<ProductDetails />} />
            <Route path="/:title" element={<ProductDetails />} />
            <Route exact path="/recommand" element={<Recommandation />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Signup />} />
          </Routes>
        </BrowserRouter>
      </AuthContextProvider>
    </>
  );
};

export default App;
