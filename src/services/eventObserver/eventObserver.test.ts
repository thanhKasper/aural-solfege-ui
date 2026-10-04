import { beforeEach, describe, expect, it, vi } from "vitest";
import { EventObserver } from "./eventObserver";

describe("EventObserver", () => {
  let observer: EventObserver;

  beforeEach(() => {
    observer = EventObserver.init();
  });

  describe("init()", () => {
    it("instantiates an EventObserver", () => {
      expect(observer).toBeInstanceOf(EventObserver);
    });

    it("returns the same (singleton) instance on every call", () => {
      expect(EventObserver.init()).toBe(observer);
    });
  });

  describe("subscribe()", () => {
    it("returns a listener id for each subscription", () => {
      const listenerId = observer.subscribe<string>("event", vi.fn());
      expect(typeof listenerId).toBe("string");
      expect(listenerId).not.toHaveLength(0);
    });

    it("returns a unique listener id for each subscription", () => {
      const firstId = observer.subscribe("event", vi.fn());
      const secondId = observer.subscribe("event", vi.fn());
      expect(secondId).not.toBe(firstId);
    });
  });

  describe("dispatch()", () => {
    it("calls the subscribed handler with the payload", () => {
      const handler = vi.fn();
      observer.subscribe<string>("sound:play", handler);

      observer.dispatch("sound:play", "C4");

      expect(handler).toHaveBeenCalledOnce();
      expect(handler).toHaveBeenCalledWith("C4");
    });

    it("calls every handler subscribed to the same event", () => {
      const firstHandler = vi.fn();
      const secondHandler = vi.fn();
      observer.subscribe<number>("note", firstHandler);
      observer.subscribe<number>("note", secondHandler);

      observer.dispatch("note", 60);

      expect(firstHandler).toHaveBeenCalledWith(60);
      expect(secondHandler).toHaveBeenCalledWith(60);
    });

    it("does not call handlers subscribed to other events", () => {
      const handler = vi.fn();
      observer.subscribe<string>("sound:play", handler);

      observer.dispatch("sound:stop", "silence");

      expect(handler).not.toHaveBeenCalled();
    });
  });

  describe("unsubscribe()", () => {
    it("stops the handler from being called on subsequent dispatches", () => {
      const handler = vi.fn();
      const listenerId = observer.subscribe<string>("sound:play", handler);
      observer.dispatch("sound:play", "C4");
      expect(handler).toHaveBeenCalledOnce();

      observer.unsubscribe(listenerId);
      observer.dispatch("sound:play", "D4");

      expect(handler).toHaveBeenCalledOnce();
    });

    it("does not affect handlers subscribed to the same event", () => {
      const firstHandler = vi.fn();
      const secondHandler = vi.fn();
      const firstId = observer.subscribe("note", firstHandler);
      observer.subscribe("note", secondHandler);

      observer.unsubscribe(firstId);
      observer.dispatch("note", 60);

      expect(firstHandler).not.toHaveBeenCalled();
      expect(secondHandler).toHaveBeenCalledWith(60);
    });

    it("does not affect handlers subscribed to other events", () => {
      const handler = vi.fn();
      observer.subscribe("note", handler);
      const listenerId = observer.subscribe("request", vi.fn());

      observer.unsubscribe(listenerId);
      observer.dispatch("note", 60);

      expect(handler).toHaveBeenCalledWith(60);
    });

    it("throws when the listener id does not exist", () => {
      expect(() => observer.unsubscribe("non-existent-id")).toThrowError(
        /No listener with id non-existent-id exist/,
      );
    });
  });
});