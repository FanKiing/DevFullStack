import { createContext, useReducer } from "react";

const initialState = {
  employes: []
};

function EmployeReducer(state, action) {
  switch (action.type) {
    case "ADD_EMPLOYE":
      return { ...state, employes: [...state.employes, action.payload] };
    case "REMOVE_EMPLOYE":
      return { ...state, employes: state.employes.filter(e => e.id !== action.payload) };
    case "EDIT_EMPLOYE":
      return {
        ...state,
        employes: state.employes.map(e => e.id === action.payload.id ? action.payload : e)
      };
    case "CLEAR_EMPLOYES":
      return { ...state, employes: [] };
    default:
      return state;
  }
}

export const EmployeContext = createContext();

export function EmployeProvider({ children }) {
  const [state, dispatch] = useReducer(EmployeReducer, initialState);
  return (
    <EmployeContext.Provider value={{ employes: state.employes, dispatch }}>
      {children}
    </EmployeContext.Provider>
  );
}