import type {
  ExerciseActivity,
  TIntervalsComparisonFormatDTO,
} from "@/providers/auralSolfege/apis.type";
import type { TIntervalsComparison } from "../IntervalsComparison.types";

export const inverseTransformIntervalsComparison: (
  data: ExerciseActivity,
) => TIntervalsComparison = (data) => {
  const intervalsComparisonData = data as TIntervalsComparisonFormatDTO;
  return {
    ...intervalsComparisonData,
    firstInterval: intervalsComparisonData.intervals[0],
    secondInterval: intervalsComparisonData.intervals[1],
    id: crypto.randomUUID(),
  };
};
