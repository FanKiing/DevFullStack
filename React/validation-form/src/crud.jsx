import { useState } from "react";
import ProductForm from "./ProductForm";
import ProductList from "./ProductList";

function App() {
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);

    const addProducts = (product) => {
        setProducts([...products, {...product, id: Date.now() }]);
    }

    const deleteProduct = (id) => {
        setProducts(products.filter((p) => p.id !== id));
    }
    const editProduct

    