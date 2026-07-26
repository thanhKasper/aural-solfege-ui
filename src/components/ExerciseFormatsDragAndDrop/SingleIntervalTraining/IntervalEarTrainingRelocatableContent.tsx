import type { INTERVAL_TEXTURE, MUSICAL_INTERVAL } from "@/constants";
import { getIntervalTextureName } from "@/utils/intervalTexture";
import { getIntervalName } from "@/utils/retrieveMusicalInterval";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import type {
  IntervalEarTrainingConfiguration,
  ISingleIntervalRelocatableContent,
} from "./IntervalEarTraining.types";
import useDialog from "@/services/dialog/useDialog";
import { IntervalEarTrainingConfigurationContent } from "./IntervalEarTrainingConfigurationContent";
import { useRef } from "react";

export const IntervalEarTrainingRelocatableContent = ({
  onRemove,
  onChange,
  value,
}: ISingleIntervalRelocatableContent) => {
  const { open } = useDialog();
  const formRef = useRef<IntervalEarTrainingConfiguration>(null);

  const handleDataChange = () => {
    const close = open({
      title: "Update data",
      content: (
        <IntervalEarTrainingConfigurationContent
          defaultValue={value}
          formRef={formRef}
        />
      ),
      buttons: [
        {
          label: "Cancel",
          onClick: () => {
            close();
          },
        },
        {
          label: "Update",
          onClick: () => {
            formRef?.current?.handleSubmit((data) => {
              onChange?.(data);
            })();
            close();
          },
        },
      ],
    });
  };

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
          <IconButton onClick={handleDataChange}>
            <EditIcon />
          </IconButton>
        </Box>
      </Stack>
    )
  );
};
