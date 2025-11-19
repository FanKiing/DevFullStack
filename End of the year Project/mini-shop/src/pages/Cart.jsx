function Cart() {
  const { cart, dispatch } = useContext(CartContext);

  return (
    <div>
      {cart.map(item => (
        <div key={item.id}>
          <h4>{item.name}</h4>
          <p>{item.price} DH</p>
          <input
            type="number"
            value={item.quantity}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_QTY",
                id: item.id,
                qty: parseInt(e.target.value)
              })
            }
          />
          <button onClick={() => dispatch({ type: "REMOVE", id: item.id })}>
            Supprimer
          </button>
        </div>
      ))}

      <h3>
        Total :
        {cart.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        )} DH
      </h3>

      <a href="/checkout">Passer au Checkout</a>
    </div>
  );
}
