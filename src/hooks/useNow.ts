import { useLayoutEffect, useRef, useState } from "react";

export const useNow = (updateInterval: number, isEnabled: boolean, cb?: (timestamp: number) => void) => {
  const cbRef = useRef(cb);
  cbRef.current = cb;
  const [now, setNow] = useState(Date.now());

  useLayoutEffect(() => {
    if (!isEnabled) return;

    setNow(Date.now());
    cbRef.current?.(Date.now());

    const intervalId = setInterval(() => {
      setNow(Date.now());
      cbRef.current?.(Date.now());
    }, updateInterval);

    return () => clearInterval(intervalId);
  }, [isEnabled]);

  return now;
};
