import type { TBaseExerciseFormat } from "../ExerciseFormat.types";

export type TIntervalTrainingExercise = TBaseExerciseFormat<{
  firstInterval: string;
  secondInterval: string;
  texture: string;
}>;
