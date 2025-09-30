import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProductProvider } from "./ProductContext";
import Navbar from "./Navbar";
import ProductList from "./ProductList";
import ProductForm from "./ProductForm";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <ProductProvider>
      <Router>
        <Navbar />
        <div className="container">
          <Routes> {/* switch */}
              <Route path="/" element={<h2 className="mt-4">Bienvenue dans la gestion des produits !</h2>} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/add" element={<ProductForm />} />
              <Route path="/edit/:id" element={<ProductForm />} />
          </Routes>

        </div>
      </Router>
    </ProductProvider>
  );
}

export default App;
