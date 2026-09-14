import type {
  EventHandler,
  IEventListener,
  ListenerId,
} from "./eventObserver.types";

export class EventObserver extends EventTarget {
  private topics: Map<string, Set<ListenerId>> = new Map();
  private static instance: EventObserver | null = null;
  private listeners: Map<ListenerId, IEventListener<unknown>> = new Map();

  private constructor() {
    super();
    if (!EventObserver.instance) {
      EventObserver.instance = this;
    }
    return EventObserver.instance;
  }

  public static init() {
    return new EventObserver();
  }

  public subscribe<T>(eventName: string, handler: EventHandler<T>): ListenerId {
    const listenerId = crypto.randomUUID();
    const listener: IEventListener<T> = {
      id: listenerId,
      eventName,
      handler,
      wrappedEventHandler: (event) => {
        const customEvent = event as CustomEvent<T>;
        handler(customEvent.detail);
      },
    };
    const genericListener = listener as IEventListener<unknown>;

    this.addEventListener(eventName, listener.wrappedEventHandler);
    const eventListeners = this.topics.get(eventName) ?? new Set();
    eventListeners.add(listenerId);
    this.topics.set(eventName, eventListeners);
    this.listeners.set(listenerId, genericListener);

    return listenerId;
  }

  public unsubscribe(listenerId: string) {
    const listener = this.listeners.get(listenerId);

    if (!listener) {
      throw Error(`No listener with id ${listenerId} exist`);
    }

    this.removeEventListener(listener.eventName, listener.wrappedEventHandler);
    this.listeners.delete(listenerId);
    this.topics.get(listener.eventName)?.delete(listenerId);
  }

  public dispatch<T>(eventName: string, payload: T) {
    this.dispatchEvent(new CustomEvent(eventName, { detail: payload }));
  }
}

export const eventBus = EventObserver.init();
