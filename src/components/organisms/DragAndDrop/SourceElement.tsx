import { type PropsWithChildren } from "react";
import DraggableElement from "./DraggableElement";

interface ISourceElementProps {
  id: string;
}

const SourceElement = ({
  id,
  children,
}: PropsWithChildren<ISourceElementProps>) => {
  return (
    <DraggableElement id={id} GhostComponent={children}>
      {children}
    </DraggableElement>
  );
};

export default SourceElement;
