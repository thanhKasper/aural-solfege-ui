import { EXERCISE_FORMAT } from "@/constants";
import type { ExerciseFormatActionsMap } from "./ExerciseFormat.types";
import { intervalPitchComparisonActions } from "./IntervalPitchComparison/IntervalPitchComparison.actions";
import { singleIntervalTrainingActions } from "./SingleIntervalTraining/SingleIntervalTraining.actions";

export const exerciseFormatActionsMap: ExerciseFormatActionsMap = {
  [EXERCISE_FORMAT.SINGLE_INTERVAL]: singleIntervalTrainingActions,
  [EXERCISE_FORMAT.INTERVAL_PITCH_COMPARISON]: intervalPitchComparisonActions,
};