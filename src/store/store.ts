import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "@/store/slices/modalSlice";

export const store = configureStore({
  reducer: {
    modal: modalReducer,
  },
});
