import type { ExerciseActivity } from "@/providers/auralSolfege/apis.type";
import type { TSingleIntervalTraining } from "../SingleIntervalTraining.types";
import {
  EXERCISE_FORMAT,
  type TExerciseFormat,
} from "../../ExerciseFormat.types";
import { MUSICAL_INTERVAL } from "@/constants";

export const transformSingleIntervalTraining: (
  data: TExerciseFormat,
) => ExerciseActivity = (data) => {
  const singleIntervalActivity = data as TSingleIntervalTraining;
  return {
    intervals: [singleIntervalActivity.interval as MUSICAL_INTERVAL],
    position: singleIntervalActivity.position,
    texture: singleIntervalActivity.texture,
    type: EXERCISE_FORMAT.SINGLE_INTERVAL,
  };
};
