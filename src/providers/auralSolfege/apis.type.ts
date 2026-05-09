export type ExerciseDTO = {
  title: string;
  description?: string;
  exerciseId: string;
  reps: number | null;
  trainingMethodology: string;
  exerciseFormats: ExerciseFormat[];
};

type ExerciseFormat = ActiveExerciseFormat | PassiveExerciseFormat;

type ActiveExerciseFormat = {
  type: "active";
};

type PassiveExerciseFormat = {
  type: "passive";
};
