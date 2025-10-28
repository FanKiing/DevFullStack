import React, { useContext, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { Button, Table } from "react-bootstrap";

const Cart = () => {
  const { state, dispatch } = useContext(CartContext);

  useEffect(() => {
    dispatch({ type: "GET_TOTAL_AMOUNT" });
  }, [state.Cart, dispatch]);

  return (
    <div className="container mt-4">
      <h3>🛒 Panier</h3>
      {state.Cart.length === 0 ? (
        <p>Le panier est vide</p>
      ) : (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Produit</th>
                <th>Prix</th>
                <th>Quantité</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {state.Cart.map(p => (
                <tr key={p.id}>
                  <td>{p.intitule}</td>
                  <td>{p.prix} MAD</td>
                  <td>
                    <input
                      type="number"
                      min="1"
                      value={p.qte}
                      onChange={e =>
                        dispatch({
                          type: "MODIFY_QTE",
                          payload: { id: p.id, qte: parseInt(e.target.value) },
                        })
                      }
                    />
                  </td>
                  <td>{p.prix * p.qte} MAD</td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() =>
                        dispatch({ type: "REMOVE_FROM_CART", payload: p.id })
                      }
                    >
                      ❌ Supprimer
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <h4>Total: {state.totalAmount} MAD</h4>
          <Button variant="warning" onClick={() => dispatch({ type: "CLEAR_CART" })}>
            Vider le panier
          </Button>
        </>
      )}
    </div>
  );
};

export default Cart;
