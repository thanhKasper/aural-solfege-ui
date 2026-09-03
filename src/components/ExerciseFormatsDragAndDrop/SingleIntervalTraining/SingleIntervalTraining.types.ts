import type { UseFormReturn } from "react-hook-form";
import type { TBaseExerciseFormat } from "../ExerciseFormat.types";

export type TSingleIntervalTraining = TBaseExerciseFormat<{
  interval: string;
  texture: string;
}>;

export type SingleIntervalConfiguration =
  UseFormReturn<TSingleIntervalTraining>;

export interface ISingleIntervalRelocatableContent {
  onRemove: (data: TSingleIntervalTraining) => void;
  value?: TSingleIntervalTraining;
  onChange?: (data: TSingleIntervalTraining) => void;
  onCreated?: (data: TSingleIntervalTraining) => void;
}
