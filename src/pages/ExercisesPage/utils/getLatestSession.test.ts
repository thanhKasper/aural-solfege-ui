import { describe, expect, it } from "vitest";
import type { SessionDTO } from "@/providers/auralSolfege/apis.type";
import { getLatestSession } from "./getLatestSession";

const session = (sessionId: string, createdAt: string): SessionDTO => ({
  sessionId,
  totalSteps: 10,
  completedSteps: 3,
  createdAt,
});

describe("getLatestSession", () => {
  it("returns undefined when there are no sessions", () => {
    expect(getLatestSession([])).toBeUndefined();
  });

  it("returns the only session", () => {
    const only = session("a", "2026-10-01T08:00:00Z");
    expect(getLatestSession([only])).toBe(only);
  });

  it("returns the most recently created session", () => {
    const older = session("a", "2026-10-01T08:00:00Z");
    const newer = session("b", "2026-10-02T08:00:00Z");
    expect(getLatestSession([newer, older])).toBe(newer);
    expect(getLatestSession([older, newer])).toBe(newer);
  });
});
