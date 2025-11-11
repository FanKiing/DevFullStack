import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Bienvenue chez Tangerois</h1>
      <p>Découvrez nos meilleures offres en électroménager.</p>

      <div style={{ marginTop: "30px" }}>
        <Link
          to="/products"
          style={{
            padding: "10px 20px",
            background: "#D32F2F",
            color: "white",
            textDecoration: "none",
            borderRadius: "5px"
          }}
        >
          Voir les produits
        </Link>
      </div>
    </div>
  );
}
