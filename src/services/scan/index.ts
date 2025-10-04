import { requestMarkUsedTicket } from "@/apis/client/ticket"
import { useRequest } from "ahooks"
import { useRef, useState } from "react"

const useScan = () => {

  const pause = useRef<boolean>(false)
  const [status, setStatus] = useState<string>('')


  const scanRequest = useRequest(requestMarkUsedTicket, {
    manual: true,
    onSuccess: (r) => {
      setStatus(r.status ? 'success' : 'failed')
    }
  })

  const onScan = (code: string) => {
    if (pause.current) return
    pause.current = true
    scanRequest.run({ code })
  }

  const onCloseModal = () => {
    pause.current = false
    setStatus('')
  }

  return {
    status,
    showModal: !!status,
    onScan,
    onCloseModal
  }
}

export default useScan