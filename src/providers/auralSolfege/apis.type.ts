import type { EXERCISE_FORMAT } from "@/components/ExerciseFormatsDragAndDrop/ExerciseFormat.types";
import type { MUSICAL_INTERVAL } from "@/constants";

export type PageMetadata = {
  page: number;
  pageSize: number;
  totalPages: number;
  totalElements: number;
  hasNext: boolean;
  hasPrevious: boolean;
};

export type Page<T> = PageMetadata & {
  content: T[];
};

export type PagingParameters = {
  page?: number;
  pageSize?: number;
};

export type ExerciseDTO = {
  title: string;
  description?: string;
  exerciseId: string;
  reps?: number;
  rest: number;
  loop: boolean;
  trainingMethodology: string;
  intervals?: MUSICAL_INTERVAL[]; // Optional since this field won't be send during the exercise creation phase
  exerciseFormats: ExerciseFormat[];
};

export type ExerciseFormat = TIntervalEarTrainingFormatDTO;

type TBaseExerciseFormat<FORMAT_TYPE extends EXERCISE_FORMAT> = {
  type: FORMAT_TYPE;
  position: number;
};

type TIntervalEarTrainingFormatDTO =
  TBaseExerciseFormat<EXERCISE_FORMAT.SINGLE_INTERVAL> & {
    interval: string;
    texture: string;
  };
