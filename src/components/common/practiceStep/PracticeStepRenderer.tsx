import type { PracticeStepResponse } from "@/providers/auralSolfege/apis.type";
import type { FC } from "react";
import practiceStepRegistry from "./practiceStepRegistry";

const PracticeStepRenderer: FC<{
  practiceStep: PracticeStepResponse;
}> = ({ practiceStep }) => {
  const practiceType = practiceStep.currentStep.type;
  const Component = practiceStepRegistry[practiceType];
  return <Component {...practiceStep} />;
};

export default PracticeStepRenderer;
