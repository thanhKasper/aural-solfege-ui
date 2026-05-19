import useNotify from "./useNotify";

const useElementEvents = (elementId: string) => {
  const { notify } = useNotify();
  const moveUp = () => {};
  const moveDown = () => {};
  const deleteElement = () => {
    notify({
        sourceId: elementId,
        
    })
  };

  return { moveUp, moveDown, deleteElement };
};

export default useElementEvents;
