import type { ExerciseDTO } from "./apis.type";
import auralSolfegeClient from "./auralSolfegeClient";

export function getAllExercises(): Promise<ExerciseDTO[]> {
  return auralSolfegeClient.get("/exercises");
}
