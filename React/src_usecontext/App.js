import React from "react";
import ProductProvider from "./components/ProductContext";
import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <ProductProvider>
      <div className="container mt-5">
        <h1 className="text-center mb-4">Gestion des Produits</h1>
     
        <ProductList />
      </div>
    </ProductProvider>
  );
}

export default App;
