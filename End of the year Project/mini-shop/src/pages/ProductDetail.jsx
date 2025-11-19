import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { products } from "../data/products";
import { useParams } from "react-router-dom";

function ProductDetail() {
  const { id } = useParams();
  const product = products.find(p => p.id == id);

  const { dispatch } = useContext(CartContext);

  return (
    <>
      <h2>{product.name}</h2>
      <p>{product.price} DH</p>
      <button onClick={() => dispatch({ type: "ADD", product })}>
        Ajouter au panier
      </button>
    </>
  );
}

export default ProductDetail;
