import type { ExerciseFormat } from "@/providers/auralSolfege/apis.type";
import type { TIntervalTrainingExercise } from "./types";

export const inverseTransformSingleIntervalTraining: (
  data: ExerciseFormat,
) => TIntervalTrainingExercise = (data) => {
  return {
    ...data,
    interval: data.intervals[0],
    id: crypto.randomUUID(),
  };
};
