import type { PropsWithChildren } from "react";
import { ExerciseSessionContext } from "./ExerciseSessionContext";

interface ExerciseSessionProviderProps {
  goNext: () => void;
  goPrevious: () => void;
}

export const ExerciseSessionProvider = ({
  goNext,
  goPrevious,
  children,
}: PropsWithChildren<ExerciseSessionProviderProps>) => {
  return (
    <ExerciseSessionContext.Provider value={{ goNext, goPrevious }}>
      {children}
    </ExerciseSessionContext.Provider>
  );
};
