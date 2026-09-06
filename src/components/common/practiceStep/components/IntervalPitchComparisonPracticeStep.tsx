import { Button, Stack, Typography } from "@mui/material";
import { useState } from "react";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import type { IntervalDistanceComparisonPracticeStep } from "@/providers/auralSolfege/apis.type";
import { getRandomIntervalSound } from "@/providers/musicAudio/apis";
import {
  getIntervalName,
  getIntervalNotation,
} from "@/utils/retrieveMusicalInterval";
import type { StepComponent } from "../practiceStepRegistry";
import type { MUSICAL_INTERVAL } from "@/constants";
import { useQuery } from "@tanstack/react-query";

type AnswerOption = "first" | "same" | "second";

const ANSWER_OPTIONS: { value: AnswerOption; label: string }[] = [
  { value: "first", label: "The first" },
  { value: "same", label: "The same" },
  { value: "second", label: "The second" },
];

const getExpectResult = (calculatedComparison: number): AnswerOption => {
  if (calculatedComparison > 0) return "first";
  if (calculatedComparison < 0) return "second";
  return "same";
};

const playIntervalSound = (blob: Blob): Promise<void> =>
  new Promise((resolve) => {
    const url = URL.createObjectURL(blob);
    const audio = new Audio(url);
    audio.onended = () => {
      URL.revokeObjectURL(url);
      resolve();
    };
    void audio.play();
  });

const IntervalPitchComparisonStep: StepComponent<
  IntervalDistanceComparisonPracticeStep
> = ({
  currentStep: {
    firstInterval,
    secondInterval,
    texture,
    calculatedComparison,
    currentQuestionNumber,
    totalQuestions,
  },
}) => {
  const { data: firstIntervalSound } = useQuery({
    queryKey: [
      `${getIntervalNotation(firstInterval)}:${texture}:first`,
    ],
    queryFn: async () =>
      await getRandomIntervalSound({
        interval: getIntervalNotation(firstInterval),
        texture,
      }),
  });
  const { data: secondIntervalSound } = useQuery({
    queryKey: [
      `${getIntervalNotation(secondInterval)}:${texture}:second`,
    ],
    queryFn: async () =>
      await getRandomIntervalSound({
        interval: getIntervalNotation(secondInterval),
        texture,
      }),
  });

  const [selectedAnswer, setSelectedAnswer] = useState<AnswerOption | null>(
    null,
  );
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const expectingResult = getExpectResult(calculatedComparison);
  const questionText = "Which interval is longer, or they are the same?";

  const handleAnswerSelect = (answer: AnswerOption) => {
    setSelectedAnswer(answer);
    setIsCorrect(answer === expectingResult);
  };

  const handlePlayInterval = async (interval: MUSICAL_INTERVAL) => {
    const sound =
      interval === firstInterval ? firstIntervalSound : secondIntervalSound;
    if (!sound) return;
    await playIntervalSound(sound);
  };

  const handlePlayIntervals = async () => {
    await handlePlayInterval(firstInterval);
    await handlePlayInterval(secondInterval);
  };

  const firstIntervalName = getIntervalName(firstInterval);
  const firstIntervalNotation = getIntervalNotation(firstInterval);
  const secondIntervalName = getIntervalName(secondInterval);
  const secondIntervalNotation = getIntervalNotation(secondInterval);

  return (
    <Stack spacing={3}>
      <Typography variant="h3">
        Question {currentQuestionNumber} of {totalQuestions}
      </Typography>

      <Typography variant="body1">{questionText}</Typography>

      <Stack direction={"row"} spacing={2} sx={{ justifyContent: "center" }}>
        <Button
          variant="outlined"
          onClick={handlePlayIntervals}
          startIcon={<VolumeUpIcon />}
        >
          Play intervals
        </Button>
      </Stack>

      <Stack direction="row" spacing={2} sx={{ justifyContent: "center" }}>
        {ANSWER_OPTIONS.map((option) => {
          return (
            <Button
              key={option.value}
              disabled={selectedAnswer !== null}
              onClick={() => handleAnswerSelect(option.value)}
            >
              {option.label}
            </Button>
          );
        })}
      </Stack>

      {isCorrect !== null && (
        <Typography
          variant="h3"
          color={isCorrect ? "success.main" : "error.main"}
        >
          {isCorrect ? "Correct!" : "Wrong!"}
        </Typography>
      )}

      {selectedAnswer !== null && (
        <Stack spacing={1} sx={{ width: "100%" }}>
          <Stack direction="row" spacing={1}>
            <Typography>
              The first interval is {firstIntervalName} ({firstIntervalNotation}
              )
            </Typography>
            <Button
              variant="text"
              size="small"
              onClick={() => handlePlayInterval(firstInterval)}
            >
              Play
            </Button>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Typography>
              The second interval is {secondIntervalName} (
              {secondIntervalNotation})
            </Typography>
            <Button
              variant="text"
              size="small"
              onClick={() => handlePlayInterval(secondInterval)}
            >
              Play
            </Button>
          </Stack>
        </Stack>
      )}
    </Stack>
  );
};

export default IntervalPitchComparisonStep;