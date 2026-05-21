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
}: PropsWithChildren<ISourceElementProps>) => {
  return (
    <DraggableElement
      id={id}
      GhostComponent={children}
      onDrop={(domRect, subscriber) => {
        subscriber.createRelocatableElement(domRect, () => {
          return <p>This is created from source element {id}</p>;
        });
      }}
    >
      {children}
    </DraggableElement>
  );
};

export default SourceElement;
