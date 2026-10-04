import DragAndDropProvider from "@/components/organisms/DragAndDrop/DragAndDropProvider";
import { Box, Stack } from "@mui/material";
import { useCallback, useRef } from "react";
import DragAndDrop from "../organisms/DragAndDrop/providers/DragAndDrop";
import type { TElementPosition } from "../organisms/DragAndDrop/DragAndDrop.types";
import DropContainer from "../organisms/DragAndDrop/containers/DropContainer";
import VerticalStackedContainer from "../organisms/DragAndDrop/containers/VerticalStackedContainer";
import type { TExerciseFormat } from "./ExerciseFormat.types";
import ExerciseFormatSource from "./components/ExerciseFormatSource";
import IntervalPitchComparisonSourceElement from "./IntervalPitchComparison/IntervalPitchComparisonSourceElement";
import { SingleIntervalSourceElement } from "./SingleIntervalTraining/SingleIntervalSourceElement";
import { exerciseFormatActionsMap } from "./exerciseFormatActions";
import { moveExerciseFormat } from "./utils/moveExerciseFormat";
import { placeExerciseFormat } from "./utils/placeExerciseFormat";
import { removeExerciseFormat } from "./utils/removeExerciseFormat";

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
    const finalArray = placeExerciseFormat(exerciseFormatsRef.current, data);
    onExerciseFormatsChange?.(finalArray);
    exerciseFormatsRef.current = finalArray;
  };

  const handleReorder = (fromIndex: number, dropIndex: number) => {
    const current = exerciseFormatsRef.current;
    const finalArray = moveExerciseFormat(current, fromIndex, dropIndex);
    if (finalArray === current) return;

    onExerciseFormatsChange?.(finalArray);
    exerciseFormatsRef.current = finalArray;
  };

  const handleRemove = (index: number) => {
    const current = exerciseFormatsRef.current;
    const finalArray = removeExerciseFormat(current, index);
    if (finalArray === current) return;

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

  const handleContentRender = (element: TExerciseFormat) => {
    const actions = exerciseFormatActionsMap[element.type];
    return actions?.renderRelocatable((value) =>
      actions.openEditDialog({ value, onChange: handleElementChange }),
    );
  };

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
        <Box sx={{ display: "flex", gap: 2 }}>
          <Stack sx={{ minWidth: "15%" }} spacing={1}>
            {Object.entries(exerciseFormatActionsMap).map(
              ([format, actions]) =>
                actions && (
                  <ExerciseFormatSource
                    key={format}
                    actions={actions}
                    onDataCreated={handleElementChange}
                  />
                ),
            )}
          </Stack>
          <VerticalStackedContainer
            dropElements={value}
            getKey={(element) => element.id}
            onReorder={handleReorder}
            onRemove={handleRemove}
            renderContent={handleContentRender}
          />
        </Box>
      </DragAndDrop>
    </>
  );
};

export default ExerciseFormatsDragAndDrop;
