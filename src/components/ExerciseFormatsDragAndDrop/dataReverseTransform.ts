import type { ExerciseFormat } from "@/providers/auralSolfege/apis.type";
import { EXERCISE_FORMAT, type TExerciseFormat } from "./ExerciseFormat.types";
import { inverseTransformSingleIntervalTraining } from "./IntervalEarTraining/intervalEarTrainingReverseDataTransform";

export const reverseTransformMap: Record<
  EXERCISE_FORMAT,
  (data: ExerciseFormat) => TExerciseFormat
> = {
  [EXERCISE_FORMAT.SINGLE_INTERVAL]: inverseTransformSingleIntervalTraining,
};
