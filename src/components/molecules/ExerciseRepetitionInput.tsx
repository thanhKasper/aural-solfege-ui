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
  variant?: TextFieldProps["variant"];
  size?: TextFieldProps["size"];
}

const ExerciseRepetitionInput = ({
  value,
  variant,
  onTextChange,
  onRepetitionChecked,
  size,
}: ExerciseRepetitionInputProps) => {
  const [infiniteRepetition, setInfiniteRepetition] = useState(false);
  return (
    <Stack>
      <TextField
        value={value}
        variant={variant}
        size={size}
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
