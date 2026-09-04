import type { UseFormReturn } from "react-hook-form";
import type { TBaseExerciseFormat } from "../ExerciseFormat.types";

export type TIntervalPitchComparison = TBaseExerciseFormat<{
  firstInterval: string;
  secondInterval: string;
  texture: string;
}>;

export type IntervalPitchComparisonConfiguration =
  UseFormReturn<TIntervalPitchComparison>;
