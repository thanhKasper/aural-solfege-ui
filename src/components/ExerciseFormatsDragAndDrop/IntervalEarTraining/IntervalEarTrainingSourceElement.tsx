import SourceElement from "@/components/organisms/DragAndDrop/elements/SourceElement";
import { Box, Typography } from "@mui/material";
import { IntervalEarTrainingRelocatableContent } from "./IntervalEarTrainingRelocatableContent";
import {
  EXERCISE_FORMAT,
  type IExerciseFormatSourceElement,
} from "../ExerciseFormat.types";
import type {
  IntervalEarTrainingConfiguration,
  TIntervalTrainingExercise,
} from "./IntervalEarTraining.types";
import { IntervalEarTrainingConfigurationContent } from "./IntervalEarTrainingConfigurationContent";
import { useRef } from "react";
import useDialog from "@/services/dialog/useDialog";

export const IntervalEarTrainingSourceElement = ({
  onChanged,
  onCreated,
  onRemoved,
}: IExerciseFormatSourceElement) => {
  const { open } = useDialog();
  const configurationRef = useRef<IntervalEarTrainingConfiguration | null>(
    null,
  );

  const provideData = (position: number) => {
    const close = open({
      title: "Interval exercise training configuration",
      content: (
        <IntervalEarTrainingConfigurationContent formRef={configurationRef} />
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
                type: EXERCISE_FORMAT.SINGLE_INTERVAL,
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
    <SourceElement<TIntervalTrainingExercise>
      onBeforeElementDrop={provideData}
      render={({ removeSelf, value }) => (
        <IntervalEarTrainingRelocatableContent
          value={value}
          onRemove={(data) => {
            onRemoved(data);
            removeSelf();
          }}
          onChange={onChanged}
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
