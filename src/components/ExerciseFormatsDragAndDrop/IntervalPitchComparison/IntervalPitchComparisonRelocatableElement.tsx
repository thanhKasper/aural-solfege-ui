import { Box, IconButton, Stack, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import type { TIntervalPitchComparison } from "./IntervalPitchComparison.types";
import { getIntervalName } from "@/utils/retrieveMusicalInterval";
import type { MUSICAL_INTERVAL } from "@/constants";

interface IIntervalPitchComparisonProps {
  value: TIntervalPitchComparison;
  onRemove: () => void;
}

const IntervalPitchComparisonRelocatableElement = ({
  value,
  onRemove,
}: IIntervalPitchComparisonProps) => {
  const handleDataChange = () => {};

  return (
    value && (
      <Stack
        direction={"row"}
        sx={{
          justifyContent: "space-between",
          padding: 2,
          backgroundColor: "canvas.100",
        }}
      >
        <Box>
          <Typography variant="h6">Interval pitch comparison</Typography>
          <Typography>
            {getIntervalName(value.firstInterval as MUSICAL_INTERVAL)}
          </Typography>

          <Typography>
            {getIntervalName(value.secondInterval as MUSICAL_INTERVAL)}
          </Typography>
        </Box>
        <Box>
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
          >
            <DeleteIcon />
          </IconButton>
          <IconButton onClick={handleDataChange}>
            <EditIcon />
          </IconButton>
        </Box>
      </Stack>
    )
  );
};

export default IntervalPitchComparisonRelocatableElement;
