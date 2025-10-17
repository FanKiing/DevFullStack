import React from "react";

export default function Evenements({ evenements }) {
  const total = evenements.reduce((t, e) => t + e.cout, 0);

  return (
    <table border="1" style={{ marginTop: 10 }}>
      <thead>
        <tr>
          <th>Thème</th>
          <th>Date début</th>
          <th>Date fin</th>
          <th>Coût</th>
        </tr>
      </thead>
      <tbody>
        {evenements.map((ev, i) => (
          <tr key={i}>
            <td>{ev.theme}</td>
            <td>{ev.dateDebut}</td>
            <td>{ev.dateFin}</td>
            <td>{ev.cout} DH</td>
          </tr>
        ))}
        <tr>
          <td colSpan="3"><b>Total</b></td>
          <td><b>{total} DH</b></td>
        </tr>
      </tbody>
    </table>
  );
}