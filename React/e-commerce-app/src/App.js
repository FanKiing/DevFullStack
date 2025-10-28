import "bootstrap/dist/css/bootstrap.min.css";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import ListProduct from "./components/ListProduct";
import Cart from "./components/Cart";

function App() {
  return (
    <CartProvider>
      <Navbar />
      <div className="container mt-4">
        <ListProduct />
        <Cart />
      </div>
    </CartProvider>
  );
}

export default App;
