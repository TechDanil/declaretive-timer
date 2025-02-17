import { useState } from "react"
import { useNow } from "../../hooks/useNow"
import { MILLISECONDS_IN_SECOND, UPDATE_INTERVAL_MS } from "../../configs"

const RESEND_TIMEOUT = 10000;

export const ResetPassword = () => {
  const [sentAt, setSentAt] = useState<number | undefined>(undefined)

  const now = useNow(UPDATE_INTERVAL_MS, Boolean(sentAt), (now) => {
    if (Boolean(sentAt) && RESEND_TIMEOUT - (now - (sentAt as number)) < 0) {
      setSentAt(undefined)
    }
  })

  const msToResend = sentAt ? RESEND_TIMEOUT - (now - sentAt) : 0
  const isDisabled = msToResend > 0

  const handleSend = () => {
    setSentAt(Date.now())
  }

   return (
    <button disabled={isDisabled} onClick={handleSend}>
      {isDisabled ? `wait: ${Math.floor(msToResend / MILLISECONDS_IN_SECOND)}` : "Reset password"}
    </button>
  );
}