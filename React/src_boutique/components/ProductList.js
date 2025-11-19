import {useDispatch,useSelector} from "react-redux";
import {add} from "../features/CartSlice";

const ProductList=() =>{
  const products = useSelector(state => state.products);
  const dispatch=useDispatch();

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Products</h2>

      <div className="row">
        {products.map(p => (
          <div key={p.id} className="col-md-4 mb-4">
            <div className="card  h-100">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{p.title}</h5>
                <p className="card-text fw-bold">{p.price} MAD</p>
                <button 
                  className="btn btn-primary mt-auto"
                  onClick={()=>dispatch(add(p))}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default ProductList;
