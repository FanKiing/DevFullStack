import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import ProductCard from "./components/ProductCard";

const ListProduct = () => {
  const { state } = useContext(CartContext);

  return (
    <div className="d-flex flex-wrap justify-content-center">
      {state.produits.map(prod => (
        <ProductCard key={prod.id} prod={prod} />
      ))}
    </div>
  );
};

export default ListProduct;
