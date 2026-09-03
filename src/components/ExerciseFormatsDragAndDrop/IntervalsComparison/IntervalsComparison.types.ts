import type { UseFormReturn } from "react-hook-form";
import type { TBaseExerciseFormat } from "../ExerciseFormat.types";

export type TIntervalsComparison = TBaseExerciseFormat<{
  firstInterval: string;
  secondInterval: string;
  texture: string;
}>;

export type IntervalsComparisonConfiguration =
  UseFormReturn<TIntervalsComparison>;
