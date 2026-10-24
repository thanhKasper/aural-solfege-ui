import {
  deleteSession,
  getAvailableSessions,
} from "@/providers/auralSolfege/apis";
import { NAVIGATION_ENDPOINT, URL_PATH } from "@/constants";
import useDialog from "@/hooks/useDialog";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { ExistingSessionDialogContent } from "../components/ExistingSessionDialogContent";
import { getLatestSession } from "../utils/getLatestSession";

export const useStartExercise = () => {
  const navigate = useNavigate();
  const dialog = useDialog();

  const sessionPath = (exerciseId: string) =>
    `${URL_PATH[NAVIGATION_ENDPOINT.SESSION]}/${exerciseId}`;

  const { mutate, isPending } = useMutation({
    mutationFn: async (exerciseId: string) => ({
      exerciseId,
      sessions: await getAvailableSessions(exerciseId),
    }),
    onSuccess: ({ exerciseId, sessions }) => {
      const latest = getLatestSession(sessions);
      if (!latest) {
        navigate(sessionPath(exerciseId));
        return;
      }

      const close = dialog.open({
        title: "Unfinished session found",
        content: <ExistingSessionDialogContent session={latest} />,
        buttons: [
          {
            label: "Continue",
            onClick: () => {
              close();
              navigate(
                `${sessionPath(exerciseId)}?sessionId=${latest.sessionId}`,
              );
            },
          },
          {
            label: "Start new",
            onClick: async () => {
              close();
              await Promise.all(
                sessions.map((session) => deleteSession(session.sessionId)),
              );
              navigate(sessionPath(exerciseId));
            },
          },
        ],
      });
    },
    onError: () => {
      const close = dialog.open({
        title: "Could not check your sessions",
        content: "Something went wrong. Please try again.",
        buttons: [{ label: "OK", onClick: () => close() }],
      });
    },
  });

  return { startExercise: mutate, isChecking: isPending };
};
