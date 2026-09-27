export const getPreviewNode = (element: HTMLElement) =>
  (element.firstElementChild as HTMLElement | null) ?? element;
