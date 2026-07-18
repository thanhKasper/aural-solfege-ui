import type { ExerciseActivity } from "@/providers/auralSolfege/apis.type";
import type { TIntervalTrainingExercise } from "./IntervalEarTraining.types";
import { EXERCISE_FORMAT } from "../ExerciseFormat.types";

export const transformIntervalEarTraining: (
  data: TIntervalTrainingExercise,
) => ExerciseActivity = (data) => {
  return {
    intervals: [data.interval],
    position: data.position,
    texture: data.texture,
    type: EXERCISE_FORMAT.SINGLE_INTERVAL,
  };
};
