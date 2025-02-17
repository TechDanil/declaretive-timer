import { useEffect, useState } from "react"
import { useNow } from "../../hooks/useNow"
import { COUNT_DOWN_MS, UPDATE_INTERVAL_MS, MILLISECONDS_IN_SECOND } from "../../configs"

export const TimerUseNowStop = () => {
  const [startAt, setStartAt] = useState<number | undefined>(undefined)

  const now = useNow(UPDATE_INTERVAL_MS, Boolean(startAt))

  const fromStart = now - (startAt ?? now)

  const countDown = Math.max(0, COUNT_DOWN_MS - fromStart)
  const isCountEnd = countDown === 0

  useEffect(() => {
    if (isCountEnd) {
      alert("Count down");
    }
  }, [isCountEnd])

  const toggleTimer = () => {
    if (startAt) {
      setStartAt(undefined)
    } else {
        setStartAt(Date.now())
    }
  }

  return (
    <div>
      <button onClick={toggleTimer}>{!startAt ? "Start" : "Stop"}</button>
      <div>timer {Math.floor(fromStart / MILLISECONDS_IN_SECOND)}</div>
      <div>countDown {Math.ceil(countDown / MILLISECONDS_IN_SECOND)}</div>

      <div>timer ms {fromStart}</div>
      <div>countDown ms {countDown}</div>
    </div>
  );
}