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
      <label style={{ width: "100%"}}>
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
