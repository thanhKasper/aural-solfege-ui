import type { UseFormReturn } from "react-hook-form";
import type { TBaseExerciseFormat } from "../ExerciseFormat.types";

export type TIntervalTrainingExercise = TBaseExerciseFormat<{
  interval: string;
  texture: string;
}>;

export type IntervalEarTrainingConfiguration =
  UseFormReturn<TIntervalTrainingExercise>;

export interface IRelocatableElement {
  onRemove: (data: TIntervalTrainingExercise) => void;
  value?: TIntervalTrainingExercise;
  onChange?: (data: TIntervalTrainingExercise) => void;
  onCreated?: (data: TIntervalTrainingExercise) => void;
}
