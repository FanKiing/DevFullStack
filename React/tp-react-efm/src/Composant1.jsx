import React, { useState } from "react";

export default function Composant1() {
  const [voiture, setVoiture] = useState({
    marque: "",
    modele: "",
    annee: "",
    couleur: "",
  });
  const [confirme, setConfirme] = useState(false);

  const handleChange = (e) =>
    setVoiture({ ...voiture, [e.target.name]: e.target.value });

  return (
    <div style={{ padding: 20 }}>
      <h2>Informations d’une voiture</h2>
      <input name="marque" placeholder="Marque" onChange={handleChange} /> <br />
      <input name="modele" placeholder="Modèle" onChange={handleChange} /> <br />
      <input name="annee" placeholder="Année" onChange={handleChange} /> <br />
      <input name="couleur" placeholder="Couleur" onChange={handleChange} /> <br />
      <button onClick={() => setConfirme(true)}>Confirmer</button>

      {confirme && (
        <div style={{ marginTop: 20 }}>
          <h3>Récapitulatif :</h3>
          <p>Marque : {voiture.marque}</p>
          <p>Modèle : {voiture.modele}</p>
          <p>Année : {voiture.annee}</p>
          <p>Couleur : {voiture.couleur}</p>
        </div>
      )}
    </div>
  );
}