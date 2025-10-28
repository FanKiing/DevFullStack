import React, { useContext } from "react";
import { EmployeContext } from "../context/EmployeContext";
import { useNavigate } from "react-router-dom";

const ListEmp=() =>{
  const { state, dispatch } = useContext(EmployeContext);
  const navigate = useNavigate();

  const handleEdit = (emp) => {
    navigate(`/form/:${emp.id}`);
  };

  const handleRemove = (id) => {
    dispatch({ type: "REMOVE", payload: id });
  };

  const handleClear = () => {
    dispatch({ type: "CLEAR" });
  };

  return (
    <div className="container">
      <h3>Liste des employés</h3>
      {state.employes.length === 0 ? (
        <p>Aucun employé enregistré</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-striped text-center align-middle">
            <thead className="table-dark">
              <tr>
                <th>Image</th>
                <th>Nom</th>
                <th>Salaire</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {state.employes.map((emp) => (
                <tr key={emp.id}>
                  <td>
                    <img src={emp.image} alt={emp.nom} width="60" height="60" style={{ borderRadius: "50%" }} />
                  </td>
                  <td>{emp.nom}</td>
                  <td>{emp.salaire} DH</td>
                  <td>
                    <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(emp)}>Modifier</button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleRemove(emp.id)}>Supprimer</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {
            state.employes.length === 0 &&(
                <button className="btn btn-danger" onClick={handleClear}>Vider la liste</button>
            )
          }
          
        </div>
      )}
    </div>
  );
}

export default ListEmp;