import React, { createContext, useState } from "react";

export const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([
    { id: 1, name: "Produit A", price: 100, image: "https://via.placeholder.com/150" },
    { id: 2, name: "Produit B", price: 200, image: "https://via.placeholder.com/150" },
  ]);

  const addProduct = (product) => {
    setProducts([...products, { id: Date.now(), ...product }]);
  };

  const deleteProduct = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const updateProduct = (id, updatedProduct) => {
    setProducts(products.map((p) => (p.id === id ? { ...p, ...updatedProduct } : p)));
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, deleteProduct, updateProduct }}>
      {children}
    </ProductContext.Provider>
  );
}
