import React,{useContext} from 'react'
import { cartContext } from './CartProvider'

const Cart = () => {
    const{cart,removeFromCart,totalAmount}=useContext(cartContext);
  return (
        <div>
      <h3>Mon Panier</h3>
      {cart.length === 0 ? (
        <p>Le panier est vide</p>
      ) : (
        <ul className="list-group">
          {cart.map((item) => (
            <li
              key={item.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              {item.name} - {item.price} € -  Qte:{item.qte} -   pt : {item.price*item.qte} € 
              <button
                className="btn btn-danger btn-sm"
                onClick={() => removeFromCart(item.id)}
              >
                Supprimer
              </button>
            </li>
          ))}
        </ul>
       
      )}
       <p className="text-end">Montant à payer : {cart.reduce((acc,p)=>acc+=p.qte*p.price,0)} € </p>
    </div>

  )
}

export default Cart