import { useEffect, type RefObject } from "react";
import { Grid, MenuItem, Select } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import InputLabel from "@/components/atoms/InputLabel";
import type { ConfigurationRef, TIntervalTrainingExercise } from "./types";

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

export const Configuration = ({
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
