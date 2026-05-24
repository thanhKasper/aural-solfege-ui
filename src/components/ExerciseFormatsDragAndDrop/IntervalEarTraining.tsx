import { useCallback } from "react";
import {
  Box,
  Button,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import InputLabel from "@/components/atoms/InputLabel";
import useComponentFirstMount from "@/hooks/useComponentFirstMount";
import useDialog from "@/services/dialog/useDialog";

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

const SourceElement = () => {
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

const RelocatableElement = ({ onRemove }: { onRemove: () => void }) => {
  const { open } = useDialog();

  useComponentFirstMount(
    useCallback(() => {
      const close = open({
        title: "Interval exercise training configuration",
        content: <Configuration />,
        buttons: [
          {
            label: "Cancel",
            onClick: () => {
              onRemove();
              close();
            },
          },
          {
            label: "Submit",
            onClick: () => {
              console.log("Save the data");
            },
          },
        ],
      });
    }, [open, onRemove]),
  );

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

const INTERVALS = [
  { value: "P0", label: "Unison (P0)" },
  { value: "m2", label: "Minor 2nd (m2)" },
  { value: "M2", label: "Major 2nd (M2)" },
  { value: "m3", label: "Minor 3rd (m3)" },
  { value: "M3", label: "Major 3rd (M3)" },
  { value: "P4", label: "Perfect 4th (P4)" },
  { value: "d5", label: "Diminished 5th (d5)" },
  { value: "P5", label: "Perfect 5th (P5)" },
  { value: "m6", label: "Minor 6th (m6)" },
  { value: "M6", label: "Major 6th (M6)" },
  { value: "m7", label: "Minor 7th (m7)" },
  { value: "M7", label: "Major 7th (M7)" },
  { value: "P8", label: "Perfect Octave (P8)" },
];

const TEXTURES = [
  { value: "stacked", label: "Stacked" },
  { value: "ascending", label: "Ascending" },
  { value: "descending", label: "Descending" },
];

const Configuration = () => {
  const { control } = useForm();

  return (
    <Stack spacing={3} sx={{ py: 2 }}>
      <Controller
        control={control}
        name="interval"
        render={({ field }) => (
          <InputLabel label="Interval">
            <Select {...field} fullWidth>
              {INTERVALS.map((i) => (
                <MenuItem key={i.value} value={i.value}>
                  {i.label}
                </MenuItem>
              ))}
            </Select>
          </InputLabel>
        )}
      />
      <Controller
        control={control}
        name="texture"
        render={({ field }) => (
          <InputLabel label="Texture">
            <Select {...field} fullWidth>
              {TEXTURES.map((t) => (
                <MenuItem key={t.value} value={t.value}>
                  {t.label}
                </MenuItem>
              ))}
            </Select>
          </InputLabel>
        )}
      />
    </Stack>
  );
};

IntervalEarTraining.Configuration = Configuration;
IntervalEarTraining.RelocatableElement = RelocatableElement;
IntervalEarTraining.SourceElement = SourceElement;
