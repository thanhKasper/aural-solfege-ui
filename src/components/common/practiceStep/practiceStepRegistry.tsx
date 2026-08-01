import {
  StepType,
  type PracticeStepResponse,
} from "@/providers/auralSolfege/apis.type";
import type { FC } from "react";
import ListenIntervalPracticeStep from "./components/ListenIntervalPracticeStep";

const practiceStepRegistry: Record<StepType, FC<PracticeStepResponse>> = {
  [StepType.LISTEN_INTERVAL]: ListenIntervalPracticeStep,
};

export default practiceStepRegistry;
