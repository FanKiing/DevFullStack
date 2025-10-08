import React, { useState } from "react";

function ListStagiaires({ stagiaires, onDelete, onEdit }) {
  const [search, setSearch] = useState("");

  const filtered = stagiaires.filter((s) =>
    s.nom.toLowerCase().includes(search.toLowerCase())
  );

  const moyennes = stagiaires.map((s) => s.moyenne);
  const max = Math.max(...moyennes);
  const min = Math.min(...moyennes);
  const moy = (moyennes.reduce((a, b) => a + b, 0) / moyennes.length).toFixed(2);

  return (
    <div>
      <input
        type="text"
        placeholder="Rechercher..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <p>• La moyenne la plus élevée : {max}</p>
      <p>• La moyenne la plus basse : {min}</p>
      <p>• Moyenne de la classe : {moy}</p>

      <table border="1">
        <thead>
          <tr>
            <th>Id</th><th>Matricule</th><th>Nom</th><th>Ville</th>
            <th>Code Postal</th><th>Moyenne</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((s) => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{s.matricule}</td>
              <td>{s.nom}</td>
              <td>{s.ville}</td>
              <td>{s.codepostal}</td>
              <td>{s.moyenne}</td>
              <td>
                <button onClick={() => onDelete(s.id)}>Supprimer</button>
                <button onClick={() => onEdit(s)}>Éditer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListStagiaires;
