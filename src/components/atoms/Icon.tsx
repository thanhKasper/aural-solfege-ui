import RestIcon from "@/assets/rest.svg";
import { SvgIcon, type SvgIconProps } from "@mui/material";
import type { ElementType } from "react";

const stringIconMapper: Record<string, ElementType> = {
  rest: RestIcon as ElementType,
};

const Icon = ({
  icon,
  ...props
}: {
  icon: string;
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
