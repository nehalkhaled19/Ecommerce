import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "./CategorySlice";

export  let categoryConfigureStore = configureStore({
    reducer:{
      category: categorySlice
    }
})
