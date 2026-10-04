import type { PracticeStepResponse } from "@/providers/auralSolfege/apis.type";
import type { FC } from "react";
import practiceStepRegistry from "./practiceStepRegistry";
import { Typography } from "@mui/material";

const PracticeStepRenderer: FC<{
  practiceStep: PracticeStepResponse<unknown>;
}> = ({ practiceStep }) => {
  const practiceType = practiceStep.currentStep.type;
  const Component = practiceStepRegistry[practiceType];
  if (!Component) {
    return <Typography>Type {practiceType} to be implemented</Typography>;
  }
  return <Component key={practiceStep.metadata.currentStepIndex} {...practiceStep} />;
};

export default PracticeStepRenderer;
