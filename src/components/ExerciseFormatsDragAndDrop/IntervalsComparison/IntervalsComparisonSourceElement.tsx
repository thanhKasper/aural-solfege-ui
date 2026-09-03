import SourceElement from "@/components/organisms/DragAndDrop/elements/SourceElement";
import type { IExerciseFormatSourceElement } from "../ExerciseFormat.types";
import IntervalsComparisonRelocatableElement from "./IntervalsComparisonRelocatableElement";
import type {
  IntervalsComparisonConfiguration,
  TIntervalsComparison,
} from "./IntervalsComparison.types";
import IntervalsComparisonConfigurationContent from "./components/IntervalsComparisonConfigurationContent";
import { Box, Typography } from "@mui/material";
import { useRef } from "react";
import useDialog from "@/services/dialog/useDialog";
import { EXERCISE_FORMAT } from "../ExerciseFormat.types";

const IntervalsComparisonSourceElement = ({
  onCreated,
  onRemoved,
}: IExerciseFormatSourceElement) => {
  const { open } = useDialog();
  const configurationRef = useRef<IntervalsComparisonConfiguration | null>(
    null,
  );

  const provideData = (position: number) => {
    const close = open({
      title: "Intervals comparison configuration",
      content: (
        <IntervalsComparisonConfigurationContent formRef={configurationRef} />
      ),
      buttons: [
        {
          label: "Cancel",
          onClick: () => {
            close();
          },
        },
        {
          label: "Submit",
          onClick: () =>
            configurationRef.current?.handleSubmit((data) => {
              onCreated({
                ...data,
                type: EXERCISE_FORMAT.INTERVALS_COMPARISON,
                position,
                id: crypto.randomUUID(),
              });
              close();
            })(),
        },
      ],
    });
  };

  return (
    <SourceElement<TIntervalsComparison>
      onBeforeElementDrop={provideData}
      shouldRender={(data) => {
        return data.type === EXERCISE_FORMAT.INTERVALS_COMPARISON;
      }}
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
