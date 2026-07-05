import type { ExerciseDTO, Page, PagingParameters } from "./apis.type";
import auralSolfegeClient from "./auralSolfegeClient";

export async function getAllExercises(
  params: PagingParameters,
): Promise<Page<ExerciseDTO>> {
  return auralSolfegeClient
    .get("/exercises", {
      params,
    })
    .then((res) => res.data);
}

export async function createNewExercise(newExercise: ExerciseDTO) {
  return auralSolfegeClient
    .post("/exercises", {
      ...newExercise,
      trainingMethodology: "INTERVAL_TRAINING",
    })
    .then((res) => res);
}
