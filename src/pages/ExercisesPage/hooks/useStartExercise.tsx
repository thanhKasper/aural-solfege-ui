import {
  deleteSession,
  getAvailableSessions,
  createExerciseSession,
} from "@/providers/auralSolfege/apis";
import { NAVIGATION_ENDPOINT, URL_PATH } from "@/constants";
import useDialog from "@/hooks/useDialog";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { ExistingSessionDialogContent } from "../components/ExistingSessionDialogContent";

export const useStartExercise = () => {
  const navigate = useNavigate();
  const dialog = useDialog();

  const sessionPath = (exerciseId: string, sessionId: string) =>
    `${URL_PATH[NAVIGATION_ENDPOINT.SESSION]}/${exerciseId}?sessionId=${sessionId}`;

  const { mutate: createSession, isPending: isCreating } = useMutation({
    mutationFn: async ({
      exerciseId,
      staleSessionId,
    }: {
      exerciseId: string;
      staleSessionId?: string;
    }) => {
      if (staleSessionId) await deleteSession(staleSessionId);
      return createExerciseSession(exerciseId);
    },
    onSuccess: ({ metadata }, { exerciseId }) =>
      navigate(sessionPath(exerciseId, metadata.sessionId)),
  });

  const { mutate: checkSessions, isPending: isChecking } = useMutation({
    mutationFn: async (exerciseId: string) => ({
      exerciseId,
      sessions: await getAvailableSessions(exerciseId),
    }),
    onSuccess: ({ exerciseId, sessions }) => {
      const [existing] = sessions;
      if (!existing) {
        createSession({ exerciseId });
        return;
      }

      const close = dialog.open({
        title: "Unfinished session found",
        content: <ExistingSessionDialogContent session={existing} />,
        buttons: [
          {
            label: "Continue",
            onClick: () => {
              close();
              navigate(sessionPath(exerciseId, existing.sessionId));
            },
          },
          {
            label: "Start new",
            onClick: () => {
              close();
              createSession({
                exerciseId,
                staleSessionId: existing.sessionId,
              });
            },
          },
        ],
      });
    },
  });

  return {
    startExercise: checkSessions,
    isChecking: isChecking || isCreating,
  };
};
