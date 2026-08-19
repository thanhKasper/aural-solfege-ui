import type {
  IntervalPracticeStep
} from "@/providers/auralSolfege/apis.type";
import { getIntervalSound } from "@/providers/musicAudio/apis";
import { getIntervalNotation } from "@/utils/retrieveMusicalInterval";
import { Button } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import type { StepComponent } from "../practiceStepRegistry";

const ListenIntervalPracticeStep: StepComponent<IntervalPracticeStep> = ({
  currentStep,
}) => {
  const { data } = useQuery({
    queryKey: [
      `${currentStep.interval}:${currentStep.texture}:${currentStep.direction}`,
    ],
    queryFn: async () =>
      await getIntervalSound({
        direction: currentStep.direction,
        texture: currentStep.texture,
        interval: getIntervalNotation(currentStep.interval),
      }),
  });
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!data) return;
    audioRef.current?.pause();
    audioRef.current = new Audio(URL.createObjectURL(data));
    return () => {
      audioRef.current?.pause();
      if (audioRef.current?.src) URL.revokeObjectURL(audioRef.current.src);
    };
  }, [data]);

  return (
    <div>
      You are listening to interval {currentStep.interval} -{" "}
      {currentStep.direction} - {currentStep.texture}
      <div>
        <Button onClick={() => audioRef.current?.play()}>Play</Button>
      </div>
    </div>
  );
};

export default ListenIntervalPracticeStep;
