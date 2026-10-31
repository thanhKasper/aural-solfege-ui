import MultiValueTextContent from "@/components/atoms/MultiValueTextContent";
import type { StepperContent } from "@/components/organisms/Stepper/Stepper";
import { EXERCISE_FORMAT } from "@/constants";
import type {
  ExerciseActivity,
  ExerciseDTO,
} from "@/providers/auralSolfege/apis.type";
import { getIntervalNotation } from "@/utils/retrieveMusicalInterval";
import { formatTimeText } from "@/utils/formatTime";
import { Stack } from "@mui/material";

const buildActivityContent = (activity: ExerciseActivity) => {
  switch (activity.type) {
    case EXERCISE_FORMAT.COOL_DOWN:
      return `Rest for ${formatTimeText(activity.restTime)}`;
    default:
      return (
        <MultiValueTextContent
          multiValueText={activity.intervals.map((interval) =>
            getIntervalNotation(interval),
          )}
        />
      );
  }
};

export const buildExerciseSessionStep = (
  exercise?: ExerciseDTO,
): StepperContent[] => {
  const oneRoundSession: StepperContent[] = (
    exercise?.exerciseActivities ?? []
  ).map((activity) => {
    return {
      title: activity.type,
      content: <Stack>{buildActivityContent(activity)}</Stack>,
    };
  });

  const repetitions = exercise?.reps ?? 1;
  const restBetweenRepetitions: StepperContent = {
    title: EXERCISE_FORMAT.COOL_DOWN,
    content: <Stack>Rest for {formatTimeText(exercise?.rest ?? 0)}</Stack>,
  };

  return Array.from({ length: repetitions }).flatMap((_, repetition) => {
    const isLastRepetition = repetition === repetitions - 1;
    return isLastRepetition
      ? oneRoundSession
      : [...oneRoundSession, restBetweenRepetitions];
  });
};
