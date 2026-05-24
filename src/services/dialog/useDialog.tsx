import { useAppDispatch } from "@/store";
import { closeModal, openModal } from "@/store/slices";
import type { ReactNode } from "react";

const useDialog = () => {
  const dispatch = useAppDispatch();
  const close = () => {
    dispatch(closeModal());
  };
  const open = (args: { title: string; content: ReactNode }) => {
    dispatch(openModal(args));
    return close;
  };
  return {
    open,
  };
};

export default useDialog;
