import {
  Step,
  StepContent,
  StepLabel,
  type StepperProps,
  Stepper as MuiStepper,
  Box,
  stepLabelClasses,
  stepIconClasses,
  svgIconClasses,
  type StepIconProps,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import type { ReactNode } from "react";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";

const ASfStep = styled(Step)(() => ({}));

const ASfStepLabel = styled(StepLabel)(({ theme }) => ({
  [`& .${stepLabelClasses.label}`]: {
    ...theme.typography.overline,
  },

  [`& .${stepLabelClasses.active}.${stepLabelClasses.label}`]: {
    color: theme.palette.accent[400],
  },

  [`& .${stepLabelClasses.disabled}.${stepLabelClasses.label}`]: {
    color: theme.palette.ink[300],
  },

  [`& .${stepLabelClasses.completed}.${stepLabelClasses.label}`]: {
    color: theme.palette.ink[50],
  },

  [`& .${stepIconClasses.active} .${svgIconClasses.root}`]: {
    fill: theme.palette.accent[300],
  },

  [`& .${stepLabelClasses.disabled} .${svgIconClasses.root}`]: {
    fill: theme.palette.ink[300],
  },

  [`& .${stepLabelClasses.completed} .${svgIconClasses.root}`]: {
    fill: theme.palette.ink[50],
  },

  [`& .${stepLabelClasses.iconContainer} div:before`]: {
    content: '""',
    width: "120%",
    height: "120%",
    position: "absolute",
    top: "50%",
    borderRadius: "100%",
    transform: "translateY(-50%)",
  },

  [`& .${stepLabelClasses.iconContainer}.${stepLabelClasses.active} div:before`]:
    {
      backgroundColor: theme.palette.accent[100],
    },
}));

const ASfStepContent = styled(StepContent)(
  ({
    theme: {
      palette: { ink },
    },
  }) => ({
    color: ink[100],
    [`.${stepLabelClasses.root}:has(.${stepLabelClasses.completed}) + &`]: {
      color: ink[50],
    },
  }),
);

type StepperContent = {
  title: string;
  content?: ReactNode;
};

const ASfStepIcon = (props: StepIconProps) => {
  const { active, completed } = props;

  if (active) {
    return (
      <Box
        sx={{ display: "flex", justifyContent: "center", position: "relative" }}
      >
        <PauseIcon sx={{ zIndex: 1 }} />
      </Box>
    );
  } else if (completed) {
    return (
      <Box
        sx={{ display: "flex", justifyContent: "center", position: "relative" }}
      >
        <StopIcon sx={{ zIndex: 1 }} />
      </Box>
    );
  } else {
    return (
      <Box
        sx={{ display: "flex", justifyContent: "center", position: "relative" }}
      >
        <PlayArrowIcon sx={{ zIndex: 1 }} />
      </Box>
    );
  }
};

const Stepper = (props: StepperProps & { steps: StepperContent[] }) => {
  const { steps } = props;

  return (
    <Box sx={{ minWidth: 200 }}>
      <MuiStepper {...props}>
        {steps.map((step, index) => (
          <ASfStep key={index}>
            <ASfStepLabel slots={{ stepIcon: ASfStepIcon }}>
              {step.title}
            </ASfStepLabel>
            <ASfStepContent slotProps={{ transition: { in: true } }}>
              {step.content}
            </ASfStepContent>
          </ASfStep>
        ))}
      </MuiStepper>
    </Box>
  );
};

export default Stepper;
