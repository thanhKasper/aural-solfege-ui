import type { EXERCISE_FORMAT } from "@/constants";
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
  exerciseActivities: ExerciseActivity[];
};

type StepStatus = "ACTIVE" | "COMPLETED" | "PENDING";
export enum StepType {
  LISTEN_INTERVAL = "LISTEN_INTERVAL",
  COOL_DOWN = "COOL_DOWN",
}
type Direction = "UP" | "DOWN";
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export type SessionMetadata = {
  sessionId: string;
  totalSteps: number;
  currentStepIndex: number;
  repetitions: number;
  isLoop: boolean;
  stepsPerRepetition: number;
  hasNext: boolean;
};

export type PracticeStep<T> = {
  type: StepType;
  activityPosition: number;
  status: StepStatus;
} & T;

export type IntervalPracticeStep = PracticeStep<{
  interval: MUSICAL_INTERVAL;
  direction: Direction;
  texture: string;
}>;

export type CoolDownPracticeStep = PracticeStep<{
  restingTimeInSecond: number;
}>;

export type ApiCallInfo = {
  method: HttpMethod;
  url: string;
  query: {
    direction: Direction;
    interval: MUSICAL_INTERVAL;
    texture: string;
  };
  body: null | Record<string, unknown>;
};

export type PracticeStepResponse<T> = {
  metadata: SessionMetadata;
  currentStep: PracticeStep<T>;
  apiCall: ApiCallInfo;
};

export type SessionResultDTO = {
  totalSteps: number;
  completedSteps: number;
  durationSeconds: number;
};

export type ExerciseActivity =
  | TSingleIntervalFormatDTO
  | TCoolDownActivityDTO;

type TBaseExerciseFormat<FORMAT_TYPE extends EXERCISE_FORMAT> = {
  type: FORMAT_TYPE;
  position: number;
};

export type TSingleIntervalFormatDTO =
  TBaseExerciseFormat<EXERCISE_FORMAT.SINGLE_INTERVAL> & {
    intervals: MUSICAL_INTERVAL[];
    texture: string;
  };

type TCoolDownActivityDTO = TBaseExerciseFormat<EXERCISE_FORMAT.COOL_DOWN> & {
  restTime: number;
};
