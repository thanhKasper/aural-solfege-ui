import type {
  ExerciseActivity,
  TIntervalPitchComparisonFormatDTO,
} from "@/providers/auralSolfege/apis.type";
import type { TIntervalPitchComparison } from "../IntervalPitchComparison.types";

export const inverseTransformIntervalPitchComparison: (
  data: ExerciseActivity,
) => TIntervalPitchComparison = (data) => {
  const intervalPitchComparisonData = data as TIntervalPitchComparisonFormatDTO;
  return {
    ...intervalPitchComparisonData,
    firstInterval: intervalPitchComparisonData.intervals[0],
    secondInterval: intervalPitchComparisonData.intervals[1],
    id: crypto.randomUUID(),
  };
};
