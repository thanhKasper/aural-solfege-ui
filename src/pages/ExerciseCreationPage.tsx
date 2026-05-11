import InputLabel from "@/components/atoms/InputLabel";
import ExerciseRepetitionInput from "@/components/molecules/ExerciseRepetitionInput";
import { Container, Grid, TextField, Typography } from "@mui/material";
import { Controller, Form, useForm } from "react-hook-form";

const ExerciseCreationPage = () => {
  const { control } = useForm();
  return (
    <Container>
      <Typography variant="h3">Create new exercise</Typography>
      <Form control={control}>
        <Grid container sx={{ paddingTop: 4 }} spacing={4}>
          <Grid container size={12}>
            <Grid size={3}>
              <Controller
                control={control}
                name="title"
                render={() => (
                  <InputLabel label="Title">
                    <TextField placeholder="Enter title" />
                  </InputLabel>
                )}
              />
            </Grid>
            <Grid size={2}>
              <Controller
                control={control}
                name="repetition"
                render={() => (
                  <InputLabel label="Repeat">
                    <ExerciseRepetitionInput />
                  </InputLabel>
                )}
              />
            </Grid>
          </Grid>
          <Grid container size={12}>
            <Grid size={3}>
              <Controller
                control={control}
                name="description"
                render={() => (
                  <InputLabel label="Description">
                    <TextField multiline minRows={5} maxRows={10} />
                  </InputLabel>
                )}
              />
            </Grid>
            <Grid size={2}>
              <Controller
                control={control}
                name="rest"
                render={() => (
                  <InputLabel label="Rest between repetition">
                    <TextField />
                  </InputLabel>
                )}
              />
            </Grid>
          </Grid>
          <Grid container size={12}>
            <Controller
              name="trainingPlan"
              control={control}
              render={() => <InputLabel label="Training plan"></InputLabel>}
            />
          </Grid>
        </Grid>
      </Form>
    </Container>
  );
};

export default ExerciseCreationPage;
