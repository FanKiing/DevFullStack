import React from "react";
import { expertsData } from "./data";
import Expert from "./Expert";

export default function Experts1() {
  return (
    <div style={{ padding: 20 }}>
      <h2>Experts (Données locales)</h2>
      <ul>
        {expertsData.map((exp, i) => (
          <Expert key={i} expert={exp} />
        ))}
      </ul>
    </div>
  );
}