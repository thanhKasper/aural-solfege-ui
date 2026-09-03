import SourceElement from "@/components/organisms/DragAndDrop/elements/SourceElement";
import type { IExerciseFormatSourceElement } from "../ExerciseFormat.types";
import IntervalsComparisonRelocatableElement from "./IntervalsComparisonRelocatableElement";
import type { TIntervalsComparison } from "./IntervalsComparison.types";
import { Box, Typography } from "@mui/material";

const IntervalsComparisonSourceElement = ({
  onRemoved,
}: IExerciseFormatSourceElement) => {
  return (
    <SourceElement<TIntervalsComparison>
      render={({ value, removeSelf }) => (
        <IntervalsComparisonRelocatableElement
          value={value}
          onRemove={() => {
            onRemoved(value);
            removeSelf();
          }}
        />
      )}
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
        <Typography>Intervals Comparison</Typography>
      </Box>
    </SourceElement>
  );
};

export default IntervalsComparisonSourceElement;
