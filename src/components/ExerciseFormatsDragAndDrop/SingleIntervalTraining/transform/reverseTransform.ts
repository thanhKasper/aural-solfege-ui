import type {
  ExerciseActivity,
  TSingleIntervalFormatDTO,
} from "@/providers/auralSolfege/apis.type";
import type { TSingleIntervalTraining } from "../SingleIntervalTraining.types";

export const inverseTransformSingleIntervalTraining: (
  data: ExerciseActivity,
) => TSingleIntervalTraining = (data) => {
  const singleIntervalData = data as TSingleIntervalFormatDTO;
  return {
    ...singleIntervalData,
    interval: singleIntervalData.intervals[0],
    id: crypto.randomUUID(),
  };
};
