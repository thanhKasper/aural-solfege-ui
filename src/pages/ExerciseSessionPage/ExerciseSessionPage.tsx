import Stepper from "@/components/organisms/Stepper/Stepper";
import { getExercise, getExerciseSession } from "@/providers/auralSolfege/apis";
import { Button, Container, Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { buildExerciseSessionStep } from "./utils/buildExerciseSessionSteps";

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
  console.log(
    Array(exercise?.reps ?? 0).flatMap(() => {
      return (exercise?.exerciseActivities ?? []).map((activity) => ({
        title: activity.type,
        content: `${activity.texture}`,
      }));
    }),
  );
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
        <Stack direction={"column"} sx={{ flexGrow: 1 }}>
          <Stack direction={"column"}>
            <Typography variant="h2">
              A placeholder that will be different depending on the type of step
              that we would handle
            </Typography>
          </Stack>
          <Stack direction={"row"} sx={{ marginX: "auto" }}>
            <Button>Previous</Button>
            <Button>Next</Button>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
};

export default ExerciseSessionPage;
