import { useAppDispatch, useAppSelector } from "@/store";
import { getModalSelector } from "@/store/selectors";
import { closeModal } from "@/store/slices";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Dialog as MuiDialog,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const Dialog = () => {
  const { content, isOpen, title, buttons } =
    useAppSelector(getModalSelector());
  const dispatch = useAppDispatch();
  return (
    <MuiDialog
      maxWidth="lg"
      open={isOpen}
      onClose={() => dispatch(closeModal())}
    >
      <IconButton
        aria-label="close"
        onClick={() => dispatch(closeModal())}
        sx={(theme) => ({
          position: "absolute",
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <CloseIcon />
      </IconButton>
      <DialogTitle sx={{ mr: 2 }}>{title}</DialogTitle>
      <DialogContent>{content}</DialogContent>
      <DialogActions>
        {buttons.map((button) => (
          <Button onClick={button.onClick}>{button.label}</Button>
        ))}
      </DialogActions>
    </MuiDialog>
  );
};

export default Dialog;
