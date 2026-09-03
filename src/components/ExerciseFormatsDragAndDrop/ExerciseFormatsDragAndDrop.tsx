import DragAndDropProvider from "@/components/organisms/DragAndDrop/DragAndDropProvider";
import { Stack } from "@mui/material";
import { useCallback, useRef } from "react";
import type { TExerciseFormat } from "./ExerciseFormat.types";
import { IntervalEarTrainingSourceElement } from "./SingleIntervalTraining/IntervalEarTrainingSourceElement";
import type { TElementPosition } from "../organisms/DragAndDrop/DragAndDrop.types";
import DropContainer from "../organisms/DragAndDrop/containers/DropContainer";
import IntervalsComparisonSourceElement from "./IntervalsComparison/IntervalsComparisonSourceElement";

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
    <DragAndDropProvider>
      <Stack direction="row" spacing={2}>
        <Stack sx={{ minWidth: "15%" }} spacing={1}>
          <IntervalEarTrainingSourceElement
            onChanged={handleElementChange}
            onCreated={handleElementChange}
            onRemoved={handleRemoveActivity}
          />
          <IntervalsComparisonSourceElement
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
  );
};

export default ExerciseFormatsDragAndDrop;
