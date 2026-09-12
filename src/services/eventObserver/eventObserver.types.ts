export type EventHandler<TPayload> = (payload: TPayload) => void;

export interface IEventListener<T> {
  id: ListenerId;
  eventName: string;
  handler: EventHandler<T>;
  wrappedEventHandler: (event: Event) => void;
}

export type ListenerId = string;
