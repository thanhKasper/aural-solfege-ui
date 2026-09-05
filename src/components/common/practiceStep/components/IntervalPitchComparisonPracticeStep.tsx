import { Button, Stack, Typography } from "@mui/material";
import { useState } from "react";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import type { IntervalPitchComparisonPracticeStep } from "@/providers/auralSolfege/apis.type";
import {
  getIntervalName,
  getIntervalNotation,
} from "@/utils/retrieveMusicalInterval";
import type { StepComponent } from "../practiceStepRegistry";
import type { MUSICAL_INTERVAL } from "@/constants";
import { getRandomIntInclusive } from "@/utils/getRandomIntInclusive";

type AnswerOption = "first" | "same" | "second";
type ExpectResult = "lower" | "higher" | "same";

const ANSWER_OPTIONS: { value: AnswerOption; label: string }[] = [
  { value: "first", label: "The first" },
  { value: "same", label: "The same" },
  { value: "second", label: "The second" },
];

const getRandomExpectResult = (
  firstInterval: MUSICAL_INTERVAL,
  secondInterval: MUSICAL_INTERVAL,
): ExpectResult => {
  if (firstInterval === secondInterval) {
    return "same";
  }
  return (["lower", "higher"] as ExpectResult[]).at(
    getRandomIntInclusive(0, 1),
  )!;
};

const IntervalPitchComparisonStep: StepComponent<
  IntervalPitchComparisonPracticeStep
> = ({
  currentStep: {
    firstInterval,
    secondInterval,
    currentQuestionNumber,
    totalQuestions,
  },
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<AnswerOption | null>(
    null,
  );
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [expectingResult] = useState(
    getRandomExpectResult(firstInterval, secondInterval),
  );
  const questionText =
    expectingResult === "lower"
      ? "Which interval is shorter, or they are the same?"
      : "Which interval is longer, or they are the same?";

  const handleAnswerSelect = (answer: AnswerOption) => {
    setSelectedAnswer(answer);
    // TODO: Replace with API call to check answer
    // For now, mock the result
    setIsCorrect(answer === "first");
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
          onClick={() => {}}
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
            <Button variant="text" size="small" onClick={() => {}}>
              Play
            </Button>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Typography>
              The second interval is {secondIntervalName} (
              {secondIntervalNotation})
            </Typography>
            <Button variant="text" size="small" onClick={() => {}}>
              Play
            </Button>
          </Stack>
        </Stack>
      )}
    </Stack>
  );
};

export default IntervalPitchComparisonStep;
