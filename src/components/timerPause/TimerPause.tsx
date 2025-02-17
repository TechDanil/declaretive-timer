import { useEffect, useState } from "react";

export const TimerPause = () => {
  const [enabled, setEnabled] = useState(false);
  const [timer, setTimer] = useState(0);
  const [countDown, setCountDown] = useState(10);

  const toggleTimer = () => {
    setEnabled((prevEnabled) => !prevEnabled);
  };

  useEffect(() => {
    if (!enabled) return;

    const intervalId = setInterval(() => {
      setTimer((timer) => timer + 1);
      setCountDown((countDown) => Math.max(countDown - 1, 0));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [enabled]);

  useEffect(() => {
    if (countDown === 0) {
      alert("Count down");
    }
  }, [countDown]);

  return (
    <div>
      <button onClick={toggleTimer}>{!enabled ? "Start" : "Pause"}</button>
      <div>timer {timer}</div>
      <div>countDown {countDown}</div>
    </div>
  );
};
