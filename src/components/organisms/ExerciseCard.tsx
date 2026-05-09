import type { ExerciseDTO } from "@/providers/auralSolfege/apis.type";
import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  styled,
  Typography,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import IconContent from "../molecules/IconContent";
import RepeatIcon from "@mui/icons-material/Repeat";

const ExerciseCardContainer = styled(Card)(({ theme }) => {
  return {
    backgroundColor: "inherit",
    position: "relative",
    ":hover": {
      backgroundColor: theme.palette.surface[400],
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
}

export const ExerciseCard = ({ exercise }: ExerciseCardProps) => {
  return (
    <ExerciseCardContainer>
      <ExerciseCardHeader
        title={exercise.title}
        action={
          <IconButton>
            <PlayArrowIcon />
          </IconButton>
        }
      />
      <CardContent>
        <IconContent
          icon={<RepeatIcon />}
          content={[
            <Typography variant="body1">{exercise.reps}</Typography>,
            <Typography>jkjkj</Typography>,
          ]}
        />
      </CardContent>
    </ExerciseCardContainer>
  );
};
