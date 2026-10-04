import type { TExerciseFormat } from "./ExerciseFormat.types";
import { renumberExerciseFormats } from "./placeExerciseFormat";

// Moves the element at `fromIndex` to where it was dropped. `dropIndex` is an insertion
// index into the list as it was before the move, so dropping below the element's own
// slot lands one place earlier once the element has been taken out. The list order is
// the order the elements are displayed in. Returns the same list when nothing moves.
export const moveExerciseFormat = (
  list: TExerciseFormat[],
  fromIndex: number,
  dropIndex: number,
): TExerciseFormat[] => {
  if (fromIndex < 0 || fromIndex >= list.length) return list;

  const target = dropIndex > fromIndex ? dropIndex - 1 : dropIndex;
  if (target === fromIndex) return list;

  const rest = list.filter((_, index) => index !== fromIndex);
  const insertAt = Math.min(Math.max(target, 0), rest.length);

  return renumberExerciseFormats([
    ...rest.slice(0, insertAt),
    list[fromIndex],
    ...rest.slice(insertAt),
  ]);
};
