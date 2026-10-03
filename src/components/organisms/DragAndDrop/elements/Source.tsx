import type { PropsWithChildren } from "react";

import { useDraggable } from "../hooks/useDraggable";

interface SourceProps extends PropsWithChildren {
  onBeforeRelocatableCreated?: (position: number) => void;
}

const Source = ({ children, onBeforeRelocatableCreated }: SourceProps) => {
  const draggable = useDraggable({ onSuccessDrop: onBeforeRelocatableCreated });

  return <div {...draggable}>{children}</div>;
};

export default Source;
