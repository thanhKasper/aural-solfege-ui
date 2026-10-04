import { Box, Typography } from "@mui/material";
import Source from "../../organisms/DragAndDrop/elements/Source";
import type {
  ExerciseFormatActions,
  TExerciseFormat,
} from "../ExerciseFormat.types";

interface ExerciseFormatSourceProps {
  actions: ExerciseFormatActions<TExerciseFormat>;
  onDataCreated: (data: TExerciseFormat) => void;
}

// A draggable source for one exercise format: dropping it opens that format's
// create dialog at the drop position.
const ExerciseFormatSource = ({
  actions,
  onDataCreated,
}: ExerciseFormatSourceProps) => {
  return (
    <Source
      onBeforeRelocatableCreated={(position) => {
        actions.openCreateDialog({ position, onCreated: onDataCreated });
      }}
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
        <Typography>{actions.label}</Typography>
      </Box>
    </Source>
  );
};

export default ExerciseFormatSource;
