import Stepper from "@/components/organisms/Stepper/Stepper";
import {
  getExercise,
  getExerciseSession,
  getNextExerciseSession,
} from "@/providers/auralSolfege/apis";
import { Button, Container, Stack, Typography } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { buildExerciseSessionStep } from "./utils/buildExerciseSessionSteps";
import PracticeStepRenderer from "@/components/common/practiceStep/PracticeStepRenderer";
import { ExerciseSessionProvider } from "@/components/common/practiceStep/ExerciseSessionProvider";
import { useEffect } from "react";

const ExerciseSessionPage = () => {
  const { id: exerciseId = "" } = useParams();
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
  const { data: currentExerciseStep, refetch } = useQuery({
    queryKey: ["exerciseSession"],
    queryFn: async () => await getExerciseSession(exerciseId),
  });
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
    if (currentExerciseStep?.metadata.sessionId) {
      getNextSessionStep(currentExerciseStep.metadata.sessionId);
    }
  };

  const goPrevious = () => {
    // TODO: implement previous session navigation when the API is available
  };

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
              disabled={fetchingNextSessionStep}
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
