import { Container } from "@/services/dragAndDrop/Container";
import type { DropElement } from "@/services/dragAndDrop/DropElement";
import { useEffect, useRef } from "react";

interface VerticalStackedContainerProps {
  dropElements: DropElement[];
}

const VerticalStackedContainer = ({
  dropElements,
}: VerticalStackedContainerProps) => {
  const containerRef = useRef<Container>(new Container(dropElements));

  useEffect(() => {
    containerRef.current.updateElements(dropElements);
  }, [dropElements]);

  return (
    <div>
      {dropElements.map((element) => {
        const renderedComponent = element.render();
        return renderedComponent;
      })}
    </div>
  );
};

export default VerticalStackedContainer;
