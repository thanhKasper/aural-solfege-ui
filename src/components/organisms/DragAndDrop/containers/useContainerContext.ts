import { createContext, useContext } from "react";

// Stored per element key; `position` is the element's index in the container.
export type ElementRect = { position: number; rect: DOMRect };

export type ContainerContextValue = {
  register: (key: string, position: number, element: HTMLElement) => () => void;
};

export const ContainerContext = createContext<ContainerContextValue | null>(
  null,
);

export const useContainerContext = () => {
  const ctx = useContext(ContainerContext);
  if (!ctx) {
    throw Error("useContainerContext must be used inside <ContainerProvider>");
  }
  return ctx;
};
