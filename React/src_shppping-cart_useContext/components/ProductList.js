import React,{useState,useContext} from 'react'
import { cartContext } from './CartProvider'

const ProductList = () => {
    const[products,setProducts]=useState([
  { id: 1, name: "Laptop", price: 1200 },
  { id: 2, name: "Smartphone", price: 800 },
  { id: 3, name: "Headphones", price: 150 },
]);
 const{addToCart}=useContext(cartContext);
  return (
    <div>
    <h3>Produits</h3>
      <div className="row">
        {products.map((p) => (
          <div className="col-md-4 mb-3" key={p.id}>
            <div className="card">
              <div className="card-body">
                <h5>{p.name}</h5>
                <p>Prix : {p.price} €</p>
                <button
                  className="btn btn-primary"
                  onClick={() => addToCart(p)}
                >
                  Ajouter au panier
                </button>
              </div>
              </div>
              </div>
        ))}
 </div>
 </div>
)
}
export default ProductList