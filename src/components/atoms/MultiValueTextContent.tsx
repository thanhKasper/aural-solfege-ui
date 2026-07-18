const MultiValueTextContent = ({
  multiValueText,
}: {
  multiValueText: string[];
}) => {
  return multiValueText?.map((info, idx) => {
    if (idx === 0) return info;
    return <>, {info}</>;
  });
};

export default MultiValueTextContent;
