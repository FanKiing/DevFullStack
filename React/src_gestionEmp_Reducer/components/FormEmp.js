import React, { useState, useContext, useEffect } from "react";
import { EmployeContext } from "../context/EmployeContext";
import { useNavigate, useParams } from "react-router-dom";

const  FormEmp=()=> {
  const { state, dispatch } = useContext(EmployeContext);
  const navigate = useNavigate();
  const { id } = useParams(); 

  const [formData, setFormData] = useState({ id: null, nom: "", salaire: "", image: "" });
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (id) {
      const emp = state.employes.find((e) => e.id === parseInt(id));
      if (emp) {
        setFormData(emp);
        setEditMode(true);
      }
    }
  }, [id, state.employes]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.nom || !formData.salaire || !formData.image) {
      alert("Veuillez remplir tous les champs !");
      return;
    }

    if (editMode) {
      dispatch({ type: "EDIT", payload: formData });
      setEditMode(false);
    } else {
      dispatch({ type: "ADD", payload: { ...formData, id: Date.now() } });
    }

    navigate("/");
  };

  return (
    <div className="container">
      <h3>{editMode ? "Modifier Employé" : "Ajouter Employe"}</h3>
      <form onSubmit={handleSubmit} className="card p-3 shadow-sm">
        <div className="mb-3">
          <label className="form-label">Nom</label>
          <input
            type="text"
            name="nom"
            className="form-control"
            value={formData.nom}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Salaire</label>
          <input
            type="number"
            name="salaire"
            className="form-control"
            value={formData.salaire}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">URL Image</label>
          <input
            type="url"
            name="image"
            className="form-control"
            value={formData.image}
            onChange={handleChange}
          />
        </div>
        <button className="btn btn-primary w-100" type="submit">
          {editMode ? "Modifier" : "Ajouter"}
        </button>
      </form>
    </div>
  );
}
export default FormEmp;
