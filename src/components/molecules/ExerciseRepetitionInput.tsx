import { TextField, type TextFieldProps } from "@mui/material";

interface ExerciseRepetitionInputProps {
  value?: string;
  onTextChange?: (value?: string) => void;
  variant?: TextFieldProps["variant"];
  size?: TextFieldProps["size"];
}

const ExerciseRepetitionInput = ({
  value,
  variant,
  onTextChange,
  size,
}: ExerciseRepetitionInputProps) => {
  return (
    <TextField
      value={value ?? ""}
      variant={variant}
      size={size}
      onChange={(e) => {
        onTextChange?.(e.currentTarget.value);
      }}
      slotProps={{ htmlInput: { inputMode: "numeric" } }}
    />
  );
};

export default ExerciseRepetitionInput;
