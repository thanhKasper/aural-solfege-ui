import type { ReactNode } from "react";

type RelocatableActions = {
  remove: () => void;
  moveUp: () => void;
  moveDown: () => void;
};

export type RelocatableContentRenderer = (
  actions: RelocatableActions,
) => ReactNode;
