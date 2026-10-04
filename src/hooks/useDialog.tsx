import { useAppDispatch } from "@/store";
import { closeModal, openModal } from "@/store/slices";
import type { ModalState } from "@/store/slices/modalSlice";

const useDialog = () => {
  const dispatch = useAppDispatch();
  const close = () => {
    dispatch(closeModal());
  };
  const open = (args: Omit<ModalState, "isOpen">) => {
    dispatch(openModal(args));
    return close;
  };
  return {
    open,
  };
};

export default useDialog;
