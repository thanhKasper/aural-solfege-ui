import { useEffect, useId, type PropsWithChildren } from "react";
import DraggableElement from "./DraggableElement";
import { EventType, type DragAndDropElement } from "../DragAndDrop.types";
import useObservant from "../hooks/useObservant";
import useNotify from "../hooks/useNotify";

interface ISourceElementProps<TValue> {
  onRelocatableElementCreated?: DragAndDropElement<TValue>["onCreated"];
  onBeforeElementDrop?: (position: number) => void;
  render: DragAndDropElement<TValue>["render"];
}

const SourceElement = <TValue,>({
  children,
  onRelocatableElementCreated,
  onBeforeElementDrop,
  render,
}: PropsWithChildren<ISourceElementProps<TValue>>) => {
  const componentId = useId();
  const { subscribe } = useObservant(componentId);
  const { notify } = useNotify();

  useEffect(() => {
    subscribe<{ data: TValue; position: number }>(
      EventType.CONSTRUCT_ELEMENT,
      ({ data, position }) => {
        notify<{ dndElement: DragAndDropElement<TValue>; position: number }>(
          EventType.RENDER_ELEMENT,
          {
            dndElement: {
              onCreated: onRelocatableElementCreated,
              id: crypto.randomUUID(),
              render,
              value: data,
            },
            position,
          },
        );
      },
    );

    subscribe<{ draggableElementId: string; data: TValue; position: number }>(
      EventType.REBUILD_ELEMENT,
      ({ draggableElementId, data, position }) => {
        notify<{ dndElement: DragAndDropElement<TValue>; position: number }>(
          EventType.RENDER_ELEMENT,
          {
            dndElement: {
              onCreated: onRelocatableElementCreated,
              id: draggableElementId,
              render,
              value: data,
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
        sendEvent<{
          dropPosition: DOMRect;
          callback?: (position: number) => void;
        }>(EventType.DROP, {
          dropPosition: domRect,
          callback: onBeforeElementDrop,
        });
      }}
    >
      {children}
    </DraggableElement>
  );
};

export default SourceElement;
