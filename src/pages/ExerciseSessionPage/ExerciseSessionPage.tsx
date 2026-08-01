import Stepper from "@/components/organisms/Stepper/Stepper";
import { getExercise, getExerciseSession } from "@/providers/auralSolfege/apis";
import { Button, Container, Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { buildExerciseSessionStep } from "./utils/buildExerciseSessionSteps";
import PracticeStepRenderer from "@/components/common/practiceStep/PracticeStepRenderer";

const ExerciseSessionPage = () => {
  const { id: exerciseId = "" } = useParams();
  const { data: exercise } = useQuery({
    queryKey: ["exercise"],
    queryFn: async () => await getExercise(exerciseId),
  });
  const { data: currentExerciseStep } = useQuery({
    queryKey: ["exerciseSession"],
    queryFn: async () => await getExerciseSession(exerciseId),
  });

  return (
    <Container>
      <Typography variant="h1">{exercise?.title}</Typography>
      <Typography variant="body2">{exercise?.description}</Typography>

      <Stack direction={"row"} sx={{ mt: 2 }} spacing={4}>
        <Stepper
          orientation="vertical"
          activeStep={currentExerciseStep?.currentStep.activityPosition}
          steps={buildExerciseSessionStep(exercise)}
        />
        <Stack
          direction={"column"}
          sx={{ flexGrow: 1, justifyContent: "space-between" }}
        >
          <Stack direction={"column"}>
            {currentExerciseStep && (
              <PracticeStepRenderer practiceStep={currentExerciseStep} />
            )}
          </Stack>
          <Stack direction={"row"} sx={{ justifyContent: "space-between" }}>
            <Button>Previous</Button>
            <Button>Next</Button>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
};

export default ExerciseSessionPage;
