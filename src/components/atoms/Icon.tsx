import RestIcon from "@/assets/rest.svg";
import QuarterRest from "@/assets/quarter-rest.svg";
import InfiniteIcon from "@/assets/infinite.svg";
import { SvgIcon, type SvgIconProps } from "@mui/material";
import type { ElementType } from "react";

type IconName = "rest" | "quarter-rest" | "infinite";

const stringIconMapper: Record<IconName, ElementType> = {
  rest: RestIcon as ElementType,
  "quarter-rest": QuarterRest as ElementType,
  infinite: InfiniteIcon as ElementType,
};

const Icon = ({
  icon,
  ...props
}: {
  icon: IconName;
  color?: SvgIconProps["color"];
} & Omit<SvgIconProps, "component">) => {
  const Component = stringIconMapper[icon];

  if (!Component) return null;

  return (
    <SvgIcon
      {...props}
      component={Component}
      inheritViewBox
      sx={{
        "& path": { fill: "currentColor" },
      }}
    />
  );
};

export default Icon;
