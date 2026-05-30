import { Typography } from "@mui/material";
import { type PropsWithChildren } from "react";

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
      <Typography variant="body1" color="textDisabled">
        {label}
      </Typography>
      <div style={{ width: "100%" }}>{children}</div>
      {errorMessage && (
        <Typography variant="subtitle2" color="error">
          {errorMessage}
        </Typography>
      )}
    </>
  );
};

export default InputLabel;
