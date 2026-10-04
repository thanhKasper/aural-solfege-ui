import { EXERCISE_FORMAT } from "@/constants";
import type { ExerciseFormatActions } from "./types/ExerciseFormat.types";
import { intervalPitchComparisonActions } from "./IntervalPitchComparison/IntervalPitchComparison.actions";
import { singleIntervalTrainingActions } from "./SingleIntervalTraining/SingleIntervalTraining.actions";

export const exerciseFormatActionsMap: Partial<
  Record<EXERCISE_FORMAT, ExerciseFormatActions<any>>
> = {
  [EXERCISE_FORMAT.SINGLE_INTERVAL]: singleIntervalTrainingActions,
  [EXERCISE_FORMAT.INTERVAL_PITCH_COMPARISON]: intervalPitchComparisonActions,
};
