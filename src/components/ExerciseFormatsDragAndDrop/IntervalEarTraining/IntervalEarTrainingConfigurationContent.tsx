import { useEffect, type RefObject } from "react";
import { Grid, MenuItem, Select, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import InputLabel from "@/components/atoms/InputLabel";
import type {
  IntervalEarTrainingConfiguration,
  TIntervalTrainingExercise,
} from "./types";

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

export const IntervalEarTrainingConfigurationContent = ({
  formRef,
  defaultValue,
}: {
  formRef: RefObject<IntervalEarTrainingConfiguration | null>;
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
          name="title"
          rules={{ required: "This field is required" }}
          render={({ field, fieldState: { error } }) => (
            <InputLabel label="Title" errorMessage={error?.message}>
              <TextField value={field.value ?? ""} onInput={field.onChange} />
            </InputLabel>
          )}
        />
      </Grid>
      <Grid size={12}>
        <Controller
          control={form.control}
          name="interval"
          rules={{ required: "This field is required" }}
          render={({ field, fieldState: { error } }) => (
            <InputLabel label="Interval" errorMessage={error?.message}>
              <Select
                value={field.value ?? ""}
                onChange={field.onChange}
                fullWidth
                size="small"
              >
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
          rules={{ required: "This field is required" }}
          render={({ field, fieldState: { error } }) => (
            <InputLabel label="Texture" errorMessage={error?.message}>
              <Select
                value={field.value ?? ""}
                onChange={field.onChange}
                fullWidth
                size="small"
              >
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
