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
  isLoop?: boolean;
  onTextChange?: (value?: string) => void;
  onRepetitionChecked?: (checked: boolean) => void;
  variant?: TextFieldProps["variant"];
  size?: TextFieldProps["size"];
}

const ExerciseRepetitionInput = ({
  value,
  isLoop,
  variant,
  onTextChange,
  onRepetitionChecked,
  size,
}: ExerciseRepetitionInputProps) => {
  const [infiniteRepetition, setInfiniteRepetition] = useState(false);
  return (
    <Stack>
      <TextField
        value={value ?? ""}
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
            checked={isLoop ?? false}
            onChange={(e) => {
              setInfiniteRepetition(e.target.checked);
              onRepetitionChecked?.(e.target.checked);
            }}
          />
        }
        label="Infinite repetition"
      />
    </Stack>
  );
};

export default ExerciseRepetitionInput;
