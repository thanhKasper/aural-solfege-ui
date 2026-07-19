import type { INTERVAL_TEXTURE, MUSICAL_INTERVAL } from "@/constants";
import { getIntervalTextureName } from "@/utils/intervalTexture";
import { getIntervalName } from "@/utils/retrieveMusicalInterval";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import type { IRelocatableElement } from "./IntervalEarTraining.types";

export const IntervalEarTrainingRelocatableContent = ({
  onRemove,
  value,
}: IRelocatableElement) => {
  return (
    value && (
      <Stack
        direction={"row"}
        sx={{
          justifyContent: "space-between",
          padding: 2,
          ":hover": {
            backgroundColor: (theme) => theme.palette.canvas[100],
          },
        }}
      >
        <Box>
          <Typography variant="h6">Single interval exercise</Typography>
          {value?.interval && (
            <Typography>
              {getIntervalName(value.interval as MUSICAL_INTERVAL)}
            </Typography>
          )}
          {value?.texture && (
            <Typography>
              {getIntervalTextureName(value.texture as INTERVAL_TEXTURE)}
            </Typography>
          )}
        </Box>
        <Box>
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              onRemove(value);
            }}
          >
            <DeleteIcon />
          </IconButton>
          <IconButton onClick={() => {}}>
            <EditIcon />
          </IconButton>
          <IconButton>
            <KeyboardArrowUpIcon />
          </IconButton>
          <IconButton>
            <KeyboardArrowDownIcon />
          </IconButton>
        </Box>
      </Stack>
    )
  );
};
