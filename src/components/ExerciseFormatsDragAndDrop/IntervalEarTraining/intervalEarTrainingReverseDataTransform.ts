import type { ExerciseActivity } from "@/providers/auralSolfege/apis.type";
import type { TIntervalTrainingExercise } from "./types";

export const inverseTransformSingleIntervalTraining: (
  data: ExerciseActivity,
) => TIntervalTrainingExercise = (data) => {
  return {
    ...data,
    interval: data.intervals[0],
    id: crypto.randomUUID(),
  };
};
