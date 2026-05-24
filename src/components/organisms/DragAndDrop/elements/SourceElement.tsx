import { type PropsWithChildren } from "react";
import DraggableElement from "./DraggableElement";
import type { DragAndDropElement } from "../containers/Container.types";

const SourceElement = ({
  children,
  ...callbacks
}: PropsWithChildren<Omit<DragAndDropElement, "id">>) => {
  return (
    <DraggableElement
      GhostComponent={children}
      onDrop={(domRect, subscriber) => {
        subscriber.createRelocatableElement(domRect, callbacks);
      }}
    >
      {children}
    </DraggableElement>
  );
};

export default SourceElement;
