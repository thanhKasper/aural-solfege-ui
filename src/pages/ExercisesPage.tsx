import { ExerciseCard } from "@/components/organisms/ExerciseCard";
import { NAVIGATION_ENDPOINT, URL_PATH } from "@/constants";
import { getAllExercises } from "@/providers/auralSolfege/apis";
import { Button, Container, Grid, Input, Pagination } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";

const DEFAULT_PAGE_SIZE = 5;
const DEFAULT_TOTAL_PAGES = 1;
const DEFAULT_CURRENT_PAGE = 0;

const ExercisesPage = () => {
  const { data, isSuccess } = useQuery({
    queryKey: ["exercises"],
    queryFn: async () => await getAllExercises({ page: 0, pageSize: 5 }),
  });
  const navigate = useNavigate();
  const exercises = data?.content ?? [];
  const totalPages = data?.totalPages ?? DEFAULT_TOTAL_PAGES;
  const pageSize = data?.pageSize ?? DEFAULT_PAGE_SIZE;
  const currentPage = (data?.page ?? DEFAULT_CURRENT_PAGE) + 1;

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
            {isSuccess &&
              exercises.map((exercise) => (
                <Grid size={3}>
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
            <Pagination count={pageSize} page={currentPage} />
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default ExercisesPage;
