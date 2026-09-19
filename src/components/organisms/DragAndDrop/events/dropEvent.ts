export type DropEventPayload = {
  dropCallback?: () => void;
  componentDomRect: DOMRect;
};

export function handleElementDrop({
  componentDomRect,
  dropCallback,
}: DropEventPayload) {
  console.log("Receive dom rect", componentDomRect);
  dropCallback?.();
}
