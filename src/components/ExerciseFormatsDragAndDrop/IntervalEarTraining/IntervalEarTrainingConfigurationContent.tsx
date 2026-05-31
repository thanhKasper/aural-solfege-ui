import { useEffect, type RefObject } from "react";
import { Grid, MenuItem, Select } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import InputLabel from "@/components/atoms/InputLabel";
import type {
  IntervalEarTrainingConfiguration,
  TIntervalTrainingExercise,
} from "./types";

const INTERVALS = [
  { value: "UNISON", label: "Unison (P0)" },
  { value: "MINOR_2ND", label: "Minor 2nd (m2)" },
  { value: "MAJOR_2ND", label: "Major 2nd (M2)" },
  { value: "MINOR_3RD", label: "Minor 3rd (m3)" },
  { value: "MAJOR_3RD", label: "Major 3rd (M3)" },
  { value: "PERFECT_4TH", label: "Perfect 4th (P4)" },
  { value: "TRITONE", label: "Diminished 5th (d5)" },
  { value: "PERFECT_5TH", label: "Perfect 5th (P5)" },
  { value: "MINOR_6TH", label: "Minor 6th (m6)" },
  { value: "MAJOR_6TH", label: "Major 6th (M6)" },
  { value: "MINOR_7TH", label: "Minor 7th (m7)" },
  { value: "MAJOR_7TH", label: "Major 7th (M7)" },
  { value: "PERFECT_8TH", label: "Perfect Octave (P8)" },
];

const TEXTURES = [
  { value: "STACKED", label: "Stacked" },
  { value: "ASCENDING", label: "Ascending" },
  { value: "DESCENDING", label: "Descending" },
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
