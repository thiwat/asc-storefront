import Modal from "@/components/ui/Modal"
import { PreviewModalProps } from "./types"
import { useMemo } from "react"

const PreviewModal = ({
  data,
  open,
  onClose
}: PreviewModalProps) => {

  const isPdf = data?.image_data?.startsWith('data:application/pdf;base64,')
    || data?.url?.endsWith('.pdf')

  const pdfData = useMemo(() => {

    if (data?.url) return data.url + '#toolbar=0&navpanes=0'

    if (!data?.image_data) return ''

    const blob = new Blob(
      [
        new Uint8Array(
          atob(data?.image_data.split(",")[1])
            .split("")
            .map((char) => char.charCodeAt(0))
        ),
      ],
      { type: "application/pdf" }
    );
    const blobUrl = URL.createObjectURL(blob);
    return blobUrl + '#toolbar=0&navpanes=0'

  }, [data?.image_data])

  return (
    <Modal
      open={open}
      onClose={onClose}
      modalClassName={'max-w-[600px]'}
    >
      <div className={'pt-12 pb-6 px-6'}>
        {isPdf &&
          <iframe
            src={pdfData}
            className={'w-full h-screen max-h-[70vh] no-scrollbar'}
          />
        }
        {!isPdf &&
          <img
            src={data?.image_data}
            className={'max-h-[50vh] mx-auto'}
          />
        }
      </div>
    </Modal>
  )
}

export default PreviewModal