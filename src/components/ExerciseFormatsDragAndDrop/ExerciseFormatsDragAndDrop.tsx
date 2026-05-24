import { IntervalEarTraining } from "./IntervalEarTraining";
import DragAndDropProvider from "@/components/organisms/DragAndDrop/DragAndDropProvider";
import DropContainer from "@/components/organisms/DragAndDrop/containers/DropContainer";
import SourceElement from "@/components/organisms/DragAndDrop/elements/SourceElement";
import { Stack } from "@mui/material";

const ExerciseFormatsDragAndDrop = () => {
  return (
    <DragAndDropProvider>
      <Stack direction="row" spacing={2}>
        <Stack sx={{ minWidth: "15%" }} spacing={1}>
          <SourceElement
            render={({ removeSelf }) => (
              <IntervalEarTraining.RelocatableElement
                onRemove={removeSelf}
              />
            )}
          >
            <IntervalEarTraining />
          </SourceElement>
        </Stack>
        <DropContainer id="dropContainer1" />
      </Stack>
    </DragAndDropProvider>
  );
};

export default ExerciseFormatsDragAndDrop;
