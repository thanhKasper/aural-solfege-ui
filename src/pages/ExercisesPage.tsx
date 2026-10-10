import { ExerciseCard } from "@/components/organisms/ExerciseCard";
import { NAVIGATION_ENDPOINT, URL_PATH } from "@/constants";
import { getAllExercises } from "@/providers/auralSolfege/apis";
import { Button, Container, Grid, Input, Pagination } from "@mui/material";
import { usePaginatedQuery } from "@/hooks/usePaginatedQuery";
import { useNavigate } from "react-router";

const ExercisesPage = () => {
  const {
    items: exercises,
    query,
    currentPage,
    totalPages,
    setPage,
  } = usePaginatedQuery({
    queryKey: ["exercises"],
    queryFn: getAllExercises,
  });
  const navigate = useNavigate();

  return (
    <Container>
      <Input size="medium" placeholder="search..." fullWidth />
      <Grid container sx={{ paddingTop: 4 }} spacing={4}>
        <Grid size={12} sx={{ display: "flex", justifyContent: "end" }}>
          <Button
            onClick={() =>
              navigate(URL_PATH[NAVIGATION_ENDPOINT.CREATE_EXERCISE])
            }
          >
            New exercise
          </Button>
        </Grid>
        <Grid size={12}>
          <Grid container spacing={4}>
            {query.isSuccess &&
              exercises.map((exercise) => (
                <Grid key={exercise.exerciseId} size={3}>
                  <ExerciseCard
                    exercise={exercise}
                    onExerciseStart={() => {
                      navigate(
                        `${URL_PATH[NAVIGATION_ENDPOINT.SESSION]}/${exercise.exerciseId}`,
                      );
                    }}
                  />
                </Grid>
              ))}
          </Grid>
        </Grid>
        {totalPages > 1 && (
          <Grid size="grow" sx={{ display: "flex", justifyContent: "center" }}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(_, page) => setPage(page)}
            />
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default ExercisesPage;
