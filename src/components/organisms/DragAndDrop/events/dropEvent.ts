export type DropEventPayload = {
  dropCallback?: () => void;
};

export function handleElementDrop(payload: DropEventPayload) {
  payload.dropCallback?.();
}
