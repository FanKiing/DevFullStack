import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function Navbar() {
  const { state } = useContext(CartContext);

  return (
    <nav style={{ padding: "10px", background: "#D32F2F", color: "white" }}>
      <Link to="/" style={{ marginRight: "20px", color: "white" }}>Accueil</Link>
      <Link to="/products" style={{ marginRight: "20px", color: "white" }}>Produits</Link>
      <Link to="/cart" style={{ color: "white" }}>
        Panier ({state.cart.length})
      </Link>
    </nav>
  );
}
