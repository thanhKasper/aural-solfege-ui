import InputLabel from "@/components/atoms/InputLabel";
import ExerciseRepetitionInput from "@/components/molecules/ExerciseRepetitionInput";
import { Container, Grid, Input, TextField, Typography } from "@mui/material";
import { Controller, Form, useForm } from "react-hook-form";

const ExerciseCreationPage = () => {
  const { control } = useForm();
  return (
    <Container>
      <Typography variant="h3">Create new exercise</Typography>
      <Form control={control}>
        <Grid container sx={{ paddingTop: 4 }} spacing={4}>
          <Grid>
            <Controller
              control={control}
              name="title"
              render={() => (
                <InputLabel label="Title">
                  <TextField size="small" placeholder="Enter title" />
                </InputLabel>
              )}
            />
          </Grid>
          <Grid>
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
      </Form>
    </Container>
  );
};

export default ExerciseCreationPage;
