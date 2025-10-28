import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{ padding: "10px", background: "#eee" }}>
      <Link to="/" style={{ marginRight: "10px" }}>Liste Employés</Link>
      <Link to="/form">Ajouter/Modifier Employé</Link>
    </nav>
  );
}
