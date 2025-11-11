import { createContext, useReducer } from "react";

export const CartContext = createContext();

const initialState = {
  cart: []
};

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_TO_CART":
      const existing = state.cart.find(p => p.id === action.payload.id);

      if (existing) {
        return {
          ...state,
          cart: state.cart.map(p =>
            p.id === action.payload.id
              ? { ...p, quantity: p.quantity + 1 }
              : p
          )
        };
      }

      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }]
      };

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter(p => p.id !== action.payload)
      };

    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}
