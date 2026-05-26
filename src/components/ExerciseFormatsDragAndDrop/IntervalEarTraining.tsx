import {
  useEffect,
  useRef,
  useState,
  type RefObject,
} from "react";
import {
  Box,
  Button,
  Grid,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { Controller, useForm, type UseFormReturn } from "react-hook-form";
import InputLabel from "@/components/atoms/InputLabel";
import useComponentFirstMount from "@/hooks/useComponentFirstMount";
import useDialog from "@/services/dialog/useDialog";
import type { TBaseExerciseFormat } from "./ExerciseFormat.types";

export const IntervalEarTraining = () => {
  return (
    <Box
      sx={{
        padding: 2,
        borderWidth: 1,
        borderLeftWidth: 5,
        borderStyle: "solid",
        borderColor: (theme) => theme.palette.primary.main,
        backgroundColor: (theme) => {
          return theme.palette.surface[400];
        },
      }}
    >
      <Typography>Interval Ear Training</Typography>
    </Box>
  );
};

const SourceElement = () => {
  return (
    <Box
      sx={{
        padding: 2,
        borderWidth: 1,
        borderLeftWidth: 5,
        borderStyle: "solid",
        borderColor: (theme) => theme.palette.primary.main,
        backgroundColor: (theme) => {
          return theme.palette.surface[400];
        },
      }}
    >
      <Typography>Interval Ear Training</Typography>
    </Box>
  );
};

export type TIntervalTrainingExercise = TBaseExerciseFormat<{
  interval: string;
  texture: string;
}>;

type ConfigurationRef = UseFormReturn<TIntervalTrainingExercise>;

interface IRelocatableElement {
  onRemove: (data?: TIntervalTrainingExercise) => void;
  value?: TIntervalTrainingExercise;
  onChange?: (data: TIntervalTrainingExercise) => void;
  onCreated?: (data: TIntervalTrainingExercise) => void;
}

const RelocatableElement = ({
  onRemove,
  onChange,
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
            onRemove(configurationRef.current?.getValues());
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
            onRemove(configurationRef.current?.getValues());
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

const INTERVALS = [
  { value: "P0", label: "Unison (P0)" },
  { value: "m2", label: "Minor 2nd (m2)" },
  { value: "M2", label: "Major 2nd (M2)" },
  { value: "m3", label: "Minor 3rd (m3)" },
  { value: "M3", label: "Major 3rd (M3)" },
  { value: "P4", label: "Perfect 4th (P4)" },
  { value: "d5", label: "Diminished 5th (d5)" },
  { value: "P5", label: "Perfect 5th (P5)" },
  { value: "m6", label: "Minor 6th (m6)" },
  { value: "M6", label: "Major 6th (M6)" },
  { value: "m7", label: "Minor 7th (m7)" },
  { value: "M7", label: "Major 7th (M7)" },
  { value: "P8", label: "Perfect Octave (P8)" },
];

const TEXTURES = [
  { value: "stacked", label: "Stacked" },
  { value: "ascending", label: "Ascending" },
  { value: "descending", label: "Descending" },
];

const Configuration = ({
  formRef,
  defaultValue,
}: {
  formRef: RefObject<ConfigurationRef | null>;
  defaultValue?: TIntervalTrainingExercise;
}) => {
  const form = useForm<TIntervalTrainingExercise>({
    defaultValues: defaultValue,
  });

  useEffect(() => {
    formRef.current = form;
  }, [formRef, form]);

  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <Controller
          control={form.control}
          name="interval"
          render={({ field }) => (
            <InputLabel label="Interval">
              <Select {...field} fullWidth size="small">
                {INTERVALS.map((i) => (
                  <MenuItem key={i.value} value={i.value}>
                    {i.label}
                  </MenuItem>
                ))}
              </Select>
            </InputLabel>
          )}
        />
      </Grid>
      <Grid size={12}>
        <Controller
          control={form.control}
          name="texture"
          render={({ field }) => (
            <InputLabel label="Texture">
              <Select {...field} fullWidth size="small">
                {TEXTURES.map((t) => (
                  <MenuItem key={t.value} value={t.value}>
                    {t.label}
                  </MenuItem>
                ))}
              </Select>
            </InputLabel>
          )}
        />
      </Grid>
    </Grid>
  );
};

IntervalEarTraining.Configuration = Configuration;
IntervalEarTraining.RelocatableElement = RelocatableElement;
IntervalEarTraining.SourceElement = SourceElement;
