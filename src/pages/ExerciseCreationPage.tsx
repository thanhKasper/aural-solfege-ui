import ExerciseFormatsDragAndDrop from "@/components/ExerciseFormatsDragAndDrop/ExerciseFormatsDragAndDrop";
import InputLabel from "@/components/atoms/InputLabel";
import ExerciseRepetitionInput from "@/components/molecules/ExerciseRepetitionInput";
import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import { Controller, Form, useForm } from "react-hook-form";

const ExerciseCreationPage = () => {
  const { control, handleSubmit } = useForm();
  const handleSave = () => {
    handleSubmit((exercise) => {
      console.log(exercise);
    })();
  };
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
                render={({ field: { value, onChange } }) => (
                  <InputLabel label="Title">
                    <TextField
                      placeholder="Enter title"
                      value={value}
                      onInput={onChange}
                    />
                  </InputLabel>
                )}
              />
            </Grid>
            <Grid size={2}>
              <Controller
                control={control}
                name="repetition"
                render={({ field: { value, onChange } }) => (
                  <InputLabel label="Repeat">
                    <ExerciseRepetitionInput
                      value={value}
                      onTextChange={onChange}
                    />
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
                render={({ field: { value, onChange } }) => (
                  <InputLabel label="Description">
                    <TextField
                      multiline
                      minRows={5}
                      maxRows={10}
                      value={value}
                      onInput={onChange}
                    />
                  </InputLabel>
                )}
              />
            </Grid>
            <Grid size={2}>
              <Controller
                control={control}
                name="rest"
                render={({ field: { value, onChange } }) => (
                  <InputLabel label="Rest between repetition">
                    <TextField value={value} onInput={onChange} />
                  </InputLabel>
                )}
              />
            </Grid>
          </Grid>
          <Grid size={12}>
            <Controller
              name="trainingPlan"
              control={control}
              render={({ field: { value, onChange } }) => (
                <InputLabel label="Training plan">
                  <ExerciseFormatsDragAndDrop
                    value={value}
                    onChange={onChange}
                  />
                </InputLabel>
              )}
            />
          </Grid>
          <Grid size={12}>
            <Button onClick={handleSave}>Save</Button>
          </Grid>
        </Grid>
      </Form>
    </Container>
  );
};

export default ExerciseCreationPage;
