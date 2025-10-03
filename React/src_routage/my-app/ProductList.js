import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "./ProductContext"

function ProductList() {
  const { products, deleteProduct } = useContext(ProductContext);

  return (
    <div className="row mt-4">
      {products.map((p) => (
        <div key={p.id} className="col-md-4">
          <div className="card m-3">
            <img src={p.image} className="card-img-top" alt={p.name} />
            <div className="card-body">
              <h5 className="card-title">{p.name}</h5>
              <p className="card-text">Prix : {p.price} MAD</p>
              <button
                className="btn btn-danger me-2"
                onClick={() => deleteProduct(p.id)}
              >
                Supprimer
              </button>
              <Link to={`/edit/${p.id}`} className="btn btn-warning">
                Modifier
              </Link>
            </div>
          </div>
        </div>
      ))}
      {products.length === 0 && <p>Aucun produit disponible.</p>}
    </div>
  );
}

export default ProductList;
