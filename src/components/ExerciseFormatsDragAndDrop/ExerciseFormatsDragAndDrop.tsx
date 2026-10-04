import { Box, Stack } from "@mui/material";
import { useRef } from "react";
import DragAndDrop from "../organisms/DragAndDrop/providers/DragAndDrop";
import VerticalStackedContainer from "../organisms/DragAndDrop/containers/VerticalStackedContainer";
import type { TExerciseFormat } from "./ExerciseFormat.types";
import ExerciseFormatSource from "./components/ExerciseFormatSource";
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

  const handleContentRender = (element: TExerciseFormat) => {
    const actions = exerciseFormatActionsMap[element.type];
    return actions?.renderRelocatable((value) =>
      actions.openEditDialog({ value, onChange: handleElementChange }),
    );
  };

  return (
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
  );
};

export default ExerciseFormatsDragAndDrop;
