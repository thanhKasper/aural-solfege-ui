import { IntervalEarTraining } from "@/components/ExerciseFormatsDragAndDrop/IntervalEarTraining";
import InputLabel from "@/components/atoms/InputLabel";
import ExerciseRepetitionInput from "@/components/molecules/ExerciseRepetitionInput";
import DragAndDropProvider from "@/components/organisms/DragAndDrop/DragAndDropProvider";
import DropContainer from "@/components/organisms/DragAndDrop/containers/DropContainer";
import SourceElement from "@/components/organisms/DragAndDrop/elements/SourceElement";
import {
  Box,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
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
          <Grid size={12}>
            <Controller
              name="trainingPlan"
              control={control}
              render={() => (
                <InputLabel label="Training plan">
                  <DragAndDropProvider>
                    <Stack direction={"row"} spacing={2}>
                      <Stack sx={{ minWidth: "15%" }} spacing={1}>
                        <SourceElement
                          id="interval-training"
                          render={() => {
                            console.log("Render is being called");
                            return <IntervalEarTraining.RelocatableElement />;
                          }}
                        >
                          <IntervalEarTraining />
                        </SourceElement>
                        <SourceElement
                          id="pitch-comparison"
                          render={() => (
                            <Box>
                              <Typography>
                                Pitch comparison {crypto.randomUUID()}
                              </Typography>
                            </Box>
                          )}
                        >
                          <Box sx={{ border: "1px solid black", padding: 2 }}>
                            <Typography>Pitch comparison</Typography>
                          </Box>
                        </SourceElement>
                        <SourceElement
                          id="stack-detection"
                          render={() => (
                            <Box>
                              <Typography>
                                Stack detection {crypto.randomUUID()}
                              </Typography>
                            </Box>
                          )}
                        >
                          <Box sx={{ border: "1px solid black", padding: 2 }}>
                            <Typography>Stack detection</Typography>
                          </Box>
                        </SourceElement>
                      </Stack>

                      <DropContainer id="dropContainer1" />
                    </Stack>
                  </DragAndDropProvider>
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
