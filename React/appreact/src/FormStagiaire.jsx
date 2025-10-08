import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function FormStagiaire({ initialData = null, onSubmit }) {
  const [form, setForm] = useState({
    matricule: "",
    nom: "",
    ville: "",
    codepostal: "",
    moyenne: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nom.trim() || !form.matricule) return alert("Remplir tous les champs !");
    onSubmit(form);
    navigate("/");
  };

  return (
    <div className="card">
      <div className="card-body">
        <h3>{initialData ? "Éditer un stagiaire" : "Ajouter un stagiaire"}</h3>
        <form onSubmit={handleSubmit}>
          {["matricule", "nom", "ville", "codepostal", "moyenne"].map((f) => (
            <div className="mb-3" key={f}>
              <label className="form-label text-capitalize">{f}</label>
              <input
                name={f}
                value={form[f] || ""}
                onChange={handleChange}
                className="form-control"
              />
            </div>
          ))}
          <button className="btn btn-primary">{initialData ? "Mettre à jour" : "Ajouter"}</button>
          <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate("/")}>
            Annuler
          </button>
        </form>
      </div>
    </div>
  );
}

export default FormStagiaire;
