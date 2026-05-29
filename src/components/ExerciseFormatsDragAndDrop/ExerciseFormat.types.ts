import type { TIntervalTrainingExercise } from "./IntervalEarTraining";

export type TBaseExerciseFormat<T> = {
  id: string;
  position: number; // zero-based index
} & T;

export type TExerciseFormat = TIntervalTrainingExercise;

export interface IExerciseFormatSourceElement {
  onCreated: (data: TExerciseFormat) => void;
  onChanged: (data: TExerciseFormat) => void;
  onRemoved: (data: TExerciseFormat) => void;
}
