import Source from "@/components/organisms/DragAndDrop/elements/Source";
import { Box, Typography } from "@mui/material";
import type { TExerciseFormat } from "../ExerciseFormat.types";
import { singleIntervalTrainingActions } from "./SingleIntervalTraining.actions";

interface ISingleIntervalSourceElementProps {
  onCreated: (data: TExerciseFormat) => void;
}

export const SingleIntervalSourceElement = ({
  onCreated,
}: ISingleIntervalSourceElementProps) => {
  return (
    <Source
      onBeforeRelocatableCreated={(position) =>
        singleIntervalTrainingActions.openCreateDialog({ position, onCreated })
      }
    >
      <Box
        sx={{
          padding: 2,
          borderWidth: 1,
          borderLeftWidth: 5,
          borderStyle: "solid",
          backgroundColor: "canvas.100",
          borderColor: "canvas.300",
        }}
      >
        <Typography>Single Interval Training</Typography>
      </Box>
    </Source>
  );
};