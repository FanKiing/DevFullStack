import { useDispatch, useSelector } from "react-redux";
import { remove,increment,decrement } from "../features/CartSlice";

const Cart=()=>{
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const total = cart.reduce((sum, item) => sum+item.price*item.qty,0);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Shopping Cart</h2>

      {cart.length === 0 ? (
        <div className="alert alert-info">Your cart is empty</div>
      ) : (
        <table className="table table-striped ">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price (MAD)</th>
              <th>Quantity</th>
              <th>Total (MAD)</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {cart.map((item) => (
              <tr key={item.id}>
                <td>{item.title}</td>
                <td>{item.price}</td>
                <td>
                  <div className="d-flex justify-content-center align-items-center gap-2">
                    <button
                      className="btn btn-sm btn-secondary"
                      onClick={() => dispatch(decrement(item.id))}
                    >
                      -
                    </button>

                    <span>{item.qty}</span>

                    <button
                      className="btn btn-sm btn-secondary"
                      onClick={() => dispatch(increment(item.id))}
                    >
                      +
                    </button>
                  </div>
                </td>

        
                <td>{item.price * item.qty}</td>

               
                <td>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => dispatch(remove(item.id))}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <h3 className="text-end mt-4">Total: {total} MAD</h3>
    </div>
  );
}

export default Cart;
