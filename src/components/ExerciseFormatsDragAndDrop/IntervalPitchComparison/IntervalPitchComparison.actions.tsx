import type { RefObject } from "react";
import dialogService from "@/services/dialog/Dialog";
import { EXERCISE_FORMAT, type ExerciseFormatActions } from "../ExerciseFormat.types";
import IntervalPitchComparisonConfigurationContent from "./components/IntervalPitchComparisonConfigurationContent";
import IntervalPitchComparisonRelocatableElement from "./IntervalPitchComparisonRelocatableElement";
import type {
  IntervalPitchComparisonConfiguration,
  TIntervalPitchComparison,
} from "./IntervalPitchComparison.types";

const configurationRef: RefObject<IntervalPitchComparisonConfiguration | null> = {
  current: null,
};

export const intervalPitchComparisonActions: ExerciseFormatActions<TIntervalPitchComparison> = {
  renderRelocatable: ({ value, onRemove }) => (
    <IntervalPitchComparisonRelocatableElement
      value={value}
      onRemove={() => onRemove(value)}
    />
  ),

  openCreateDialog: ({ position, onCreated }) => {
    const close = dialogService.open({
      title: "Interval pitch comparison configuration",
      content: (
        <IntervalPitchComparisonConfigurationContent formRef={configurationRef} />
      ),
      buttons: [
        { label: "Cancel", onClick: () => close() },
        {
          label: "Submit",
          onClick: () =>
            configurationRef.current?.handleSubmit((data) => {
              onCreated({
                ...data,
                type: EXERCISE_FORMAT.INTERVAL_PITCH_COMPARISON,
                position,
                id: crypto.randomUUID(),
              });
              close();
            })(),
        },
      ],
    });
  },

  openEditDialog: ({ value, onChange }) => {
    const close = dialogService.open({
      title: "Interval pitch comparison configuration",
      content: (
        <IntervalPitchComparisonConfigurationContent
          formRef={configurationRef}
          defaultValue={value}
        />
      ),
      buttons: [
        { label: "Cancel", onClick: () => close() },
        {
          label: "Submit",
          onClick: () =>
            configurationRef.current?.handleSubmit((data) => {
              onChange({ ...value, ...data });
              close();
            })(),
        },
      ],
    });
  },
};