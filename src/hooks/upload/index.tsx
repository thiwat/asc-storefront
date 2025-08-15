import _isEmpty from 'lodash/isEmpty'
import { useContext, useRef, useState } from "react";
import { UploadHookProps } from "./types";
import { FormContext } from '@/components/form/Form';

const useUpload = ({
  data,
  path,
  onBlur,
  onChange
}: UploadHookProps) => {

  const { form } = useContext(FormContext)
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragOver, setDragOver] = useState<boolean>(false)

  const preventEvent = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const onDragOver = (e) => {
    preventEvent(e)
    setDragOver(true)
  }

  const onDragLeave = (e) => {
    preventEvent(e)
    setDragOver(false)
  }

  const onDrop = (e) => {
    preventEvent(e)
    setDragOver(false)
    const file = e.dataTransfer?.files[0] || e.target?.files[0]
    if (!file) return

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {

      onChange({
        file_name: file.name,
        size: file.size,
        path,
        image_data: reader.result,
        file_type: file.type
      })

      setTimeout(() => {
        form?.onBlur()
        onBlur && onBlur()
      }, 100)
    };
  }

  return {
    inputRef,
    dragOver,
    onDrop,
    preventEvent,
    onDragOver,
    onDragLeave,
  }
}

export default useUpload