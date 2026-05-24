import { IntervalEarTraining } from "./IntervalEarTraining";
import DragAndDropProvider from "@/components/organisms/DragAndDrop/DragAndDropProvider";
import DropContainer from "@/components/organisms/DragAndDrop/containers/DropContainer";
import SourceElement from "@/components/organisms/DragAndDrop/elements/SourceElement";
import useDialog from "@/services/dialog/useDialog";
import { Stack } from "@mui/material";

const ExerciseFormatsDragAndDrop = () => {
  const { open } = useDialog();

  return (
    <DragAndDropProvider>
      <Stack direction="row" spacing={2}>
        <Stack sx={{ minWidth: "15%" }} spacing={1}>
          <SourceElement
            onRelocatableElementCreated={(handleCancellation) => {
              const close = open({
                title: "Interval exercise training configuration",
                content: <IntervalEarTraining.Configuration />,
                buttons: [
                  {
                    label: "Cancel",
                    onClick: () => {
                      handleCancellation();
                      close();
                    },
                  },
                  {
                    label: "Submit",
                    onClick: () => {
                      console.log("Save the data");
                    },
                  },
                ],
              });
            }}
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
