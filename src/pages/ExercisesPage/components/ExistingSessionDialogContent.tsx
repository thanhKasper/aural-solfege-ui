import type { SessionDTO } from "@/providers/auralSolfege/apis.type";
import { Typography } from "@mui/material";

interface ExistingSessionDialogContentProps {
  session: SessionDTO;
}

export const ExistingSessionDialogContent = ({
  session,
}: ExistingSessionDialogContentProps) => (
  <>
    <Typography>
      You have an unfinished session ({session.completedSteps}/
      {session.totalSteps} steps completed), started on{" "}
      {new Date(session.createdAt).toLocaleString()}.
    </Typography>
    <Typography sx={{ mt: 1 }}>
      Do you want to continue it or start a new one? Starting a new one discards
      the unfinished session.
    </Typography>
  </>
);
