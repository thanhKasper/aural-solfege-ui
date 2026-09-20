import { useContext } from "react";
import { DragAndDropContext } from "../providers/DragAndDropContextV2";
import { GhostElement } from "../elements/GhostElement";
import type { Container } from "@/services/dragAndDrop/Container";
import type { DropElement } from "@/services/dragAndDrop/DropElement";
import type { DropEventPayload } from "../events";

export const useDragAndDrop = () => {
  const ctx = useContext(DragAndDropContext);
  if (!ctx) {
    throw Error("useDragAndDrop is used outside of the drag and drop context");
  }

  const { setGhost, containersRef } = ctx;

  const showGhostComponent = (
    element: HTMLElement,
    onSuccessDrop?: DropEventPayload["dropCallback"],
  ) => {
    setGhost(<GhostElement element={element} onSuccessDrop={onSuccessDrop} />);
  };

  const hideGhostComponent = () => {
    setGhost(undefined);
  };

  const addContainer = (container: Container) => {
    if (!containersRef) return;

    const containers = containersRef.current;

    if (containers.has(container.id)) return;

    containers.set(container.id, container);
  };

  const addElement = (containerId: string, element: DropElement) => {
    const container = containersRef?.current?.get(containerId);

    if (!container) return;

    container.addElement(element, container.getElements().length);
  };

  return {
    showGhostComponent,
    hideGhostComponent,
    addContainer,
    addElement,
  };
};
