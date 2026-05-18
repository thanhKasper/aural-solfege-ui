import type { DragState, Subscriber } from "./DragAndDropContext";

export type TAction = (subscriber: Subscriber, dragState: DragState) => void;

export function createRelocatableElementAction(
  subscriber: Subscriber,
  dragState: DragState,
) {
  subscriber.createRelocatableElement(dragState);
}

export function updateRelocatableElementPosition(
  subscriber: Subscriber,
  dragState: DragState,
) {
  subscriber.updateRelocatableElementPosition(dragState);
}
