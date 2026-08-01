import Icon from "@/components/atoms/Icon";
import MultiValueTextContent from "@/components/atoms/MultiValueTextContent";
import type { StepperContent } from "@/components/organisms/Stepper/Stepper";
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
          <MultiValueTextContent
            multiValueText={activity.intervals.map((interval) =>
              getIntervalNotation(interval),
            )}
          />
        </Stack>
      ),
    };
  });
  const oneRoundSessionWithRest: StepperContent[] = [
    ...oneRoundSession,
    {
      icon: <Icon icon="quarter-rest" />,
      title: "Rest",
      content: `Rest for ${exercise?.rest} seconds`,
    },
  ];
  return hasLoop
    ? oneRoundSessionWithRest
    : [
        ...Array.from({
          length: (exercise?.reps ?? 1) - 1,
        }).flatMap(() => {
          return oneRoundSessionWithRest;
        }),
        ...oneRoundSession,
      ];
};
