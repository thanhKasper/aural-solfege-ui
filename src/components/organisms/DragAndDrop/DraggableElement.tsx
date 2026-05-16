import type { PropsWithChildren } from "react";

const DraggableElement = ({ children }: PropsWithChildren) => {
  return (
    <div style={{ padding: 10, border: "1px solid black" }}>{children}</div>
  );
};

export default DraggableElement;
