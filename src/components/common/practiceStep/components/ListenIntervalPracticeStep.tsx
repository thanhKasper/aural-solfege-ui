import type { PracticeStepResponse } from "@/providers/auralSolfege/apis.type";
import type { FC } from "react";

const ListenIntervalPracticeStep: FC<PracticeStepResponse> = (props) => {
  return <div>ListenIntervalPracticeStep ${JSON.stringify(props)}</div>;
};

export default ListenIntervalPracticeStep;
