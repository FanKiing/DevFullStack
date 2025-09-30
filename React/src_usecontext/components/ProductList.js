import React, { useContext } from "react";
import { ProductContext } from "./ProductContext";

function ProductList() {
  const { products, deleteProduct } = useContext(ProductContext);

  return (
    <div className="row">
      {products.map((p) => (
        <div key={p.id} className="col-md-4">
          <div className="card m-3">
            <div className="card-body">
              <h5 className="card-title">{p.name}</h5>
              <p className="card-text">Prix : {p.price} MAD</p>
              <button
                className="btn btn-danger"
                onClick={() => deleteProduct(p.id)}
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
