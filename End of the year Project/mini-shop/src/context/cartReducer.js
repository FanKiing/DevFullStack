export const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [...state, { ...action.product, quantity: 1 }];

    case "REMOVE":
      return state.filter(item => item.id !== action.id);

    case "UPDATE_QTY":
      return state.map(item =>
        item.id === action.id ? { ...item, quantity: action.qty } : item
      );

    default:
      return state;
  }
};
