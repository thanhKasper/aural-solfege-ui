import type { RootState } from "../store";

export const getModalSelector = () => {
  return (store: RootState) => store.modal;
};
