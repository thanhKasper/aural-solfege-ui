export type TBaseExerciseFormat<T> = {
  id: string;
  position: number; // zero-based index
} & T;
