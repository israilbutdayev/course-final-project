import React from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav id="navbar">
      <Link to="/">Home Page</Link>
      <Link to="/product/1">Product Page</Link>
      <Link to="/about">About Page</Link>
    </nav>
  );
}
