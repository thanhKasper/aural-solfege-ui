import { formatTime } from "@/utils/formatTime";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";

interface CountDownTimerProps {
  timeInSecond: number;
  onCountDownEnd?: () => void;
}

const CountDownTimer = ({
  timeInSecond,
  onCountDownEnd,
}: CountDownTimerProps) => {
  const [remaining, setRemaining] = useState(timeInSecond);
  const [previousTimeInSecond, setPreviousTimeInSecond] = useState(timeInSecond);

  if (timeInSecond !== previousTimeInSecond) {
    setPreviousTimeInSecond(timeInSecond);
    setRemaining(timeInSecond);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (remaining > 0) return;
    onCountDownEnd?.();
  }, [remaining, onCountDownEnd]);

  const total = timeInSecond;
  const progress = total > 0 ? (remaining / total) * 100 : 0;

  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        variant="determinate"
        value={progress}
        size={220}
        thickness={4}
        sx={{
          color: "accent.300",
          backgroundColor: "structure.200",
          borderRadius: "50%",
          "& .MuiCircularProgress-circle": {
            strokeLinecap: "round",
          },
        }}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
        }}
      >
        <Typography
          sx={{
            fontFamily: "'Be Vietnam Pro', sans-serif",
            fontSize: "3rem",
            fontWeight: 600,
            color: "ink.400",
          }}
        >
          {formatTime(remaining)}
        </Typography>
      </Box>
    </Box>
  );
};

export default CountDownTimer;
