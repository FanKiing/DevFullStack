import React, { useState, useContext } from "react";
import { ProductContext } from "./ProductContext";

function ProductForm() {
  const { addProduct } = useContext(ProductContext);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !price) return;
    addProduct({ name, price });
    setName("");
    setPrice("");
  };

  return (
    <form className="mb-4" onSubmit={handleSubmit}>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Nom du produit"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <input
          type="number"
          className="form-control"
          placeholder="Prix"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <button className="btn btn-primary" type="submit">
        Ajouter
      </button>
    </form>
  );
}

export default ProductForm;
