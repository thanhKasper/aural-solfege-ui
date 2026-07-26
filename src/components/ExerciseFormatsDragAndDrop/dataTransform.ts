import type { ExerciseActivity } from "@/providers/auralSolfege/apis.type";
import { transformIntervalEarTraining } from "./SingleIntervalTraining/intervalEarTrainingDataTransform";
import { EXERCISE_FORMAT, type TExerciseFormat } from "./ExerciseFormat.types";

export const transformDataMap: Record<
  string,
  (data: TExerciseFormat) => ExerciseActivity
> = {
  [EXERCISE_FORMAT.SINGLE_INTERVAL]: transformIntervalEarTraining,
};
