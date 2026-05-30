import DragAndDropProvider from "@/components/organisms/DragAndDrop/DragAndDropProvider";
import DropContainer from "@/components/organisms/DragAndDrop/containers/DropContainer";
import { Stack } from "@mui/material";
import { useRef } from "react";
import type { TExerciseFormat } from "./ExerciseFormat.types";
import { IntervalEarTrainingSourceElement } from "./IntervalEarTraining/IntervalEarTrainingSourceElement";

interface IExerciseFormatDragAndDrop {
  value?: TExerciseFormat[];
  onChange?: (data: TExerciseFormat[]) => void;
}

const ExerciseFormatsDragAndDrop = ({
  onChange,
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
    onChange?.(finalArray);
    exerciseFormatsRef.current = finalArray;
  };

  return (
    <DragAndDropProvider>
      <Stack direction="row" spacing={2}>
        <Stack sx={{ minWidth: "15%" }} spacing={1}>
          <IntervalEarTrainingSourceElement
            onChanged={handleElementChange}
            onCreated={handleElementChange}
            onRemoved={(data) => {
              const newArr = exerciseFormatsRef.current.filter(
                (exerciseFormat) => exerciseFormat.id !== data?.id,
              );
              exerciseFormatsRef.current = newArr;
              onChange?.(newArr);
            }}
          />
        </Stack>
        <DropContainer
          id="dropContainer1"
          onElementPositionChange={(newElementList) => {
            const hashedElement: Record<string, number> = newElementList.reduce(
              (reduced, curr) => {
                return { ...reduced, [curr.elementId]: curr.position };
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
            onChange?.(exerciseFormatsRef.current);
          }}
        />
      </Stack>
    </DragAndDropProvider>
  );
};

export default ExerciseFormatsDragAndDrop;
