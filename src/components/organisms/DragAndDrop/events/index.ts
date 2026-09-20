export type DropEventPayload = {
  dropCallback?: (containerId?: string) => void;
  componentDomRect: DOMRect;
};

export type MoveEventPayload = {
  element: DOMRect;
};
