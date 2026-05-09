import { ExerciseCard } from "@/components/organisms/ExerciseCard";
import { getAllExercises } from "@/providers/auralSolfege/apis";
import { Button, Container, Grid, Input, Pagination } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

const ExercisesPage = () => {
  const { data, isSuccess } = useQuery({
    queryKey: ["exercises"],
    queryFn: getAllExercises,
  });

  console.log(data);
  return (
    <Container>
      <Input size="medium" placeholder="search..." fullWidth />
      <Grid container sx={{ paddingTop: 4 }} spacing={4}>
        <Grid size={12} sx={{ display: "flex", justifyContent: "end" }}>
          <Button>New exercise</Button>
        </Grid>
        <Grid size={12}>
          <Grid container spacing={4}>
            {isSuccess &&
              data.data.map((exercise) => (
                <Grid size={3}>
                  <ExerciseCard exercise={exercise} />
                </Grid>
              ))}
          </Grid>
        </Grid>
        <Grid size="grow" sx={{ display: "flex", justifyContent: "center" }}>
          <Pagination count={10} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default ExercisesPage;
