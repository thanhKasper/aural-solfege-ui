import type {
  ExerciseDTO,
  PracticeStepResponse,
  Page,
  PagingParameters,
  SessionDTO,
  SessionResultDTO,
} from "./apis.type";
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

export async function getExercise(exerciseId: string): Promise<ExerciseDTO> {
  return auralSolfegeClient
    .get("/exercises/" + exerciseId)
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

export async function createExerciseSession(
  exerciseId: string,
): Promise<PracticeStepResponse<any>> {
  return auralSolfegeClient
    .post("/exercises/" + exerciseId + "/sessions")
    .then((response) => response.data);
}

export async function getNextExerciseSession(
  sessionId: string,
): Promise<PracticeStepResponse<any>> {
  return auralSolfegeClient
    .post("/sessions/" + sessionId + "/advance")
    .then((response) => response.data);
}

export async function concludeExerciseSession(
  sessionId: string,
): Promise<SessionResultDTO> {
  return auralSolfegeClient
    .post("/sessions/" + sessionId + "/conclude")
    .then((response) => response.data);
}

export async function getAvailableSessions(
  exerciseId: string,
): Promise<SessionDTO[]> {
  return auralSolfegeClient
    .get("/exercises/" + exerciseId + "/sessions")
    .then((response) => response.data);
}

export async function deleteSession(sessionId: string): Promise<void> {
  await auralSolfegeClient.delete("/sessions/" + sessionId);
}

export async function getSession(
  sessionId: string,
): Promise<PracticeStepResponse<any>> {
  return auralSolfegeClient
    .get("/sessions/" + sessionId)
    .then((response) => response.data);
}
