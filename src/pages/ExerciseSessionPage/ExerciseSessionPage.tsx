import Stepper from "@/components/organisms/Stepper/Stepper";
import {
  concludeExerciseSession,
  getExercise,
  createExerciseSession,
  advanceExerciseSession,
  getSession,
} from "@/providers/auralSolfege/apis";
import type { SessionResultDTO } from "@/providers/auralSolfege/apis.type";
import { Button, Container, Stack, Typography } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams, useSearchParams } from "react-router";
import { buildExerciseSessionStep } from "./utils/buildExerciseSessionSteps";
import PracticeStepRenderer from "@/components/common/practiceStep/PracticeStepRenderer";
import { ExerciseSessionProvider } from "@/components/common/practiceStep/ExerciseSessionProvider";
import SessionResult from "./components/SessionResult";
import { NAVIGATION_ENDPOINT, URL_PATH } from "@/constants";
import { useState } from "react";

const ExerciseSessionPage = () => {
  const { id: exerciseId = "" } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("sessionId");
  if (!sessionId) {
    throw new Error("ExerciseSessionPage requires a sessionId query param");
  }
  const { data: exercise } = useQuery({
    queryKey: ["exercise", exerciseId],
    queryFn: async () => await getExercise(exerciseId),
  });
  const { data: currentExerciseStep, refetch } = useQuery({
    queryKey: ["exerciseSession", exerciseId, sessionId],
    queryFn: async () => await getSession(sessionId),
  });
  const { isPending: advancingSession, mutate: advanceSession } = useMutation({
    mutationFn: advanceExerciseSession,
    onSuccess: () => refetch(),
  });
  const { isPending: concludingSession, mutate: concludeSession } = useMutation(
    {
      mutationFn: concludeExerciseSession,
      onSuccess: (result) => setSessionResult(result),
    },
  );
  const { mutate: startNewSession } = useMutation({
    mutationFn: createExerciseSession,
    onSuccess: ({ sessionId }) => {
      setSessionResult(null);
      navigate(
        `${URL_PATH[NAVIGATION_ENDPOINT.EXERCISES]}/${exerciseId}?sessionId=${sessionId}`,
      );
    },
  });
  const [sessionResult, setSessionResult] = useState<SessionResultDTO | null>(
    null,
  );
  const stepsPerRepetition =
    currentExerciseStep?.metadata.stepsPerRepetition ?? 1;
  const currentIndex = currentExerciseStep?.metadata.currentStepIndex ?? 0;
  const activityPosition = currentExerciseStep?.currentStep.activityPosition;
  const currentRepetition = Math.floor(currentIndex / stepsPerRepetition);
  const totalUniqueActivities = exercise?.exerciseActivities.length ?? 0;

  const goNext = () => {
    if (!currentExerciseStep) return;
    if (currentExerciseStep.metadata.hasNext) {
      advanceSession(sessionId);
    } else {
      concludeSession(sessionId);
    }
  };

  const goPrevious = () => {
    // TODO: implement previous session navigation when the API is available
  };

  const practiceAgain = () => {
    startNewSession(exerciseId);
  };

  const backToExercises = () => {
    navigate(URL_PATH[NAVIGATION_ENDPOINT.EXERCISES]);
  };

  if (sessionResult) {
    return (
      <Container>
        <Typography variant="h1">{exercise?.title}</Typography>
        <Typography variant="body2">{exercise?.description}</Typography>
        <Stack sx={{ mt: 4 }}>
          <SessionResult
            result={sessionResult}
            onPracticeAgain={practiceAgain}
            onBackToExercises={backToExercises}
          />
        </Stack>
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h1">{exercise?.title}</Typography>
      <Typography variant="body2">{exercise?.description}</Typography>

      <Stack direction={"row"} sx={{ mt: 2 }} spacing={4}>
        <Stepper
          orientation="vertical"
          activeStep={
            currentRepetition * totalUniqueActivities + activityPosition
          }
          steps={buildExerciseSessionStep(exercise)}
        />
        <Stack
          direction={"column"}
          sx={{ flexGrow: 1, justifyContent: "space-between" }}
          spacing={8}
        >
          {currentExerciseStep && (
            <ExerciseSessionProvider goNext={goNext} goPrevious={goPrevious}>
              <PracticeStepRenderer practiceStep={currentExerciseStep} />
            </ExerciseSessionProvider>
          )}
          <Stack direction={"row"} sx={{ justifyContent: "space-between" }}>
            <Button
              onClick={() => concludeSession(sessionId)}
              variant="outlined"
            >
              Conclude
            </Button>
            <Button
              onClick={goNext}
              disabled={advancingSession || concludingSession}
            >
              Next
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
};

export default ExerciseSessionPage;
