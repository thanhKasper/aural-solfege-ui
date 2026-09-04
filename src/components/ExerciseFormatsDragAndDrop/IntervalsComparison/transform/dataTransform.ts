import type { ExerciseActivity } from "@/providers/auralSolfege/apis.type";
import type { TIntervalsComparison } from "../IntervalsComparison.types";
import {
  EXERCISE_FORMAT,
  type TExerciseFormat,
} from "../../ExerciseFormat.types";
import type { MUSICAL_INTERVAL } from "@/constants";

export const transformIntervalsComparison: (
  data: TExerciseFormat,
) => ExerciseActivity = (data) => {
  const intervalsComparisonActivity = data as TIntervalsComparison;
  return {
    intervals: [
      intervalsComparisonActivity.firstInterval,
      intervalsComparisonActivity.secondInterval,
    ] as MUSICAL_INTERVAL[],
    position: intervalsComparisonActivity.position,
    texture: intervalsComparisonActivity.texture,
    type: EXERCISE_FORMAT.INTERVALS_COMPARISON,
  };
};
