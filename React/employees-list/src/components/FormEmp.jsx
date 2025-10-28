import { useContext, useState,} from "react";
import { EmployeContext } from "./components/EmployeContext";
import { useNavigate, useLocation } from "react-router-dom";

export default function FormEmp() {
  const { dispatch } = useContext(EmployeContext);
  const navigate = useNavigate();
  const location = useLocation();

  const empToEdit = location.state?.employe;

  const [form, setForm] = useState({
    id: empToEdit ? empToEdit.id : null,
    nom: empToEdit ? empToEdit.nom : "",
    image: empToEdit ? empToEdit.image : "",
    salaire: empToEdit ? empToEdit.salaire : ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.id) {
      dispatch({ type: "EDIT_EMPLOYE", payload: form });
    } else {
      dispatch({ type: "ADD_EMPLOYE", payload: { ...form, id: Date.now() } });
    }

    navigate("/");
  };

  return (
    <div>
      <h2>{form.id ? "Modifier Employé" : "Ajouter Employé"}</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="nom" placeholder="Nom" value={form.nom} onChange={handleChange} required />
        <input type="text" name="image" placeholder="URL Image" value={form.image} onChange={handleChange} />
        <input type="number" name="salaire" placeholder="Salaire" value={form.salaire} onChange={handleChange} required />
        <button type="submit">{form.id ? "Modifier" : "Ajouter"}</button>
      </form>
    </div>
  );
}
