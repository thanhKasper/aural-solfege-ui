import type { RefObject } from "react";
import dialogService from "@/services/dialog/Dialog";
import {
  EXERCISE_FORMAT,
  type ExerciseFormatActions,
} from "../types/ExerciseFormat.types";
import { SingleIntervalConfigurationContent } from "./components/SingleIntervalConfigurationContent";
import { SingleIntervalRelocatableContent } from "./SingleIntervalRelocatableContent";
import type {
  SingleIntervalConfiguration,
  TSingleIntervalTraining,
} from "./types/SingleIntervalTraining.types";

const configurationRef: RefObject<SingleIntervalConfiguration | null> = {
  current: null,
};

export const singleIntervalTrainingActions: ExerciseFormatActions<TSingleIntervalTraining> =
  {
    label: "Single Interval Training",

    renderRelocatable: ({ remove, value }) => (
      <SingleIntervalRelocatableContent
        value={value as TSingleIntervalTraining}
        onRemove={remove}
        // onChange={updateData}
        // onRemove={onRemove}
      />
    ),

    openCreateDialog: ({ position, onCreated }) => {
      const close = dialogService.open({
        title: "Single interval configuration",
        content: (
          <SingleIntervalConfigurationContent formRef={configurationRef} />
        ),
        buttons: [
          { label: "Cancel", onClick: () => close() },
          {
            label: "Submit",
            onClick: () =>
              configurationRef.current?.handleSubmit((data) => {
                onCreated({
                  ...data,
                  type: EXERCISE_FORMAT.SINGLE_INTERVAL,
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
        title: "Single interval configuration",
        content: (
          <SingleIntervalConfigurationContent
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
