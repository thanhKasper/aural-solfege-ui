import type { EXERCISE_FORMAT } from "@/constants";
import type { TIntervalTrainingExercise } from "./IntervalEarTraining/IntervalEarTraining.types";

export { EXERCISE_FORMAT } from "@/constants";

export type TBaseExerciseFormat<T> = {
  id: string;
  position: number; // zero-based index
  type: EXERCISE_FORMAT;
} & T;

// @TODO: Add more new exercise activity type in the future.
export type TExerciseFormat = TIntervalTrainingExercise;

export interface IExerciseFormatSourceElement {
  onCreated: (data: TExerciseFormat) => void;
  onChanged: (data: TExerciseFormat) => void;
  onRemoved: (data: TExerciseFormat) => void;
}
