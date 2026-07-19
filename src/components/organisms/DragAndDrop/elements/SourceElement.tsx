import { useEffect, useId, type PropsWithChildren } from "react";
import DraggableElement from "./DraggableElement";
import { EventType, type DragAndDropElement } from "../DragAndDrop.types";
import useObservant from "../hooks/useObservant";
import useNotify from "../hooks/useNotify";

interface ISourceElementProps<TValue> {
  onRelocatableElementCreated?: DragAndDropElement<TValue>["onCreated"];
  onBeforeRelocatableElementCreated?: () => void;
  render: DragAndDropElement<TValue>["render"];
}

const SourceElement = <TValue,>({
  children,
  onRelocatableElementCreated,
  onBeforeRelocatableElementCreated,
  render,
}: PropsWithChildren<ISourceElementProps<TValue>>) => {
  const componentId = useId();
  const { subscribe } = useObservant(componentId);
  const { notify } = useNotify();

  useEffect(() => {
    subscribe<{ element: TValue; position: number }>(
      EventType.CONSTRUCT_ELEMENT,
      ({ element, position }) => {
        notify<{ dndElement: DragAndDropElement<TValue>; position: number }>(
          EventType.RENDER_ELEMENT,
          {
            dndElement: {
              onCreated: onRelocatableElementCreated,
              id: crypto.randomUUID(),
              render,
              value: element,
            },
            position,
          },
        );
      },
    );
  }, [subscribe, notify, render, onRelocatableElementCreated]);

  return (
    <DraggableElement
      onDrop={(domRect, sendEvent) => {
        sendEvent(EventType.DROP, {
          dropPosition: domRect,
          callback: onBeforeRelocatableElementCreated,
        });
      }}
    >
      {children}
    </DraggableElement>
  );
};

export default SourceElement;
