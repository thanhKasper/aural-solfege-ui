import type { TExerciseFormat } from "../ExerciseFormat.types";
import { renumberExerciseFormats } from "./placeExerciseFormat";

// Removes the element at `index` and renumbers the rest so positions stay 0..n-1.
// Returns the same list when there is nothing to remove.
export const removeExerciseFormat = (
  list: TExerciseFormat[],
  index: number,
): TExerciseFormat[] => {
  if (index < 0 || index >= list.length) return list;

  return renumberExerciseFormats(list.filter((_, i) => i !== index));
};
