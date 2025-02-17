import { useEffect, useState } from "react"
import { useNow } from "../../hooks/useNow"
import { COUNT_DOWN_MS, MILLISECONDS_IN_SECOND, UPDATE_INTERVAL_MS } from "../../configs"

export const TimerUseNowPause = () => {
  const [startAt, setStartAt] = useState<number | undefined>(undefined)
  const [initialTimer, setInitialTimer] = useState(0)

  const now = useNow(UPDATE_INTERVAL_MS, Boolean(startAt))

  const timeFromStart = now - (startAt ?? now)

  const timer = timeFromStart + initialTimer
  const countDown = COUNT_DOWN_MS - timer
  const isCountEnd = countDown === 0

  useEffect(() => {
    if (isCountEnd) alert('Count down')
  }, [isCountEnd])

  const toggleTimer = () => { 
    if (startAt) {
      setInitialTimer(timer)
      setStartAt(undefined)
    } else {
      setStartAt(Date.now())
    }
  }

  return (
    <div>
      <button onClick={toggleTimer}>{!startAt ? "Start" : "Pause"}</button>
      <div>timer {Math.floor(timer / MILLISECONDS_IN_SECOND)}</div>
      <div>countDown {Math.ceil(countDown / MILLISECONDS_IN_SECOND)}</div>
    </div>
  ); 
}