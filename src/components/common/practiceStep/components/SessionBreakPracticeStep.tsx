import CountDownTimer from "@/components/atoms/CountDownTimer";
import type { CoolDownPracticeStep } from "@/providers/auralSolfege/apis.type";
import { Box } from "@mui/material";
import type { StepComponent } from "../practiceStepRegistry";

const SessionBreakPracticeStep: StepComponent<CoolDownPracticeStep> = ({
  currentStep,
}) => {
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
        onCountDownEnd={() => console.log("Count down ended")}
      />
    </Box>
  );
};

export default SessionBreakPracticeStep;
