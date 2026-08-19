import type { CoolDownPracticeStep } from "@/providers/auralSolfege/apis.type";
import type { StepComponent } from "../practiceStepRegistry";

const SessionBreakPracticeStep: StepComponent<CoolDownPracticeStep> = ({
  currentStep,
}) => {
  return <div>{JSON.stringify(currentStep)}</div>;
};

export default SessionBreakPracticeStep;
