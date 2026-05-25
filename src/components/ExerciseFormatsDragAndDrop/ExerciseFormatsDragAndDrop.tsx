import {
  IntervalEarTraining,
  type TIntervalTrainingExercise,
} from "./IntervalEarTraining";
import DragAndDropProvider from "@/components/organisms/DragAndDrop/DragAndDropProvider";
import DropContainer from "@/components/organisms/DragAndDrop/containers/DropContainer";
import SourceElement from "@/components/organisms/DragAndDrop/elements/SourceElement";
import { Stack } from "@mui/material";
import { useRef } from "react";

type TExerciseFormat = TIntervalTrainingExercise;

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
          <SourceElement
            render={({ removeSelf }) => (
              <IntervalEarTraining.RelocatableElement
                onRemove={(data) => {
                  console.log(data);
                  const newArr = exerciseFormatsRef.current.filter(
                    (exerciseFormat) => exerciseFormat.id !== data?.id,
                  );
                  exerciseFormatsRef.current = newArr;
                  onChange?.(newArr);
                  removeSelf();
                }}
                onChange={handleElementChange}
              />
            )}
          >
            <IntervalEarTraining />
          </SourceElement>
        </Stack>
        <DropContainer id="dropContainer1" />
      </Stack>
    </DragAndDropProvider>
  );
};

export default ExerciseFormatsDragAndDrop;
