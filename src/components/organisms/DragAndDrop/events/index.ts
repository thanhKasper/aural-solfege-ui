export type DropEventPayload = {
  dropCallback?: (dropPosition: number, containerId?: string) => void;
  componentDomRect: DOMRect;
};

export type MoveEventPayload = {
  element: DOMRect;
};
