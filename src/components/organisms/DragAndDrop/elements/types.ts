import type { ReactNode } from "react";

type RelocatableActions = {
  remove: () => void;
  update: () => void;
  moveUp: () => void;
  moveDown: () => void;
};

export type RelocatableContentRenderer = (
  actions: RelocatableActions,
) => ReactNode;
