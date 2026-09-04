import type { ExerciseActivity } from "@/providers/auralSolfege/apis.type";
import type { TIntervalPitchComparison } from "../IntervalPitchComparison.types";
import {
  EXERCISE_FORMAT,
  type TExerciseFormat,
} from "../../ExerciseFormat.types";
import type { MUSICAL_INTERVAL } from "@/constants";

export const transformIntervalPitchComparison: (
  data: TExerciseFormat,
) => ExerciseActivity = (data) => {
  const intervalPitchComparisonActivity = data as TIntervalPitchComparison;
  return {
    intervals: [
      intervalPitchComparisonActivity.firstInterval,
      intervalPitchComparisonActivity.secondInterval,
    ] as MUSICAL_INTERVAL[],
    position: intervalPitchComparisonActivity.position,
    texture: intervalPitchComparisonActivity.texture,
    type: EXERCISE_FORMAT.INTERVAL_PITCH_COMPARISON,
  };
};
