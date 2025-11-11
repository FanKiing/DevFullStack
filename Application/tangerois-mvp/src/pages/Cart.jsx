import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function Cart() {
  const { state, dispatch } = useContext(CartContext);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Panier</h2>
      {state.cart.length === 0 ? (
        <p>Votre panier est vide.</p>
      ) : (
        state.cart.map(item => (
          <div key={item.id}>
            {item.nom} - {item.prix} DH x {item.quantity}
            <button
              onClick={() =>
                dispatch({ type: "REMOVE_FROM_CART", payload: item.id })
              }
            >
              Supprimer
            </button>
          </div>
        ))
      )}
    </div>
  );
}
