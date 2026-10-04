import type { ReactNode } from "react";

const MultiValueTextContent = ({
  multiValueText,
}: {
  multiValueText: ReactNode[];
}) => {
  return multiValueText?.map((info, idx) => {
    if (idx === 0) return info;
    return <>, {info}</>;
  });
};

export default MultiValueTextContent;
