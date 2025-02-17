import { useEffect, useState } from "react";

export const TimerStop = () => {
  const [enabled, setEnabled] = useState(false);
  const [timer, setTimer] = useState(0);
  const [countDown, setCountDown] = useState(10);

  const toggleTimer = () => {
    setEnabled((prevEnabled) => !prevEnabled);
    setTimer(0);
    setCountDown(10);
  };

  useEffect(() => {
    if (!enabled) return;
    const intervalId = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
      setCountDown((prevCountDown) => Math.max(prevCountDown - 1, 0));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [enabled]);

  useEffect(() => {
    if (countDown === 0) {
      console.log("count down");
    }
  }, [countDown]);

  return (
    <div>
      <button onClick={toggleTimer}>{!enabled ? "Start" : "Stop"}</button>
      <div>timer {timer}</div>
      <div>countDown {countDown}</div>
    </div>
  );
};
