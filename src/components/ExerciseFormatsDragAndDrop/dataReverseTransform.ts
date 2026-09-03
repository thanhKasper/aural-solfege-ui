import type { ExerciseActivity } from "@/providers/auralSolfege/apis.type";
import { EXERCISE_FORMAT, type TExerciseFormat } from "./ExerciseFormat.types";
import { inverseTransformSingleIntervalTraining } from "./SingleIntervalTraining/transform/reverseTransform";

export const reverseTransformMap: Partial<
  Record<EXERCISE_FORMAT, (data: ExerciseActivity) => TExerciseFormat>
> = {
  [EXERCISE_FORMAT.SINGLE_INTERVAL]: inverseTransformSingleIntervalTraining,
};
