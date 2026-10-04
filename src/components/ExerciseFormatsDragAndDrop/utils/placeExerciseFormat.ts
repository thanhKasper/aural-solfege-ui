import type { TExerciseFormat } from "../types/ExerciseFormat.types";

// Puts `data` at `data.position` in the list, replacing the element with the same id
// if there is one, then renumbers every position to its index so that positions stay
// unique and contiguous (0..n-1).
export const placeExerciseFormat = (
  list: TExerciseFormat[],
  data: TExerciseFormat,
): TExerciseFormat[] => {
  const others = list
    .filter((exerciseFormat) => exerciseFormat.id !== data.id)
    .sort((a, b) => a.position - b.position);
  const index = Math.min(Math.max(data.position, 0), others.length);

  return renumberExerciseFormats([
    ...others.slice(0, index),
    data,
    ...others.slice(index),
  ]);
};

// Sets every position to the element's index, keeping unchanged elements as they are.
export const renumberExerciseFormats = (
  list: TExerciseFormat[],
): TExerciseFormat[] =>
  list.map((exerciseFormat, position) =>
    exerciseFormat.position === position
      ? exerciseFormat
      : { ...exerciseFormat, position },
  );
