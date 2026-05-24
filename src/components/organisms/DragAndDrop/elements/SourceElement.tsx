import { type PropsWithChildren } from "react";
import type { DragAndDropElement } from "../containers/Container.types";
import DraggableElement from "./DraggableElement";

interface ISourceElementProps {
  onRelocatableElementCreated?: () => void;
  render: DragAndDropElement["render"];
}

const SourceElement = ({
  children,
  onRelocatableElementCreated,
  render,
}: PropsWithChildren<ISourceElementProps>) => {
  return (
    <DraggableElement
      GhostComponent={children}
      onDrop={(domRect, subscriber) => {
        subscriber.createRelocatableElement(domRect, {
          onCreated: onRelocatableElementCreated,
          render,
        });
      }}
    >
      {children}
    </DraggableElement>
  );
};

export default SourceElement;
