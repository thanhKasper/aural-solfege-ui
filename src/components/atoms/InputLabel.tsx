import { Typography } from "@mui/material";
import type { PropsWithChildren } from "react";

interface InputLabelProps {
  label: string;
  errorMessage?: string;
}

const InputLabel = ({
  label,
  errorMessage,
  children,
}: PropsWithChildren<InputLabelProps>) => {
  return (
    <>
      <label>
        <Typography variant="body1" color="textDisabled">{label}</Typography>
        {children}
      </label>
      {errorMessage ?? (
        <Typography variant="subtitle2" color="error">
          {errorMessage}
        </Typography>
      )}
    </>
  );
};

export default InputLabel;
