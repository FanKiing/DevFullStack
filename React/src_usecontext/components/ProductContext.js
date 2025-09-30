import React, { createContext, useState } from "react";

export const ProductContext = createContext();

export default function ProductProvider({ children }) {
  const [products, setProducts] = useState([
    { id: 1, name: "Produit A", price: 100 },
    { id: 2, name: "Produit B", price: 200 },
  ]);

  const addProduct = (product) => {
    setProducts([...products, { id: Date.now(), ...product }]);
  };

  const deleteProduct = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  );
}
