import React from "react";
import { ProductProvider } from "./ProductContext";
import ListeProduit from "./ListeProduit";
import FormProduit from "./FormProduit";

function App() {
  return (
    <ProductProvider>
      <div className="App">
        <h1>Gestion des Produits</h1>
        <FormProduit />
        <ListeProduit />
      </div>
    </ProductProvider>
  );
}

export default App;
