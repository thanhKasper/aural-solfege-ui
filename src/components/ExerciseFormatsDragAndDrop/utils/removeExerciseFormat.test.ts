import { describe, expect, it } from "vitest";
import { EXERCISE_FORMAT } from "@/constants";
import type { TExerciseFormat } from "../ExerciseFormat.types";
import { removeExerciseFormat } from "./removeExerciseFormat";

const format = (id: string, position: number) =>
  ({
    id,
    position,
    type: EXERCISE_FORMAT.SINGLE_INTERVAL,
  }) as unknown as TExerciseFormat;

const order = (list: TExerciseFormat[]) =>
  list.map(({ id, position }) => `${id}:${position}`);

describe("removeExerciseFormat", () => {
  const list = [format("a", 0), format("b", 1), format("c", 2)];

  it("removes the first element and renumbers the rest", () => {
    expect(order(removeExerciseFormat(list, 0))).toEqual(["b:0", "c:1"]);
  });

  it("removes a middle element and renumbers the rest", () => {
    expect(order(removeExerciseFormat(list, 1))).toEqual(["a:0", "c:1"]);
  });

  it("removes the last element without changing the others", () => {
    expect(order(removeExerciseFormat(list, 2))).toEqual(["a:0", "b:1"]);
  });

  it("removes the only element", () => {
    expect(removeExerciseFormat([format("a", 0)], 0)).toEqual([]);
  });

  it("returns the same list for an index outside the list", () => {
    expect(removeExerciseFormat(list, 3)).toBe(list);
    expect(removeExerciseFormat(list, -1)).toBe(list);
  });

  it("does not mutate the input list", () => {
    removeExerciseFormat(list, 0);
    expect(order(list)).toEqual(["a:0", "b:1", "c:2"]);
  });
});
