import React, { useContext } from "react";
import { ProductContext } from "./ProductContext";

const ListeProduit = () => {
  const { products, deleteProduct } = useContext(ProductContext);

  return (
    <div>
      <h2>Liste des produits</h2>
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            <img src={p.image} alt={p.name} width={50} />
            <span>{p.name} - ${p.price}</span>
            <button onClick={() => deleteProduct(p.id)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListeProduit;
