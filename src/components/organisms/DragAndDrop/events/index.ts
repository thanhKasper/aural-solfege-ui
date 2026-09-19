export type DropEventPayload = {
  dropCallback?: () => void;
  componentDomRect: DOMRect;
};

export type MoveEventPayload = {
  element: HTMLElement;
};
