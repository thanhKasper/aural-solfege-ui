import { useEffect, type RefObject } from "react";
import { Grid, MenuItem, Select } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import InputLabel from "@/components/atoms/InputLabel";
import type {
  IntervalsComparisonConfiguration,
  TIntervalsComparison,
} from "../IntervalsComparison.types";
import { intervalMap } from "@/utils/retrieveMusicalInterval";
import {
  getIntervalTextureName,
  INTERVAL_TEXTURE_MAP,
} from "@/utils/intervalTexture";
import type { INTERVAL_TEXTURE } from "@/constants";

interface IntervalsComparisonConfigurationContentProps {
  formRef: RefObject<IntervalsComparisonConfiguration | null>;
  defaultValue?: TIntervalsComparison;
}

const IntervalsComparisonConfigurationContent = ({
  formRef,
  defaultValue,
}: IntervalsComparisonConfigurationContentProps) => {
  const form = useForm<TIntervalsComparison>({
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
          name="firstInterval"
          rules={{ required: "This field is required" }}
          render={({ field, fieldState: { error } }) => (
            <InputLabel label="First interval" errorMessage={error?.message}>
              <Select
                value={field.value ?? ""}
                onChange={field.onChange}
                fullWidth
                size="small"
              >
                {Object.entries(intervalMap).map(
                  ([key, { name, notation }]) => (
                    <MenuItem key={key} value={key}>
                      {`${name} (${notation})`}
                    </MenuItem>
                  ),
                )}
              </Select>
            </InputLabel>
          )}
        />
      </Grid>
      <Grid size={12}>
        <Controller
          control={form.control}
          name="secondInterval"
          rules={{ required: "This field is required" }}
          render={({ field, fieldState: { error } }) => (
            <InputLabel label="Second interval" errorMessage={error?.message}>
              <Select
                value={field.value ?? ""}
                onChange={field.onChange}
                fullWidth
                size="small"
              >
                {Object.entries(intervalMap).map(
                  ([key, { name, notation }]) => (
                    <MenuItem key={key} value={key}>
                      {`${name} (${notation})`}
                    </MenuItem>
                  ),
                )}
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
                {Object.entries(INTERVAL_TEXTURE_MAP).map(([key]) => (
                  <MenuItem key={key} value={key}>
                    {getIntervalTextureName(key as INTERVAL_TEXTURE)}
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

export default IntervalsComparisonConfigurationContent;
