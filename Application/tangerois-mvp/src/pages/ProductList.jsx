import products from "../data/products.json";
import { Link } from "react-router-dom";

export default function ProductList() {
  return (
    <div style={{ padding: "20px" }}>
      <h2>Liste des produits</h2>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "20px"
      }}>
        {products.map(p => (
          <div key={p.id} style={{ border: "1px solid #ccc", padding: "10px" }}>
            <img src={p.image} width="100%" />
            <h3>{p.nom}</h3>
            <p>{p.prix} DH</p>
            <Link to={`/products/${p.id}`}>Voir détails</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
