import type { ExerciseDTO } from "./apis.type";
import auralSolfegeClient from "./auralSolfegeClient";

export async function getAllExercises(): Promise<ExerciseDTO[]> {
  return auralSolfegeClient.get("/exercises").then((res) => res.data);
}

export async function createNewExercise(newExercise: ExerciseDTO) {
  return auralSolfegeClient.post("/exercises", newExercise).then((res) => res);
}
