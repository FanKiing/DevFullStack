import { useSearchParams } from "react-router-dom";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";

function ProductList() {
  const [params, setParams] = useSearchParams();

  const search = params.get("q") || "";
  const category = params.get("category") || "";

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) &&
    (category ? p.category === category : true)
  );

  return (
    <>
      <input
        placeholder="Rechercher..."
        value={search}
        onChange={(e) => setParams({ q: e.target.value })}
      />

      <select
        onChange={(e) => setParams({ q: search, category: e.target.value })}
      >
        <option value="">Toutes catégories</option>
        <option value="Electronics">Electronics</option>
      </select>

      <div className="grid">
        {filtered.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </>
  );
}

export default ProductList;
