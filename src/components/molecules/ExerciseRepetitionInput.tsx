import {
  Checkbox,
  FormControlLabel,
  Stack,
  TextField,
  type TextFieldProps,
} from "@mui/material";
import { useState } from "react";

interface ExerciseRepetitionInputProps {
  value?: string;
  onTextChange?: (value?: string) => void;
  onRepetitionChecked?: () => void;
  variant: TextFieldProps["variant"];
}

const ExerciseRepetitionInput = ({
  value,
  variant,
  onTextChange,
  onRepetitionChecked,
}: ExerciseRepetitionInputProps) => {
  const [infiniteRepetition, setInfiniteRepetition] = useState(false);
  return (
    <Stack>
      <TextField
        value={value}
        variant={variant}
        onChange={(e) => {
          onTextChange?.(e.target.value);
        }}
        type="number"
        disabled={infiniteRepetition}
      />
      <FormControlLabel
        control={
          <Checkbox
            onChange={(e) => {
              setInfiniteRepetition(e.target.checked);
              onRepetitionChecked?.();
            }}
          />
        }
        label="Infinite repetition"
      />
    </Stack>
  );
};

export default ExerciseRepetitionInput;
