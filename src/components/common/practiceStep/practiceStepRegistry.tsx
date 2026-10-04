import {
  StepType,
  type PracticeStepResponse,
} from "@/providers/auralSolfege/apis.type";
import type { FC } from "react";
import SessionBreakPracticeStep from "./components/SessionBreakPracticeStep";
import ListenIntervalPracticeStep from "./components/ListenIntervalPracticeStep";
import IntervalPitchComparisonStep from "./components/IntervalPitchComparisonPracticeStep";

export type StepComponent<T> = FC<PracticeStepResponse<T>>;

const practiceStepRegistry: Partial<Record<StepType, StepComponent<any>>> = {
  [StepType.LISTEN_INTERVAL]: ListenIntervalPracticeStep,
  [StepType.COOL_DOWN]: SessionBreakPracticeStep,
  [StepType.INTERVAL_SOUND_COMPARISON]: IntervalPitchComparisonStep,
};

export default practiceStepRegistry;
