import SourceElement from "@/components/organisms/DragAndDrop/elements/SourceElement";
import { Box, Typography } from "@mui/material";
import { SingleIntervalRelocatableContent } from "./SingleIntervalRelocatableContent";
import {
  EXERCISE_FORMAT,
  type IExerciseFormatSourceElement,
} from "../ExerciseFormat.types";
import type {
  SingleIntervalConfiguration,
  TSingleIntervalTraining,
} from "./SingleIntervalTraining.types";
import { SingleIntervalConfigurationContent } from "./SingleIntervalConfigurationContent";
import { useRef } from "react";
import useDialog from "@/services/dialog/useDialog";

export const SingleIntervalSourceElement = ({
  onChanged,
  onCreated,
  onRemoved,
}: IExerciseFormatSourceElement) => {
  const { open } = useDialog();
  const configurationRef = useRef<SingleIntervalConfiguration | null>(null);

  const provideData = (position: number) => {
    const close = open({
      title: "Single interval configuration",
      content: (
        <SingleIntervalConfigurationContent formRef={configurationRef} />
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
    <SourceElement<TSingleIntervalTraining>
      onBeforeElementDrop={provideData}
      render={({ removeSelf, value }) => (
        <SingleIntervalRelocatableContent
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
          backgroundColor: "canvas.100",
          borderColor: "canvas.300",
        }}
      >
        <Typography>Single Interval Training</Typography>
      </Box>
    </SourceElement>
  );
};
