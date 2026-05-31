import type { ExerciseFormat } from "@/providers/auralSolfege/apis.type";
import type { TIntervalTrainingExercise } from "./types";

export const inverseTransformSingleIntervalTraining: (
  data: ExerciseFormat,
) => TIntervalTrainingExercise = (data) => {
  return {
    ...data,
    id: crypto.randomUUID(),
  };
};
