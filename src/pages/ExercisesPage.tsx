import { ExerciseCard } from "@/components/organisms/ExerciseCard";
import { NAVIGATION_ENDPOINT, URL_PATH } from "@/constants";
import { getAllExercises } from "@/providers/auralSolfege/apis";
import { Button, Grid, Input, Pagination } from "@mui/material";
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
    <Grid container>
      <Grid size={12}>
        <Input
          size="medium"
          placeholder="Search..."
          fullWidth
          sx={{ paddingX: 2 }}
        />
      </Grid>
      <Grid size={12}>
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
                  <Grid
                    key={exercise.exerciseId}
                    size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                  >
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
            <Grid
              size="grow"
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={(_, page) => setPage(page)}
              />
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ExercisesPage;
