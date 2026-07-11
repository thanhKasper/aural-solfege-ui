import { useRef, useState } from "react";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import useComponentFirstMount from "@/hooks/useComponentFirstMount";
import useDialog from "@/services/dialog/useDialog";
import { IntervalEarTrainingConfigurationContent } from "./IntervalEarTrainingConfigurationContent";
import type {
  IntervalEarTrainingConfiguration,
  IRelocatableElement,
  TIntervalTrainingExercise,
} from "./types";

export const RelocatableElement = ({
  onRemove,
  onCreated,
  value,
}: IRelocatableElement) => {
  const { open } = useDialog();
  const configurationRef = useRef<IntervalEarTrainingConfiguration | null>(
    null,
  );
  const [currentValue, setCurrentValue] = useState<
    TIntervalTrainingExercise | undefined
  >(undefined);

  useComponentFirstMount(() => {
    const close = open({
      title: "Interval exercise training configuration",
      content: (
        <IntervalEarTrainingConfigurationContent
          formRef={configurationRef}
          defaultValue={value}
        />
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
      sx={{
        justifyContent: "space-between",
        padding: 2,
        ":hover": {
          backgroundColor: (theme) => theme.palette.canvas[100],
        },
      }}
    >
      <Box>
        <Typography variant="h6">Single interval exercise</Typography>
        <Typography>{currentValue?.interval}</Typography>
        <Typography>{currentValue?.texture}</Typography>
      </Box>
      <Box>
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            if (configurationRef.current) {
              onRemove(configurationRef.current.getValues());
            }
          }}
        >
          <DeleteIcon />
        </IconButton>
        <IconButton>
          <EditIcon />
        </IconButton>
        <IconButton>
          <KeyboardArrowUpIcon />
        </IconButton>
        <IconButton>
          <KeyboardArrowDownIcon />
        </IconButton>
      </Box>
    </Stack>
  );
};
