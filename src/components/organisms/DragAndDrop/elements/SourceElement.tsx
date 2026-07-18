import { type PropsWithChildren } from "react";
import type { DragAndDropElement } from "../containers/Container.types";
import DraggableElement from "./DraggableElement";
import { EventType } from "../types";

interface ISourceElementProps {
  onRelocatableElementCreated?: DragAndDropElement["onCreated"];
  render: DragAndDropElement["render"];
}

const SourceElement = ({
  children,
  onRelocatableElementCreated,
  render,
}: PropsWithChildren<ISourceElementProps>) => {
  return (
    <DraggableElement
      onDrop={(domRect, sendEvent) => {
        sendEvent(EventType.DROP, {
          dropPosition: domRect,
          callbacks: {
            onCreated: onRelocatableElementCreated,
            render,
          },
        });
      }}
    >
      {children}
    </DraggableElement>
  );
};

export default SourceElement;
