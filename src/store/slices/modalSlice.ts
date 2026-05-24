import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ReactNode } from "react";

type ModalState = {
  isOpen: boolean;
  title: string;
  content: ReactNode;
};

const initialState: ModalState = {
  isOpen: false,
  title: "",
  content: undefined,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (
      state,
      { payload }: PayloadAction<Omit<ModalState, "isOpen">>,
    ) => {
      state.isOpen = true;
      state.title = payload.title;
      state.content = payload.content;
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
  },
});

export default modalSlice.reducer;
export const { openModal, closeModal } = modalSlice.actions;
