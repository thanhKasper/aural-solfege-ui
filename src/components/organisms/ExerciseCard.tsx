import type { ExerciseDTO } from "@/providers/auralSolfege/apis.type";
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  styled,
  Typography,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import IconContent from "../molecules/IconContent";
import RepeatIcon from "@mui/icons-material/Repeat";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MusicNoteIcon from "@mui/icons-material/MusicNote";

const ExerciseCardContainer = styled(Card)(({ theme }) => {
  return {
    backgroundColor: "inherit",
    position: "relative",
    ":hover": {
      backgroundColor: theme.palette.surface[400],
      "& > :first-child::after": {
        backgroundColor: "inherit",
      },
    },
    borderRadius: 0,
    shadow: "none",
  };
});

const ExerciseCardHeader = styled(CardHeader)(({ theme }) => ({
  position: "relative",
  "&::after": {
    content: "''",
    backgroundColor: theme.palette.secondary.main,
    position: "absolute",
    right: 0,
    height: "100%",
    width: "50%",
    zIndex: 0,
  },
  "& > *": {
    zIndex: 1,
    position: "relative",
  },
}));

interface ExerciseCardProps {
  exercise: ExerciseDTO;
  onExerciseStart?: (exercise: ExerciseDTO) => void;
}

export const ExerciseCard = ({
  exercise,
  onExerciseStart,
}: ExerciseCardProps) => {
  return (
    <ExerciseCardContainer>
      <ExerciseCardHeader
        title={exercise.title}
        action={
          <IconButton onClick={() => onExerciseStart?.(exercise)}>
            <PlayArrowIcon />
          </IconButton>
        }
      />
      <CardContent>
        <Grid container spacing={2}>
          <Grid container>
            <Grid>
              <IconContent
                icon={<MusicNoteIcon fontSize="small" />}
                content={[
                  <Typography variant="body1">Perfect 5th</Typography>,
                  <Typography variant="body1">Unison</Typography>,
                  <Typography variant="body1">Major 6th</Typography>,
                ]}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} size={12}>
            <Grid size="auto">
              <IconContent
                icon={<RepeatIcon fontSize="small" />}
                content={[
                  <Typography variant="body1">{exercise.reps}</Typography>,
                ]}
              />
            </Grid>
            <Grid size="auto">
              <IconContent
                icon={<AccessTimeIcon fontSize="small" />}
                content={[<Typography variant="body1">1h 34m</Typography>]}
              />
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </ExerciseCardContainer>
  );
};
