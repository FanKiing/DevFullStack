import { createSlice } from "@reduxjs/toolkit";
const productSlice=createSlice({
name:"products",
initialState:[
    { id: 1, title: "Laptop", price: 8000 },
    { id: 2, title: "Mouse", price: 150 },
    { id: 3, title: "Keyboard", price: 250 },
],
reducer:{}

});
export default productSlice.reducer;