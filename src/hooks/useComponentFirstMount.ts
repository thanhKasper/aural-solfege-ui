import { useEffect, useRef } from "react";

const useComponentFirstMount = (callback: () => void) => {
  const hasMountedRef = useRef(false);

  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      callback();
    }
  }, [callback]);
};

export default useComponentFirstMount;
