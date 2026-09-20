import Source from "@/components/organisms/DragAndDrop/elements/Source";
import { Box, Typography } from "@mui/material";
import type { TExerciseFormat } from "../ExerciseFormat.types";
import { intervalPitchComparisonActions } from "./IntervalPitchComparison.actions";

interface IIntervalPitchComparisonSourceElementProps {
  onCreated: (data: TExerciseFormat) => void;
}

const IntervalPitchComparisonSourceElement = ({
  onCreated,
}: IIntervalPitchComparisonSourceElementProps) => {
  return (
    <Source
      onBeforeRelocatableCreated={(position) =>
        intervalPitchComparisonActions.openCreateDialog({ position, onCreated })
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
        <Typography>Interval Pitch Comparison</Typography>
      </Box>
    </Source>
  );
};

export default IntervalPitchComparisonSourceElement;