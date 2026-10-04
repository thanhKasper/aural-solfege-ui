import { EXERCISE_FORMAT } from "@/constants";
import type { TSingleIntervalTraining } from "./SingleIntervalTraining/types/SingleIntervalTraining.types";
import type { TIntervalPitchComparison } from "./IntervalPitchComparison/types/IntervalPitchComparison.types";
import type { RelocatableContentRenderer } from "../organisms/DragAndDrop/elements/types";

export { EXERCISE_FORMAT } from "@/constants";

export type TBaseExerciseFormat<T> = {
  position: number; // zero-based index
  type: EXERCISE_FORMAT;
  id: string;
} & T;

// @TODO: Add more new exercise activity type in the future.
export type TExerciseFormat =
  TSingleIntervalTraining | TIntervalPitchComparison;

export interface IExerciseFormatSourceElement {
  onCreated: (data: TExerciseFormat) => void;
  onChanged: (data: TExerciseFormat) => void;
  onRemoved: (data: TExerciseFormat) => void;
}

export interface ExerciseFormatActions<TPayload> {
  // Shown on the draggable source element for this format.
  label: string;

  // `onEdit` is called with the element's current value when its edit button is pressed.
  renderRelocatable: (
    onEdit: (value: TPayload) => void,
  ) => RelocatableContentRenderer;

  openCreateDialog: (deps: {
    position: number;
    onCreated: (data: TPayload) => void;
  }) => void;

  openEditDialog: (deps: {
    value: TPayload;
    onChange: (data: TPayload) => void;
  }) => void;
}

export type ExerciseFormatActionsMap = {
  [EXERCISE_FORMAT.SINGLE_INTERVAL]: ExerciseFormatActions<TSingleIntervalTraining>;
  [EXERCISE_FORMAT.INTERVAL_PITCH_COMPARISON]: ExerciseFormatActions<TIntervalPitchComparison>;
};
