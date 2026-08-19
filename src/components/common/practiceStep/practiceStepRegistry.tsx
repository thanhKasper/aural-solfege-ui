import {
  StepType,
  type PracticeStepResponse,
} from "@/providers/auralSolfege/apis.type";
import type { FC } from "react";
import SessionBreakPracticeStep from "./components/SessionBreakPracticeStep";
import ListenIntervalPracticeStep from "./components/ListenIntervalPracticeStep";

export type StepComponent<T> = FC<PracticeStepResponse<T>>;

const practiceStepRegistry: Partial<Record<StepType, StepComponent<any>>> = {
  [StepType.LISTEN_INTERVAL]: ListenIntervalPracticeStep,
  [StepType.COOL_DOWN]: SessionBreakPracticeStep,
};

export default practiceStepRegistry;
