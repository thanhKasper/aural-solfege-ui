import type {
  ExerciseActivity,
  TIntervalEarTrainingFormatDTO,
} from "@/providers/auralSolfege/apis.type";
import type { TIntervalTrainingExercise } from "./IntervalEarTraining.types";

export const inverseTransformSingleIntervalTraining: (
  data: ExerciseActivity,
) => TIntervalTrainingExercise = (data) => {
  const singleIntervalData = data as TIntervalEarTrainingFormatDTO;
  return {
    ...singleIntervalData,
    interval: singleIntervalData.intervals[0],
    id: crypto.randomUUID(),
  };
};
