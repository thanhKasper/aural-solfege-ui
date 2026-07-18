import type { ExerciseActivity } from "@/providers/auralSolfege/apis.type";
import { transformIntervalEarTraining } from "./IntervalEarTraining/intervalEarTrainingDataTransform";
import { EXERCISE_FORMAT, type TExerciseFormat } from "./ExerciseFormat.types";

export const transformDataMap: Record<
  EXERCISE_FORMAT,
  (data: TExerciseFormat) => ExerciseActivity
> = {
  [EXERCISE_FORMAT.SINGLE_INTERVAL]: transformIntervalEarTraining,
};
