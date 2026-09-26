import type { RelocatableContentRenderer } from "@/components/organisms/DragAndDrop/elements/types";

export interface DropElementData<TPayload = unknown> {
  id: string;
  payload: TPayload;
  render: RelocatableContentRenderer;
}
