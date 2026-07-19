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

  const provideData = (data?: TIntervalTrainingExercise) => {
    const close = open({
      title: "Interval exercise training configuration",
      content: (
        <IntervalEarTrainingConfigurationContent
          formRef={configurationRef}
          defaultValue={data}
        />
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
              onCreated?.(data);
              close();
            })(),
        },
      ],
    });
  };

  return (
    <SourceElement<TIntervalTrainingExercise>
      onBeforeRelocatableElementCreated={() => provideData()}
      render={({
        removeSelf,
        relocatableElementId,
        currentPosition,
        value,
      }) => (
        <IntervalEarTrainingRelocatableContent
          value={value}
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
