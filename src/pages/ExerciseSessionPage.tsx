import Stepper from "@/components/organisms/Stepper/Stepper";
import { getExercise, getExerciseSession } from "@/providers/auralSolfege/apis";
import { Container, Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

const ExerciseSessionPage = () => {
  const { id: exerciseId = "" } = useParams();
  const { data } = useQuery({
    queryKey: ["exercise"],
    queryFn: async () => await getExercise(exerciseId),
  });
  const { data: currentExerciseStep } = useQuery({
    queryKey: ["exerciseSession"],
    queryFn: async () => await getExerciseSession(exerciseId),
  });
  return (
    <Container>
      <Typography variant="h1">{data?.title}</Typography>
      <Typography variant="body2">{data?.description}</Typography>

      <Stack direction={"row"}>
        <Stepper />
        <div>{JSON.stringify(currentExerciseStep)}</div>
      </Stack>
    </Container>
  );
};

export default ExerciseSessionPage;
