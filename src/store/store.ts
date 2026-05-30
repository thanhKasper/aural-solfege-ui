import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "@/store/slices/modalSlice";

export const store = configureStore({
  reducer: {
    modal: modalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["modal/openModal"],
        ignoredPaths: ["modal.content", "modal.buttons"],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
