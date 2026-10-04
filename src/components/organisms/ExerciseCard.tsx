import type { ExerciseDTO } from "@/providers/auralSolfege/apis.type";
import {
  Card,
  CardContent,
  CardHeader,
  cardHeaderClasses,
  Grid,
  IconButton,
  styled,
  Typography,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import IconContent from "../molecules/IconContent";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import { getIntervalNotation } from "@/utils/retrieveMusicalInterval";

const ExerciseCardContainer = styled(Card)(({ theme: { palette } }) => {
  return {
    backgroundColor: "inherit",
    position: "relative",
    borderRadius: 0,
    shadow: "none",
    transition: "all",
    transitionDuration: "300ms",
    ":hover": {
      transition: "all",
      transitionDuration: "300ms",
      backgroundColor: palette.canvas[200],
      [`.${cardHeaderClasses.action}::after`]: {
        transition: "all",
        transitionDuration: "500ms",
        backgroundColor: "inherit",
      },
    },
  };
});

const ExerciseCardHeader = styled(CardHeader)(({ theme }) => ({
  position: "relative",
  [`.${cardHeaderClasses.content}`]: {
    zIndex: 1,
  },
  [`.${cardHeaderClasses.action}`]: {
    position: "relative",
    "&::after": {
      transition: "all",
      transitionDuration: "500ms",
      content: "''",
      backgroundColor: theme.palette.sage[100],
      position: "absolute",
      right: 0,
      height: "100%",
      width: "10rem",
      top: "50%",
      transform: "translateY(-50%)",
    },
    "& *": {
      zIndex: 1,
    },
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
                content={
                  exercise.intervals?.map((interval) => (
                    <Typography variant="body1" key={interval}>
                      {getIntervalNotation(interval)}
                    </Typography>
                  )) ?? []
                }
              />
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </ExerciseCardContainer>
  );
};
