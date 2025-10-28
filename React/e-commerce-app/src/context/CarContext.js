import React, { createContext, useReducer } from "react";
import { CartReducer } from "./CartReducer";

export const CartContext = createContext();

const initialState = {
  produits: [
    { id: 1, intitule: "Desktop PC", prix: 18000, image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.msi.com%2FDesktop%2Finfinite-a%2FSpecification&psig=AOvVaw1FmsH_P8SZNLKSg2YnDytZ&ust=1761728721442000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCJC0pobFxpADFQAAAAAdAAAAABAE" },
    { id: 2, intitule: "Smartphone", prix: 10000, image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.samsung.com%2Fph%2Fsmartphones%2Fgalaxy-s25-ultra%2Fspecs%2F&psig=AOvVaw3yp7XUXBA-TIHh2EC6ZDCY&ust=1761728768565000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCPjSg53FxpADFQAAAAAdAAAAABAj" },
    { id: 3, intitule: "Casque", prix: 1600, image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.ubuy.ma%2Fen%2Fproduct%2F3EIBZC-bengoo-g9000-stereo-gaming-headset-for-ps4-pc-xbox-one-ps5-controller-noise-cancelling-over-ear-headphones-with-mic-led-light-bass-surround-soft-memor%3Fsrsltid%3DAfmBOorCAo0E_zbm74v9V56ES1Au21Rdg4Ph4k1Ir3bl4eCf4E5j16DW&psig=AOvVaw0ParwpzgTHeuFcXeqgEvmq&ust=1761728826469000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCJD-m7nFxpADFQAAAAAdAAAAABAE" },
  ],
  Cart: [],
  totalAmount: 0,
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CartReducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};
