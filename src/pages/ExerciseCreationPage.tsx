import ExerciseFormatsDragAndDrop from "@/components/ExerciseFormatsDragAndDrop/ExerciseFormatsDragAndDrop";
import { reverseTransformMap } from "@/components/ExerciseFormatsDragAndDrop/dataReverseTransform";
import { transformDataMap } from "@/components/ExerciseFormatsDragAndDrop/dataTransform";
import InputLabel from "@/components/atoms/InputLabel";
import ExerciseRepetitionInput from "@/components/molecules/ExerciseRepetitionInput";
import { NAVIGATION_ENDPOINT, URL_PATH } from "@/constants";
import { createNewExercise } from "@/providers/auralSolfege/apis";
import type { ExerciseDTO } from "@/providers/auralSolfege/apis.type";
import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { Controller, Form, useForm, useWatch } from "react-hook-form";
import { useNavigate } from "react-router";

const ExerciseCreationPage = () => {
  const { control, handleSubmit, setValue } = useForm<ExerciseDTO>();
  const navigate = useNavigate();
  const isInfiniteLoop = useWatch({ control: control, name: "loop" });
  const { mutate, isSuccess } = useMutation({
    mutationFn: (newExercise: ExerciseDTO) => {
      return createNewExercise(newExercise);
    },
  });
  const handleSave = () => {
    handleSubmit((exercise) => {
      mutate(exercise);
    })();
  };

  useEffect(() => {
    if (isSuccess) {
      navigate(URL_PATH[NAVIGATION_ENDPOINT.EXERCISES]);
    }
  }, [isSuccess, navigate]);

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
                rules={{ required: "This field is required" }}
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => (
                  <InputLabel label="Title" errorMessage={error?.message}>
                    <TextField
                      placeholder="Enter title"
                      value={value ?? ""}
                      onInput={onChange}
                    />
                  </InputLabel>
                )}
              />
            </Grid>
            <Grid size={2}>
              <Controller
                control={control}
                name="reps"
                rules={{
                  validate: {
                    repetitionRequired: (fieldValue, data) => {
                      if (data.loop) {
                        return true;
                      }
                      return fieldValue !== undefined
                        ? true
                        : "This field is required";
                    },
                  },
                }}
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => (
                  <InputLabel label="Repeat" errorMessage={error?.message}>
                    <ExerciseRepetitionInput
                      value={value?.toString() ?? ""}
                      isLoop={isInfiniteLoop}
                      onTextChange={(v) => {
                        if (v === "") {
                          onChange(undefined);
                          return;
                        }
                        const num = Number(v);
                        if (!Number.isNaN(num)) {
                          onChange(num);
                        }
                      }}
                      onRepetitionChecked={(checked) => {
                        setValue("loop", checked);
                        onChange(undefined);
                      }}
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
                rules={{ required: "This field is required" }}
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => (
                  <InputLabel label="Description" errorMessage={error?.message}>
                    <TextField
                      multiline
                      minRows={5}
                      maxRows={10}
                      value={value ?? ""}
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
                rules={{
                  required: "This field is required",
                }}
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => (
                  <InputLabel
                    label="Rest between repetition"
                    errorMessage={error?.message}
                  >
                    <TextField
                      value={value?.toString() ?? ""}
                      onChange={(e) => {
                        const v = e.currentTarget.value;
                        if (v === "") {
                          onChange(undefined);
                          return;
                        }
                        const num = Number(v);
                        if (!Number.isNaN(num)) {
                          onChange(num);
                        }
                      }}
                    />
                  </InputLabel>
                )}
              />
            </Grid>
          </Grid>
          <Grid size={12}>
            <Controller
              name="exerciseActivities"
              control={control}
              rules={{
                required: "This field is required",
              }}
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => {
                return (
                  <InputLabel
                    label="Training plan"
                    errorMessage={error?.message}
                  >
                    <ExerciseFormatsDragAndDrop
                      value={(value ?? []).map((exerciseFormat) =>
                        reverseTransformMap[exerciseFormat.type](
                          exerciseFormat,
                        ),
                      )}
                      onExerciseFormatsChange={(data) =>
                        onChange(
                          data.map((internalExerciseFormat) =>
                            transformDataMap[internalExerciseFormat.type](
                              internalExerciseFormat,
                            ),
                          ),
                        )
                      }
                    />
                  </InputLabel>
                );
              }}
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
