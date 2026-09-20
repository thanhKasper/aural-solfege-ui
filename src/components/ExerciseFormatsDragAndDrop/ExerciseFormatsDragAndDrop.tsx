import DragAndDropProvider from "@/components/organisms/DragAndDrop/DragAndDropProvider";
import { Box, Stack, Typography } from "@mui/material";
import { useCallback, useRef } from "react";
import DragAndDrop from "../organisms/DragAndDrop/providers/DragAndDrop";
import type { TElementPosition } from "../organisms/DragAndDrop/DragAndDrop.types";
import DropContainer from "../organisms/DragAndDrop/containers/DropContainer";
import VerticalStackedContainer from "../organisms/DragAndDrop/containers/VerticalStackedContainer";
import Source from "../organisms/DragAndDrop/elements/Source";
import type { TExerciseFormat } from "./ExerciseFormat.types";
import IntervalPitchComparisonSourceElement from "./IntervalPitchComparison/IntervalPitchComparisonSourceElement";
import { SingleIntervalSourceElement } from "./SingleIntervalTraining/SingleIntervalSourceElement";

interface IExerciseFormatDragAndDrop {
  value?: TExerciseFormat[];
  onExerciseFormatsChange?: (data: TExerciseFormat[]) => void;
}

const ExerciseFormatsDragAndDrop = ({
  onExerciseFormatsChange,
  value = [],
}: IExerciseFormatDragAndDrop) => {
  const exerciseFormatsRef = useRef(value);

  const handleElementChange = (data: TExerciseFormat) => {
    const value = exerciseFormatsRef.current;
    const matchedExerciseFormat = value.find(
      (exerciseFormat) => exerciseFormat.id === data.id,
    );
    let finalArray = [];
    if (!matchedExerciseFormat) {
      finalArray = [...value, data];
    } else {
      finalArray = [
        ...value.filter((exerciseFormat) => exerciseFormat.id !== data.id),
        data,
      ];
    }
    onExerciseFormatsChange?.(finalArray);
    exerciseFormatsRef.current = finalArray;
  };

  const handleRemoveActivity = (data: TExerciseFormat) => {
    const newArr = exerciseFormatsRef.current.filter(
      (exerciseFormat) => exerciseFormat.id !== data?.id,
    );
    exerciseFormatsRef.current = newArr;
    onExerciseFormatsChange?.(newArr);
  };

  const onElementPositionChangeCallback = useCallback(
    (newElementList: TElementPosition<TExerciseFormat>[]) => {
      const hashedElement: Record<string, number> = newElementList.reduce(
        (reduced, curr) => {
          return { ...reduced, [curr.value.id]: curr.position };
        },
        {},
      );
      exerciseFormatsRef.current = exerciseFormatsRef.current.map(
        (exerciseFormat) => {
          return {
            ...exerciseFormat,
            position: hashedElement[exerciseFormat.id],
          };
        },
      );
      onExerciseFormatsChange?.(exerciseFormatsRef.current);
    },
    [onExerciseFormatsChange],
  );

  return (
    <>
      <DragAndDropProvider>
        <Stack direction="row" spacing={2}>
          <Stack sx={{ minWidth: "15%" }} spacing={1}>
            <SingleIntervalSourceElement
              onChanged={handleElementChange}
              onCreated={handleElementChange}
              onRemoved={handleRemoveActivity}
            />
            <IntervalPitchComparisonSourceElement
              onChanged={handleElementChange}
              onCreated={handleElementChange}
              onRemoved={handleRemoveActivity}
            />
          </Stack>
          <DropContainer<TExerciseFormat>
            id="dropContainer1"
            elements={
              value.map((value) => ({
                position: value.position,
                value: value,
              })) ?? []
            }
            onElementPositionChange={onElementPositionChangeCallback}
          />
        </Stack>
      </DragAndDropProvider>
      <DragAndDrop>
        <Box sx={{ display: "flex" }}>
          <TestShowGhost />
          <VerticalStackedContainer />
        </Box>
      </DragAndDrop>
    </>
  );
};

const TestShowGhost = () => {
  return (
    <Source
      onBeforeRelocatableCreated={() => {
        console.log("An element is dropped");
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
        <Typography>Single Interval Training</Typography>
      </Box>
    </Source>
  );
};

export default ExerciseFormatsDragAndDrop;
