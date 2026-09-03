import type { ExerciseActivity } from "@/providers/auralSolfege/apis.type";
import { transformSingleIntervalTraining } from "./SingleIntervalTraining/transform/dataTransform";
import { EXERCISE_FORMAT, type TExerciseFormat } from "./ExerciseFormat.types";

export const transformDataMap: Record<
  string,
  (data: TExerciseFormat) => ExerciseActivity
> = {
  [EXERCISE_FORMAT.SINGLE_INTERVAL]: transformSingleIntervalTraining,
};
