import { useContext } from "react";
import { DragAndDropContext } from "../providers/DragAndDropContextV2";
import { GhostElement } from "../elements/GhostElement";
import type { DropElementData } from "@/services/dragAndDrop/types";
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

  const addContainer = (containerId: string) => {
    if (!containersRef) return;

    const containers = containersRef.current;

    if (containers.has(containerId)) return;

    containers.set(containerId, []);
  };

  const addElement = (containerId: string, element: DropElementData) => {
    const elements = containersRef?.current?.get(containerId);

    if (!elements) return;

    elements.push(element);
  };

  return {
    showGhostComponent,
    hideGhostComponent,
    addContainer,
    addElement,
  };
};
