import SourceElement from "@/components/organisms/DragAndDrop/elements/SourceElement";
import type { IExerciseFormatSourceElement } from "../ExerciseFormat.types";
import IntervalPitchComparisonRelocatableElement from "./IntervalPitchComparisonRelocatableElement";
import type {
  IntervalPitchComparisonConfiguration,
  TIntervalPitchComparison,
} from "./IntervalPitchComparison.types";
import IntervalPitchComparisonConfigurationContent from "./components/IntervalPitchComparisonConfigurationContent";
import { Box, Typography } from "@mui/material";
import { useRef } from "react";
import useDialog from "@/services/dialog/useDialog";
import { EXERCISE_FORMAT } from "../ExerciseFormat.types";

const IntervalPitchComparisonSourceElement = ({
  onCreated,
  onRemoved,
}: IExerciseFormatSourceElement) => {
  const { open } = useDialog();
  const configurationRef = useRef<IntervalPitchComparisonConfiguration | null>(
    null,
  );

  const provideData = (position: number) => {
    const close = open({
      title: "Interval pitch comparison configuration",
      content: (
        <IntervalPitchComparisonConfigurationContent formRef={configurationRef} />
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
                type: EXERCISE_FORMAT.INTERVAL_PITCH_COMPARISON,
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
    <SourceElement<TIntervalPitchComparison>
      onBeforeElementDrop={provideData}
      shouldRender={(data) => {
        return data.type === EXERCISE_FORMAT.INTERVAL_PITCH_COMPARISON;
      }}
      render={({ value, removeSelf }) => (
        <IntervalPitchComparisonRelocatableElement
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
        <Typography>Interval Pitch Comparison</Typography>
      </Box>
    </SourceElement>
  );
};

export default IntervalPitchComparisonSourceElement;
