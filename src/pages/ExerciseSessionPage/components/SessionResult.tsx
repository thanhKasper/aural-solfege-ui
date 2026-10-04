import type { SessionResultDTO } from "@/providers/auralSolfege/apis.type";
import { formatTimeText } from "@/utils/formatTime";
import { Box, Button, Stack, Typography } from "@mui/material";

interface SessionResultProps {
  result: SessionResultDTO;
  onPracticeAgain: () => void;
  onBackToExercises: () => void;
}

const SessionResult = ({
  result,
  onPracticeAgain,
  onBackToExercises,
}: SessionResultProps) => {
  const rows = [
    { label: "Total steps", value: result.totalSteps },
    { label: "Completed steps", value: result.completedSteps },
    {
      label: "Duration",
      value: formatTimeText(result.durationSeconds),
    },
  ];

  return (
    <Stack spacing={4} sx={{ alignItems: "center" }}>
      <Typography variant="h2">Session Complete</Typography>
      <Stack
        spacing={1}
        sx={{
          width: "100%",
          maxWidth: 360,
          border: 1,
          borderColor: "structure.300",
          p: 3,
        }}
      >
        {rows.map((row) => (
          <Box
            key={row.label}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="body2">{row.label}</Typography>
            <Typography
              sx={{
                fontFamily: "'Be Vietnam Pro', sans-serif",
                fontWeight: 600,
                color: "ink.400",
              }}
            >
              {row.value}
            </Typography>
          </Box>
        ))}
      </Stack>
      <Stack direction="row" spacing={2}>
        <Button variant="outlined" onClick={onBackToExercises}>
          Back to exercises
        </Button>
        <Button onClick={onPracticeAgain}>Practice again</Button>
      </Stack>
    </Stack>
  );
};

export default SessionResult;
