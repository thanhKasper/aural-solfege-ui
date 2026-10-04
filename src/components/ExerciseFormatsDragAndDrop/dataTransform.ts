import type { ExerciseActivity } from "@/providers/auralSolfege/apis.type";
import { transformSingleIntervalTraining } from "./SingleIntervalTraining/dataTransform";
import { transformIntervalPitchComparison } from "./IntervalPitchComparison/dataTransform";
import {
  EXERCISE_FORMAT,
  type TExerciseFormat,
} from "./types/ExerciseFormat.types";

export const transformDataMap: Record<
  string,
  (data: TExerciseFormat) => ExerciseActivity
> = {
  [EXERCISE_FORMAT.SINGLE_INTERVAL]: transformSingleIntervalTraining,
  [EXERCISE_FORMAT.INTERVAL_PITCH_COMPARISON]: transformIntervalPitchComparison,
};
