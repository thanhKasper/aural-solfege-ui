import type { ExerciseFormat } from "@/providers/auralSolfege/apis.type";
import type { TIntervalTrainingExercise } from "./types";
import { EXERCISE_FORMAT } from "../ExerciseFormat.types";

export const transformIntervalEarTraining: (
  data: TIntervalTrainingExercise,
) => ExerciseFormat = (data) => {
  return {
    interval: data.interval,
    position: data.position,
    texture: data.texture,
    type: EXERCISE_FORMAT.SINGLE_INTERVAL,
  };
};
