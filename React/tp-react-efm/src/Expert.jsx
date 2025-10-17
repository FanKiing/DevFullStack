import React from "react";
import Evenements from "./Evenements";

export default function Expert({ expert }) {
  return (
    <li style={{ marginBottom: 20 }}>
      <strong>{expert.nom}</strong>
      <Evenements evenements={expert.evenements} />
    </li>
  );
}