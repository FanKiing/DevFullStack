// Navbar.js
import React, { useContext } from "react";
import { cartContext } from "./CartProvider";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { cart } = useContext(cartContext);

  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container d-flex justify-content-between">
        <Link to="/" className="navbar-brand">
          🛒 Shopping Cart
        </Link>
        <Link to="/cart" className="btn btn-success">
          Panier ({cart.length})
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
