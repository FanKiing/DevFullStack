import React, { useState, useContext, useEffect } from "react";
import { ProductContext } from "./ProductContext";
import { useParams, useNavigate } from "react-router-dom";

function ProductForm() {
  const { products, addProduct, updateProduct } = useContext(ProductContext);
  const { id } = useParams(); // récupère l'id dans l'URL si on est en /edit/:id
  const navigate = useNavigate();

  const productToEdit = products.find((p) => p.id === Number(id));

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  // Si on est en mode édition → pré-remplir le formulaire
  useEffect(() => {
    if (productToEdit) {
      setName(productToEdit.name);
      setPrice(productToEdit.price);
      setImage(productToEdit.image);
    }
  }, [productToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !price || !image) return;

    if (productToEdit) {
      // Mode EDIT
      updateProduct(productToEdit.id, { name, price: Number(price), image });
    } else {
      // Mode ADD
      addProduct({ name, price: Number(price), image });
    }

    navigate("/products");
  };

  return (
    <form className="mt-4" onSubmit={handleSubmit}>
      <h3>{productToEdit ? "Modifier un produit" : "Ajouter un produit"}</h3>

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

      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="URL de l'image"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
      </div>

      <button className={`btn ${productToEdit ? "btn-warning" : "btn-primary"}`} type="submit">
        {productToEdit ? "Modifier" : "Ajouter"}
      </button>
    </form>
  );
}

export default ProductForm;
