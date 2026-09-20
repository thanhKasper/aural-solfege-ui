import { Stack } from "@mui/material";
import { useCallback, useRef } from "react";
import DragAndDrop from "../organisms/DragAndDrop/providers/DragAndDrop";
import type { TElementPosition } from "../organisms/DragAndDrop/DragAndDrop.types";
import VerticalStackedContainer from "../organisms/DragAndDrop/containers/VerticalStackedContainer";
import { EXERCISE_FORMAT, type TExerciseFormat } from "./ExerciseFormat.types";
import { intervalPitchComparisonActions } from "./IntervalPitchComparison/IntervalPitchComparison.actions";
import type { TIntervalPitchComparison } from "./IntervalPitchComparison/IntervalPitchComparison.types";
import IntervalPitchComparisonSourceElement from "./IntervalPitchComparison/IntervalPitchComparisonSourceElement";
import type { TSingleIntervalTraining } from "./SingleIntervalTraining/SingleIntervalTraining.types";
import { SingleIntervalSourceElement } from "./SingleIntervalTraining/SingleIntervalSourceElement";
import { singleIntervalTrainingActions } from "./SingleIntervalTraining/SingleIntervalTraining.actions";

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
    const currentValue = exerciseFormatsRef.current;
    const matchedExerciseFormat = currentValue.find(
      (exerciseFormat) => exerciseFormat.id === data.id,
    );
    let finalArray = [];
    if (!matchedExerciseFormat) {
      finalArray = [...currentValue, data];
    } else {
      finalArray = [
        ...currentValue.filter(
          (exerciseFormat) => exerciseFormat.id !== data.id,
        ),
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

  const renderActivity = (activity: TExerciseFormat) => {
    const updateData = (data: TExerciseFormat) =>
      handleElementChange({ ...activity, ...data });
    const onRemove = () => handleRemoveActivity(activity);

    switch (activity.type) {
      case EXERCISE_FORMAT.SINGLE_INTERVAL:
        return singleIntervalTrainingActions.renderRelocatable({
          value: activity as TSingleIntervalTraining,
          updateData,
          onRemove,
        });
      case EXERCISE_FORMAT.INTERVAL_PITCH_COMPARISON:
        return intervalPitchComparisonActions.renderRelocatable({
          value: activity as TIntervalPitchComparison,
          updateData,
          onRemove,
        });
      default:
        return null;
    }
  };

  return (
    <DragAndDrop>
      <Stack direction="row" spacing={2}>
        <Stack sx={{ minWidth: "15%" }} spacing={1}>
          <SingleIntervalSourceElement onCreated={handleElementChange} />
          <IntervalPitchComparisonSourceElement
            onCreated={handleElementChange}
          />
        </Stack>
        <VerticalStackedContainer<TExerciseFormat>
          id="dropContainer1"
          elements={value.map((activity) => ({
            value: activity,
            position: activity.position,
          }))}
          onElementPositionChange={onElementPositionChangeCallback}
          renderElement={renderActivity}
        />
      </Stack>
    </DragAndDrop>
  );
};

export default ExerciseFormatsDragAndDrop;