import type { SessionDTO } from "@/providers/auralSolfege/apis.type";

export const getLatestSession = (
  sessions: SessionDTO[],
): SessionDTO | undefined =>
  sessions.reduce<SessionDTO | undefined>(
    (latest, session) =>
      !latest || Date.parse(session.createdAt) > Date.parse(latest.createdAt)
        ? session
        : latest,
    undefined,
  );
