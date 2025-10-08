import React, { useState } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import ListStagiaires from "./ListStagiaires.jsx";
import FormStagiaire from "./FormStagiaire.jsx";

function App() {
  const [stagiaires, setStagiaires] = useState([
    { id: 1, matricule: 1454, nom: "Alaoui", ville: "Casa", codepostal: 20400, moyenne: 12.56 },
    { id: 2, matricule: 1455, nom: "Mansouri", ville: "Casa", codepostal: 20400, moyenne: 14.67 },
  ]);

  const [stagiaireEdit, setStagiaireEdit] = useState(null);
  const navigate = useNavigate();

  const addStagiaire = (s) => {
    const newS = { ...s, id: Date.now() };
    setStagiaires((prev) => [...prev, newS]);
  };

  const deleteStagiaire = (id) => {
    if (window.confirm("Supprimer ce stagiaire ?")) {
      setStagiaires((prev) => prev.filter((s) => s.id !== id));
    }
  };

  const editStagiaire = (s) => {
    setStagiaireEdit(s);
    navigate("/edit");
  };

  const updateStagiaire = (updated) => {
    setStagiaires((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
    setStagiaireEdit(null);
  };

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route
            path="/"
            element={<ListStagiaires stagiaires={stagiaires} onDelete={deleteStagiaire} onEdit={editStagiaire} />}
          />
          <Route path="/add" element={<FormStagiaire onSubmit={addStagiaire} />} />
          <Route
            path="/edit"
            element={
              stagiaireEdit ? (
                <FormStagiaire initialData={stagiaireEdit} onSubmit={updateStagiaire} />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
