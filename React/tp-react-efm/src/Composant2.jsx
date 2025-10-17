import React, { useContext, useState } from "react";
import { SalarieContext } from "./SalarieContext";

export default function Composant2() {
  const { salaries } = useContext(SalarieContext);
  const [service, setService] = useState("");

  const filtres = salaries.filter((s) =>
    s.service.toLowerCase().includes(service.toLowerCase())
  );

  return (
    <div style={{ padding: 20 }}>
      <h2>Liste des salariés</h2>
      <input
        placeholder="Rechercher par service..."
        value={service}
        onChange={(e) => setService(e.target.value)}
      />
      <ul>
        {filtres.map((s, i) => (
          <li key={i}>
            {s.nom} — {s.service}
          </li>
        ))}
      </ul>
    </div>
  );
}