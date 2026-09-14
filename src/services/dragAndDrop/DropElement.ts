import type { ReactNode } from "react";

export class DropElement<TPayload = unknown> {
  private _id: string;
  private _payload: TPayload;
  private _view: ReactNode;

  constructor(payload: TPayload, view: ReactNode) {
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

  render(): ReactNode {
    return this._view;
  }
}
