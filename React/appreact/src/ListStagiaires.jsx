import React, { useState } from "react";

function ListStagiaires({ stagiaires = [], onDelete, onEdit }) {
  const [search, setSearch] = useState("");

  const filtered = stagiaires.filter((s) =>
    s.nom.toLowerCase().includes(search.toLowerCase())
  );

  const moyennes = stagiaires.map((s) => Number(s.moyenne)).filter((n) => !isNaN(n));
  const max = moyennes.length ? Math.max(...moyennes) : 0;
  const min = moyennes.length ? Math.min(...moyennes) : 0;
  const moy = moyennes.length ? (moyennes.reduce((a, b) => a + b, 0) / moyennes.length).toFixed(2) : "0.00";

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Stagiaires</h2>
        <input
          className="form-control"
          style={{ width: 260 }}
          placeholder="Rechercher par nom..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <span className="me-3">Moyenne max : <strong>{max}</strong></span>
        <span className="me-3">Moyenne min : <strong>{min}</strong></span>
        <span>Moyenne générale : <strong>{moy}</strong></span>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Matricule</th>
            <th>Nom</th>
            <th>Ville</th>
            <th>Code Postal</th>
            <th>Moyenne</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.length ? (
            filtered.map((s) => (
              <tr key={s.id}>
                <td>{s.id}</td>
                <td>{s.matricule}</td>
                <td>{s.nom}</td>
                <td>{s.ville}</td>
                <td>{s.codepostal}</td>
                <td>{s.moyenne}</td>
                <td>
                  <button className="btn btn-sm btn-warning me-2" onClick={() => onEdit(s)}>
                    Éditer
                  </button>
                  <button className="btn btn-sm btn-danger" onClick={() => onDelete(s.id)}>
                    Supprimer
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">Aucun stagiaire trouvé</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ListStagiaires;
