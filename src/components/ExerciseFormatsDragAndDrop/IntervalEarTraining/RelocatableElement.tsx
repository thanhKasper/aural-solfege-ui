import { useRef, useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import useComponentFirstMount from "@/hooks/useComponentFirstMount";
import useDialog from "@/services/dialog/useDialog";
import { Configuration } from "./Configuration";
import type {
  ConfigurationRef,
  IRelocatableElement,
  TIntervalTrainingExercise,
} from "./types";

export const RelocatableElement = ({
  onRemove,
  onCreated,
  value,
}: IRelocatableElement) => {
  const { open } = useDialog();
  const configurationRef = useRef<ConfigurationRef | null>(null);
  const [currentValue, setCurrentValue] = useState<
    TIntervalTrainingExercise | undefined
  >(undefined);

  useComponentFirstMount(() => {
    const close = open({
      title: "Interval exercise training configuration",
      content: (
        <Configuration formRef={configurationRef} defaultValue={value} />
      ),
      buttons: [
        {
          label: "Cancel",
          onClick: () => {
            if (configurationRef.current) {
              onRemove(configurationRef.current.getValues());
            }
            close();
          },
        },
        {
          label: "Submit",
          onClick: () =>
            configurationRef.current?.handleSubmit((data) => {
              onCreated?.(data);
              setCurrentValue(data);
              close();
            })(),
        },
      ],
    });
  });

  return (
    <Stack
      direction={"row"}
      sx={{ backgroundColor: (theme) => theme.palette.secondary.main }}
    >
      <Box>
        <Typography>Interval Ear Training Exercise</Typography>
        <Typography>{currentValue?.interval}</Typography>
        <Typography>{currentValue?.texture}</Typography>
        <Typography>{currentValue?.position}</Typography>
      </Box>
      <Box>
        <Button
          variant="contained"
          onClick={(e) => {
            e.stopPropagation();
            if (configurationRef.current) {
              onRemove(configurationRef.current.getValues());
            }
          }}
        >
          Remove
        </Button>
        <Button variant="contained" onMouseEnter={() => {}}>
          Edit
        </Button>
        <Button variant="contained">Move up</Button>
        <Button variant="contained">Move down</Button>
      </Box>
    </Stack>
  );
};
