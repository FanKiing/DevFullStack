import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    add: (state, action) => {
      const p = state.find(item => item.id === action.payload.id);
      if (p) {
        p.qty += 1;
      } else {
        state.push({ ...action.payload, qty: 1 }); // ✅ copier action.payload
      }
    },
    remove: (state, action) => {
      const pos = state.findIndex(item => item.id === action.payload); // ✅ typo fix
      if (pos !== -1) state.splice(pos, 1);
    },
    increment: (state, action) => {
      const p = state.find(item => item.id === action.payload.id);
      if (p) p.qty += 1;
    },
    decrement: (state, action) => {
      const pos = state.findIndex(item => item.id === action.payload); // ✅ typo fix
      if (pos !== -1) {
        if (state[pos].qty > 1) state[pos].qty -= 1;
        else state.splice(pos, 1);
      }
    },
  },
});

export const { add, remove, increment, decrement } = CartSlice.actions;
export default CartSlice.reducer;
