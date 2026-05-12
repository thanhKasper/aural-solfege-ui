import { Stack } from "@mui/material";
import DropContainer from "./DropContainer";
import SourceElement from "./SourceElement";

const DragAndDropContext = () => {
  return (
    <Stack direction={"row"} sx={{ width: "100%"}}>
      <div>
        <SourceElement id="element A" />
        <SourceElement id="element B" />
        <SourceElement id="element C" />
        <SourceElement id="element D" />
      </div>

      <DropContainer />
    </Stack>
  );
};

export default DragAndDropContext;
