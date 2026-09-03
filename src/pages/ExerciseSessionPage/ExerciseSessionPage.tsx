import Stepper from "@/components/organisms/Stepper/Stepper";
import {
  concludeExerciseSession,
  getExercise,
  getExerciseSession,
  getNextExerciseSession,
} from "@/providers/auralSolfege/apis";
import type { SessionResultDTO } from "@/providers/auralSolfege/apis.type";
import { Button, Container, Stack, Typography } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import { buildExerciseSessionStep } from "./utils/buildExerciseSessionSteps";
import PracticeStepRenderer from "@/components/common/practiceStep/PracticeStepRenderer";
import { ExerciseSessionProvider } from "@/components/common/practiceStep/ExerciseSessionProvider";
import SessionResult from "./components/SessionResult";
import { NAVIGATION_ENDPOINT, URL_PATH } from "@/constants";
import { useEffect, useState } from "react";

const ExerciseSessionPage = () => {
  const { id: exerciseId = "" } = useParams();
  const navigate = useNavigate();
  const { data: exercise } = useQuery({
    queryKey: ["exercise"],
    queryFn: async () => await getExercise(exerciseId),
  });
  const {
    isSuccess: successFetchNextStep,
    isPending: fetchingNextSessionStep,
    mutate: getNextSessionStep,
  } = useMutation({
    mutationFn: getNextExerciseSession,
  });
  const {
    isPending: concludingSession,
    mutate: concludeSession,
  } = useMutation({
    mutationFn: concludeExerciseSession,
    onSuccess: (result) => setSessionResult(result),
  });
  const { data: currentExerciseStep, refetch } = useQuery({
    queryKey: ["exerciseSession", exerciseId],
    queryFn: async () => await getExerciseSession(exerciseId),
  });
  const [sessionResult, setSessionResult] =
    useState<SessionResultDTO | null>(null);
  const stepsPerRepetition =
    currentExerciseStep?.metadata.stepsPerRepetition ?? 1;
  const currentIndex = currentExerciseStep?.metadata.currentStepIndex ?? 0;
  const activityPosition = currentExerciseStep?.currentStep.activityPosition;
  const currentRepetition = Math.floor(currentIndex / stepsPerRepetition);
  const totalUniqueActivities = exercise?.exerciseActivities.length ?? 0;

  useEffect(() => {
    if (successFetchNextStep) {
      refetch();
    }
  }, [successFetchNextStep, refetch]);

  const goNext = () => {
    if (!currentExerciseStep?.metadata.sessionId) return;
    if (currentExerciseStep.metadata.hasNext) {
      getNextSessionStep(currentExerciseStep.metadata.sessionId);
    } else {
      concludeSession(currentExerciseStep.metadata.sessionId);
    }
  };

  const goPrevious = () => {
    // TODO: implement previous session navigation when the API is available
  };

  const practiceAgain = () => {
    setSessionResult(null);
    refetch();
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
        >
          {currentExerciseStep && (
            <ExerciseSessionProvider goNext={goNext} goPrevious={goPrevious}>
              <PracticeStepRenderer practiceStep={currentExerciseStep} />
            </ExerciseSessionProvider>
          )}
          <Stack direction={"row"} sx={{ justifyContent: "space-between" }}>
            <Button onClick={goPrevious}>Previous</Button>
            <Button
              onClick={goNext}
              disabled={fetchingNextSessionStep || concludingSession}
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
