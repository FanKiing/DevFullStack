export const employeReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return { ...state, employes: [...state.employes, action.payload] };
    case "REMOVE":
      return {
        ...state,
        employes: state.employes.filter((emp) => emp.id !== action.payload),
      };
    case "EDIT":
      return {
        ...state,
        employes: state.employes.map((emp) =>
          emp.id === action.payload.id ? action.payload : emp
        ),
      };
    case "CLEAR":
      return { ...state, employes: [] };
    default:
      return state;
  }
};
