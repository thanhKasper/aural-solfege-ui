import { Stack } from "@mui/material";
import type { ReactElement } from "react";
import Icon from "../atoms/Icon";

interface IconContentProps {
  icon: ReactElement;
  content?: ReactElement[];
}

const IconContent = ({ icon, content }: IconContentProps) => {
  return (
    <Stack direction={"row"} spacing={1} sx={{ alignItems: "center" }}>
      {icon}
      <Stack direction={"row"} spacing={1} sx={{ alignItems: "center" }}>
        {content?.map((info, idx) => {
          if (idx === 0) return info;
          return (
            <>
              <Icon icon="rest" color="disabled" fontSize="xs" />
              {info}
            </>
          );
        })}
      </Stack>
    </Stack>
  );
};

export default IconContent;
