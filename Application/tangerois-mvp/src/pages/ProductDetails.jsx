import { useParams } from "react-router-dom";
import products from "../data/products.json";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function ProductDetails() {
  const { id } = useParams();
  const product = products.find(p => p.id == id);
  const { dispatch } = useContext(CartContext);

  return (
    <div style={{ padding: "20px" }}>
      <h2>{product.nom}</h2>
      <img src={product.image} width="300" />
      <p>Prix : {product.prix} DH</p>
      <p>{product.description}</p>

      <button
        onClick={() =>
          dispatch({ type: "ADD_TO_CART", payload: product })
        }
        style={{ padding: "10px", background: "#D32F2F", color: "white" }}
      >
        Ajouter au panier
      </button>
    </div>
  );
}
