import type { TIntervalTrainingExercise } from "./IntervalEarTraining";

export enum EXERCISE_FORMAT {
  SINGLE_INTERVAL = "SINGLE_INTERVAL",
}

export type TBaseExerciseFormat<T> = {
  id: string;
  position: number; // zero-based index
  type: EXERCISE_FORMAT;
} & T;

export type TExerciseFormat = TIntervalTrainingExercise;

export interface IExerciseFormatSourceElement {
  onCreated: (data: TExerciseFormat) => void;
  onChanged: (data: TExerciseFormat) => void;
  onRemoved: (data: TExerciseFormat) => void;
}
