import SourceElement from "@/components/organisms/DragAndDrop/elements/SourceElement";
import { Box, Typography } from "@mui/material";
import { RelocatableElement } from "./RelocatableElement";
import type { IExerciseFormatSourceElement } from "../ExerciseFormat.types";

export const IntervalEarTrainingSourceElement = ({
  onChanged,
  onCreated,
  onRemoved,
}: IExerciseFormatSourceElement) => {
  return (
    <SourceElement
      render={({ removeSelf, relocatableElementId, currentPosition }) => (
        <RelocatableElement
          onRemove={(data) => {
            onRemoved(data);
            removeSelf();
          }}
          onChange={onChanged}
          onCreated={(data) =>
            onCreated({
              ...data,
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
          backgroundColor: (theme) => {
            return theme.palette.surface[400];
          },
        }}
      >
        <Typography>Interval Ear Training</Typography>
      </Box>
    </SourceElement>
  );
};
