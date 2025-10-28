export const CartReducer = (state, action) => {
  // assure que Cart est toujours un tableau
  const cart = Array.isArray(state?.Cart) ? state.Cart : [];

  switch (action.type) {
    case "ADD_TO_CART": {
      const prod = action.payload;
      if (!prod || prod.id == null) return state; // payload invalide -> ne rien faire

      const exist = cart.find(p => p.id === prod.id);
      if (exist) {
        return {
          ...state,
          Cart: cart.map(p =>
            p.id === prod.id ? { ...p, qte: (p.qte || 0) + 1 } : p
          ),
        };
      } else {
        return {
          ...state,
          Cart: [...cart, { ...prod, qte: 1 }],
        };
      }
    }

    case "REMOVE_FROM_CART": {
      const id = action.payload;
      if (id == null) return state;
      return {
        ...state,
        Cart: cart.filter(p => p.id !== id),
      };
    }

    case "MODIFY_QTE": {
      const { id, qte } = action.payload || {};
      if (id == null) return state;
      // s'assurer que qte est un entier >= 1
      const qteInt = parseInt(qte, 10);
      if (isNaN(qteInt) || qteInt < 1) return state;

      return {
        ...state,
        Cart: cart.map(p =>
          p.id === id ? { ...p, qte: qteInt } : p
        ),
      };
    }

    case "CLEAR_CART":
      return { ...state, Cart: [] };

    case "GET_TOTAL_AMOUNT": {
      const total = cart.reduce((sum, p) => {
        const prix = Number(p.prix) || 0;
        const q = parseInt(p.qte, 10) || 0;
        return sum + prix * q;
      }, 0);
      return { ...state, totalAmount: total };
    }

    default:
      return state;
  }
};
