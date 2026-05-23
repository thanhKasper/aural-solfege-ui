import { Box, Button, Stack, Typography } from "@mui/material";

export const IntervalEarTraining = () => {
  return (
    <Box
      sx={{
        padding: 2,
        borderWidth: 1,
        borderLeftWidth: 5,
        borderStyle: "solid",
        borderColor: (theme) => theme.palette.primary.main,
        backgroundColor: (theme) => {
          return theme.palette.surface[400];
        },
      }}
    >
      <Typography>Interval Ear Training</Typography>
    </Box>
  );
};

IntervalEarTraining.SourceElement = () => {
  return (
    <Box
      sx={{
        padding: 2,
        borderWidth: 1,
        borderLeftWidth: 5,
        borderStyle: "solid",
        borderColor: (theme) => theme.palette.primary.main,
        backgroundColor: (theme) => {
          return theme.palette.surface[400];
        },
      }}
    >
      <Typography>Interval Ear Training</Typography>
    </Box>
  );
};

IntervalEarTraining.RelocatableElement = ({
  onRemove,
}: {
  onRemove: () => void;
}) => {
  return (
    <Stack
      direction={"row"}
      sx={{ backgroundColor: (theme) => theme.palette.secondary.main }}
    >
      <Box>
        <Typography>
          Interval Ear Training Exercise {crypto.randomUUID()}
        </Typography>
        <Typography>P5 - M6 - m7</Typography>
      </Box>
      <Box>
        <Button
          variant="contained"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
        >
          Remove
        </Button>
        <Button variant="contained" onMouseEnter={() => {}}>
          Edit
        </Button>
        <Button variant="contained">Move up</Button>
        <Button variant="contained">Move down</Button>
      </Box>
    </Stack>
  );
};
