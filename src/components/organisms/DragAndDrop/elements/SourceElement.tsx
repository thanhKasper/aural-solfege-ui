import { type PropsWithChildren, type ReactNode } from "react";
import DraggableElement from "./DraggableElement";

interface ISourceElementProps {
  id: string;
  render?: () => ReactNode;
  onElementCreated?: () => void;
  onElementRemoved?: () => void;
}

const SourceElement = ({
  id,
  children,
  render,
}: PropsWithChildren<ISourceElementProps>) => {
  return (
    <DraggableElement
      id={id}
      GhostComponent={children}
      onDrop={(domRect, subscriber) => {
        subscriber.createRelocatableElement(domRect, () => {
          return render?.();
        });
      }}
    >
      {children}
    </DraggableElement>
  );
};

export default SourceElement;
