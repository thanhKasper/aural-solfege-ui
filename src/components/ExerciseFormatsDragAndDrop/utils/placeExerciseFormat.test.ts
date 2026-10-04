import { describe, expect, it } from "vitest";
import { EXERCISE_FORMAT } from "@/constants";
import type { TExerciseFormat } from "../ExerciseFormat.types";
import { placeExerciseFormat } from "./placeExerciseFormat";

const format = (id: string, position: number) =>
  ({
    id,
    position,
    type: EXERCISE_FORMAT.SINGLE_INTERVAL,
  }) as unknown as TExerciseFormat;

const order = (list: TExerciseFormat[]) =>
  list.map(({ id, position }) => `${id}:${position}`);

describe("placeExerciseFormat", () => {
  const list = [format("a", 0), format("b", 1), format("c", 2)];

  it("appends a new element dropped after the last one", () => {
    expect(order(placeExerciseFormat(list, format("d", 3)))).toEqual([
      "a:0",
      "b:1",
      "c:2",
      "d:3",
    ]);
  });

  it("inserts a new element at the front and shifts the others", () => {
    expect(order(placeExerciseFormat(list, format("d", 0)))).toEqual([
      "d:0",
      "a:1",
      "b:2",
      "c:3",
    ]);
  });

  it("inserts a new element in the middle", () => {
    expect(order(placeExerciseFormat(list, format("d", 1)))).toEqual([
      "a:0",
      "d:1",
      "b:2",
      "c:3",
    ]);
  });

  it("replaces an updated element without changing its place", () => {
    const updated = {
      ...format("b", 1),
      texture: "changed",
    } as TExerciseFormat;
    const result = placeExerciseFormat(list, updated);

    expect(order(result)).toEqual(["a:0", "b:1", "c:2"]);
    expect(result[1]).toBe(updated);
  });

  it("clamps a position past the end", () => {
    expect(order(placeExerciseFormat(list, format("d", 99)))).toEqual([
      "a:0",
      "b:1",
      "c:2",
      "d:3",
    ]);
  });

  it("works on an empty list", () => {
    expect(order(placeExerciseFormat([], format("a", 4)))).toEqual(["a:0"]);
  });

  it("does not mutate the input list", () => {
    placeExerciseFormat(list, format("d", 0));
    expect(order(list)).toEqual(["a:0", "b:1", "c:2"]);
  });
});
