import type { EXERCISE_FORMAT } from "@/constants";
import type { TSingleIntervalTraining } from "./SingleIntervalTraining/SingleIntervalTraining.types";
import type { TIntervalPitchComparison } from "./IntervalPitchComparison/IntervalPitchComparison.types";

export { EXERCISE_FORMAT } from "@/constants";

export type TBaseExerciseFormat<T> = {
  position: number; // zero-based index
  type: EXERCISE_FORMAT;
  id: string;
} & T;

// @TODO: Add more new exercise activity type in the future.
export type TExerciseFormat = TSingleIntervalTraining | TIntervalPitchComparison;

export interface IExerciseFormatSourceElement {
  onCreated: (data: TExerciseFormat) => void;
  onChanged: (data: TExerciseFormat) => void;
  onRemoved: (data: TExerciseFormat) => void;
}
