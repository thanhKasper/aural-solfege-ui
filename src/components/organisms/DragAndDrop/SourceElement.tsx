import { type PropsWithChildren } from "react";
import DraggableElement from "./DraggableElement";
import { createRelocatableElementAction } from "./actions";

interface ISourceElementProps {
  id: string;
}

const SourceElement = ({
  id,
  children,
}: PropsWithChildren<ISourceElementProps>) => {
  return (
    <DraggableElement
      id={id}
      GhostComponent={children}
      onDrop={createRelocatableElementAction}
    >
      {children}
    </DraggableElement>
  );
};

export default SourceElement;
