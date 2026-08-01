import type { ExerciseActivity } from "@/providers/auralSolfege/apis.type";
import type { TIntervalTrainingExercise } from "./IntervalEarTraining.types";
import { EXERCISE_FORMAT } from "../ExerciseFormat.types";
import { MUSICAL_INTERVAL } from "@/constants";

export const transformIntervalEarTraining: (
  data: TIntervalTrainingExercise,
) => ExerciseActivity = (data) => {
  return {
    intervals: [data.interval as MUSICAL_INTERVAL],
    position: data.position,
    texture: data.texture,
    type: EXERCISE_FORMAT.SINGLE_INTERVAL,
  };
};
