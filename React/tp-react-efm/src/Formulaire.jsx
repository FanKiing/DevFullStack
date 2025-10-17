import React, { useState } from "react";

export default function Formulaire() {
  const [data, setData] = useState({
    theme: "",
    dateDebut: "",
    dateFin: "",
    cout: "",
    expert: "",
  });
  const [show, setShow] = useState(false);

  const handleChange = (e) => setData({ ...data, [e.target.name]: e.target.value });

  return (
    <div style={{ padding: 20 }}>
      <h2>Formulaire d’événement</h2>
      <input name="theme" placeholder="Thème" onChange={handleChange} /> <br />
      <input type="date" name="dateDebut" onChange={handleChange} /> <br />
      <input type="date" name="dateFin" onChange={handleChange} /> <br />
      <input name="cout" placeholder="Coût" onChange={handleChange} /> <br />
      <input name="expert" placeholder="Expert" onChange={handleChange} /> <br />
      <button onClick={() => setShow(true)}>Confirmer</button>

      {show && (
        <div style={{ marginTop: 20 }}>
          <h3>Récapitulatif :</h3>
          <p>Thème : {data.theme}</p>
          <p>Date début : {data.dateDebut}</p>
          <p>Date fin : {data.dateFin}</p>
          <p>Coût : {data.cout} DH</p>
          <p>Expert : {data.expert}</p>
        </div>
      )}
    </div>
  );
}