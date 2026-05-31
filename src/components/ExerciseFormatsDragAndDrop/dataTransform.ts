import type { ExerciseFormat } from "@/providers/auralSolfege/apis.type";
import { transformIntervalEarTraining } from "./IntervalEarTraining/intervalEarTrainingDataTransform";
import { EXERCISE_FORMAT, type TExerciseFormat } from "./ExerciseFormat.types";

export const transformDataMap: Record<
  EXERCISE_FORMAT,
  (data: TExerciseFormat) => ExerciseFormat
> = {
  [EXERCISE_FORMAT.SINGLE_INTERVAL]: transformIntervalEarTraining,
};
