import { useEffect, useState, type PropsWithChildren } from "react";
import DraggableElement from "./DraggableElement";

interface IRelocatableElement {
  id: string;
}

const RelocatableElement = ({
  id,
  children,
}: PropsWithChildren<IRelocatableElement>) => {
  const [shouldShowElement, setShouldShowElement] = useState<boolean>(true);

  const mouseUp = () => {
    setShouldShowElement(true);
  };

  useEffect(() => {
    window.addEventListener("mouseup", mouseUp);
    return () => {
      window.removeEventListener("mouseup", mouseUp);
    };
  }, []);

  return (
    <DraggableElement
      id={id}
      onMouseDown={(e, baseOnMouseDown) => {
        baseOnMouseDown(e);
        setShouldShowElement(false);
      }}
      GhostComponent={children}
      onDropActionType="updatePosition"
    >
      {shouldShowElement && children}
    </DraggableElement>
  );
};

export default RelocatableElement;
