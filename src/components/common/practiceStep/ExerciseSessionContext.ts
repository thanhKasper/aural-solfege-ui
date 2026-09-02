import { createContext, useContext } from "react";

export interface ExerciseSessionContextValue {
  goNext: () => void;
  goPrevious: () => void;
}

export const ExerciseSessionContext =
  createContext<ExerciseSessionContextValue | undefined>(undefined);

export const useExerciseSession = (): ExerciseSessionContextValue => {
  const context = useContext(ExerciseSessionContext);
  if (!context) {
    throw new Error(
      "useExerciseSession must be used within an ExerciseSessionProvider",
    );
  }
  return context;
};
