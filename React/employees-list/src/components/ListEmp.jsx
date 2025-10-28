import { useContext } from "react";
import { EmployeContext } from "./components/EmployeContext";
import { useNavigate } from "react-router-dom";

export default function ListEmp() {
  const { employes, dispatch } = useContext(EmployeContext);
  const navigate = useNavigate();

  const handleDelete = (id) => {
    dispatch({ type: "REMOVE_EMPLOYE", payload: id });
  };

  const handleEdit = (emp) => {
    navigate("/form", { state: { employe: emp } });
  };

  return (
    <div>
      <h2>Liste des Employés</h2>
      <table border="1" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Image</th>
            <th>Nom</th>
            <th>Salaire</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employes.map((emp) => (
            <tr key={emp.id}>
              <td><img src={emp.image} alt="" width="50" /></td>
              <td>{emp.nom}</td>
              <td>{emp.salaire} DH</td>
              <td>
                <button onClick={() => handleEdit(emp)}>Modifier</button>
                <button onClick={() => handleDelete(emp.id)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
