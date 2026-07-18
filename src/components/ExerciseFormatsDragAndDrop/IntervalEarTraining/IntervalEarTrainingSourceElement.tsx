import SourceElement from "@/components/organisms/DragAndDrop/elements/SourceElement";
import { Box, Typography } from "@mui/material";
import { IntervalEarTrainingRelocatableContent } from "./IntervalEarTrainingRelocatableContent";
import {
  EXERCISE_FORMAT,
  type IExerciseFormatSourceElement,
} from "../ExerciseFormat.types";

export const IntervalEarTrainingSourceElement = ({
  onChanged,
  onCreated,
  onRemoved,
}: IExerciseFormatSourceElement) => {
  return (
    <SourceElement
      render={({ removeSelf, relocatableElementId, currentPosition }) => (
        <IntervalEarTrainingRelocatableContent
          onRemove={(data) => {
            onRemoved({
              ...data,
              type: EXERCISE_FORMAT.SINGLE_INTERVAL,
              id: relocatableElementId,
              position: currentPosition,
            });
            removeSelf();
          }}
          onChange={onChanged}
          onCreated={(data) =>
            onCreated({
              ...data,
              type: EXERCISE_FORMAT.SINGLE_INTERVAL,
              id: relocatableElementId,
              position: currentPosition,
            })
          }
        />
      )}
    >
      <Box
        sx={{
          padding: 2,
          borderWidth: 1,
          borderLeftWidth: 5,
          borderStyle: "solid",
          borderColor: (theme) => theme.palette.primary.main,
        }}
      >
        <Typography>Interval Ear Training</Typography>
      </Box>
    </SourceElement>
  );
};
