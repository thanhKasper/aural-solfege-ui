import { type PropsWithChildren } from "react";
import DraggableElement from "./DraggableElement";
import type { DragAndDropElement } from "../containers/Container.types";

interface ISourceElementProps {
  render: DragAndDropElement["render"];
  onElementCreated?: () => void;
  onElementRemoved?: () => void;
}

const SourceElement = ({
  children,
  render,
}: PropsWithChildren<ISourceElementProps>) => {
  return (
    <DraggableElement
      GhostComponent={children}
      onDrop={(domRect, subscriber) => {
        subscriber.createRelocatableElement(domRect, render);
      }}
    >
      {children}
    </DraggableElement>
  );
};

export default SourceElement;
