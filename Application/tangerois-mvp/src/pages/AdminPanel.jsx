import products from "../data/products.json";

export default function AdminPanel() {
  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin - Gestion des produits</h2>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Image</th>
            <th>Nom</th>
            <th>Prix</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id}>
              <td><img src={p.image} width="80" /></td>
              <td>{p.nom}</td>
              <td>{p.prix} DH</td>
              <td>{p.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
