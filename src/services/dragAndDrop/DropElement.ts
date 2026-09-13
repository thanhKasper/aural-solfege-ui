export class DropElement<TPayload = unknown> {
  private _id: string;
  private _payload: TPayload;

  constructor(payload: TPayload) {
    this._id = `drop-element-${crypto.randomUUID}`;
    this._payload = payload;
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
}
