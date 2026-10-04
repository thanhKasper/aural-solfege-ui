import { describe, expect, it } from "vitest";
import { EXERCISE_FORMAT } from "@/constants";
import type { TExerciseFormat } from "../types/ExerciseFormat.types";
import { moveExerciseFormat } from "./moveExerciseFormat";

const format = (id: string, position: number) =>
  ({
    id,
    position,
    type: EXERCISE_FORMAT.SINGLE_INTERVAL,
  }) as unknown as TExerciseFormat;

const order = (list: TExerciseFormat[]) =>
  list.map(({ id, position }) => `${id}:${position}`);

describe("moveExerciseFormat", () => {
  const list = [format("a", 0), format("b", 1), format("c", 2), format("d", 3)];

  it("moves an element to the front", () => {
    expect(order(moveExerciseFormat(list, 2, 0))).toEqual([
      "c:0",
      "a:1",
      "b:2",
      "d:3",
    ]);
  });

  it("moves an element before a later one", () => {
    expect(order(moveExerciseFormat(list, 1, 3))).toEqual([
      "a:0",
      "c:1",
      "b:2",
      "d:3",
    ]);
  });

  it("moves an element to the end", () => {
    expect(order(moveExerciseFormat(list, 1, 4))).toEqual([
      "a:0",
      "c:1",
      "d:2",
      "b:3",
    ]);
  });

  it("moves an element up by one", () => {
    expect(order(moveExerciseFormat(list, 2, 1))).toEqual([
      "a:0",
      "c:1",
      "b:2",
      "d:3",
    ]);
  });

  it("returns the same list when dropped on its own slot", () => {
    expect(moveExerciseFormat(list, 1, 1)).toBe(list);
  });

  it("returns the same list when dropped right after its own slot", () => {
    expect(moveExerciseFormat(list, 1, 2)).toBe(list);
  });

  it("returns the same list for an index outside the list", () => {
    expect(moveExerciseFormat(list, 9, 0)).toBe(list);
    expect(moveExerciseFormat(list, -1, 0)).toBe(list);
  });

  it("clamps a drop index past the end", () => {
    expect(order(moveExerciseFormat(list, 0, 99))).toEqual([
      "b:0",
      "c:1",
      "d:2",
      "a:3",
    ]);
  });

  it("does not mutate the input list", () => {
    moveExerciseFormat(list, 0, 3);
    expect(order(list)).toEqual(["a:0", "b:1", "c:2", "d:3"]);
  });
});
