import type { ReactNode } from "react";

type RelocatableActions = {
  value: unknown;
  remove: () => void;
  moveUp: () => void;
  moveDown: () => void;
};

export type RelocatableContentRenderer = (
  actions: RelocatableActions,
) => ReactNode;
