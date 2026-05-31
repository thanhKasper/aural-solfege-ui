import type { EXERCISE_FORMAT } from "@/components/ExerciseFormatsDragAndDrop/ExerciseFormat.types";

export type ExerciseDTO = {
  title: string;
  description?: string;
  exerciseId: string;
  reps?: number;
  rest: number;
  loop: boolean;
  trainingMethodology: string;
  exerciseFormats: ExerciseFormat[];
};

export type ExerciseFormat = TIntervalEarTrainingFormatDTO;

type TBaseExerciseFormat<FORMAT_TYPE extends EXERCISE_FORMAT> = {
  type: FORMAT_TYPE;
  position: number;
};

type TIntervalEarTrainingFormatDTO =
  TBaseExerciseFormat<EXERCISE_FORMAT.SINGLE_INTERVAL> & {
    title: string;
    interval: string;
    texture: string;
  };
