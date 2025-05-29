import React from "react";
import "../App.css"; // or wherever your styles are

const Hero = () => {
  return (
    <section className="hero-section">
      <h1 className="display-4">Welcome to ProdManager</h1>
      <p className="lead">Your one-stop solution for managing products efficiently.</p>
      <a href="/products" className="btn btn-light mt-3">View Products</a>
    </section>
  );
};

export default Hero;
