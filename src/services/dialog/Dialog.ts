import { closeModal, openModal } from "@/store/slices";
import type { ModalState } from "@/store/slices/modalSlice";
import { store } from "@/store/store";

export class Dialog {
  /**
   * Opens the dialog with the given configuration.
   *
   * Can be called from anywhere — React components or plain TS/JS code —
   * because it dispatches directly on the Redux store instead of relying
   * on React hooks.
   *
   * @returns a function that closes the dialog that was just opened.
   */
  open(options: Omit<ModalState, "isOpen">): () => void {
    store.dispatch(openModal(options));
    return () => this.close();
  }

  /** Closes the currently open dialog. */
  close(): void {
    store.dispatch(closeModal());
  }
}

/** Singleton instance for non-React code: `dialog.open({ ... })`. */
export const dialogService = new Dialog();

export default dialogService;
