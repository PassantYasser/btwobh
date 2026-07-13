import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./Features/Product/ProductSlice";

export const store = configureStore({
  reducer: {
    products: productReducer,
  },
});