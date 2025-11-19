import {configureStore} from "@reduxjs/toolkit"
import productsReducer from "./features/ProductSlice"
import cartReducer from "./features/CartSlice";
export const store=configureStore({

    reducer:{
        products:productsReducer,
        cart:cartReducer
    }
})