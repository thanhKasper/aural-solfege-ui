import { Stack } from "@mui/material";
import type { ReactElement } from "react";
import MultiValueTextContent from "../atoms/MultiValueTextContent";

interface IconContentProps {
  icon: ReactElement;
  content?: string[];
}

const IconContent = ({ icon, content }: IconContentProps) => {
  return (
    <Stack direction={"row"} spacing={1} sx={{ alignItems: "center" }}>
      {icon}
      <Stack direction={"row"} spacing={1} sx={{ alignItems: "center" }}>
        <MultiValueTextContent multiValueText={content ?? []} />
      </Stack>
    </Stack>
  );
};

export default IconContent;
