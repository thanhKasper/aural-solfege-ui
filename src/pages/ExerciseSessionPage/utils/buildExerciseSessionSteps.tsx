import MultiValueTextContent from "@/components/atoms/MultiValueTextContent";
import type { StepperContent } from "@/components/organisms/Stepper/Stepper";
import { EXERCISE_FORMAT } from "@/constants";
import type { ExerciseDTO } from "@/providers/auralSolfege/apis.type";
import { getIntervalNotation } from "@/utils/retrieveMusicalInterval";
import { Stack } from "@mui/material";

export const buildExerciseSessionStep = (
  exercise?: ExerciseDTO,
): StepperContent[] => {
  const hasLoop = exercise?.loop ?? false;
  const oneRoundSession: StepperContent[] = (
    exercise?.exerciseActivities ?? []
  ).map((activity) => {
    return {
      title: activity.type,
      content: (
        <Stack>
          {activity.type !== EXERCISE_FORMAT.COOL_DOWN ? (
            <MultiValueTextContent
              multiValueText={activity.intervals.map((interval) =>
                getIntervalNotation(interval),
              )}
            />
          ) : (
            `Rest for ${activity.restTime} seconds`
          )}
        </Stack>
      ),
    };
  });

  return hasLoop
    ? oneRoundSession
    : [
        ...Array.from({
          length: exercise?.reps ?? 1,
        }).flatMap(() => {
          return oneRoundSession;
        }),
      ];
};
