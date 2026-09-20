import type { RelocatableContentRenderer } from "@/components/organisms/DragAndDrop/elements/types";

export class DropElement<TPayload = unknown> {
  private _id: string;
  private _payload: TPayload;
  private _view: RelocatableContentRenderer;

  constructor(payload: TPayload, view: RelocatableContentRenderer) {
    this._id = `drop-element-${crypto.randomUUID}`;
    this._payload = payload;
    this._view = view;
  }

  get id(): string {
    return this._id;
  }

  set payload(payload: TPayload) {
    this._payload = payload;
  }

  get payload() {
    return this._payload;
  }

  render(): RelocatableContentRenderer {
    return this._view;
  }
}
