import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ReactNode } from "react";

type ButtonProps = {
  onClick?: () => void;
  label: string;
};

export type ModalState = {
  isOpen: boolean;
  title: string;
  content: ReactNode;
  buttons: ButtonProps[];
};

const initialState: ModalState = {
  isOpen: false,
  title: "",
  content: undefined,
  buttons: [],
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
      state.buttons = payload.buttons
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
  },
});

export default modalSlice.reducer;
export const { openModal, closeModal } = modalSlice.actions;
