import CountDownTimer from "@/components/atoms/CountDownTimer";
import type { CoolDownPracticeStep } from "@/providers/auralSolfege/apis.type";
import { Box } from "@mui/material";
import { useExerciseSession } from "../ExerciseSessionContext";
import type { StepComponent } from "../practiceStepRegistry";

const SessionBreakPracticeStep: StepComponent<CoolDownPracticeStep> = ({
  currentStep,
}) => {
  const { goNext } = useExerciseSession();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CountDownTimer
        timeInSecond={currentStep.restingTimeInSecond}
        onCountDownEnd={goNext}
      />
    </Box>
  );
};

export default SessionBreakPracticeStep;
