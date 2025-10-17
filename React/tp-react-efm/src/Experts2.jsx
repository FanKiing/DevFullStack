import React, { useState, useEffect } from "react";
import Expert from "./Expert";

export default function Experts2() {
  const [experts, setExperts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/experts")
      .then((res) => res.json())
      .then((data) => setExperts(data))
      .catch((err) => console.error("Erreur :", err));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Experts (depuis API)</h2>
      <ul>
        {experts.map((exp, i) => (
          <Expert key={i} expert={exp} />
        ))}
      </ul>
    </div>
  );
}