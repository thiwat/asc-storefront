import Icon from "@/components/ui/Icon"
import { QtyInputProps } from "./types"

const QtyInput = ({
  min,
  max,
  value = 0,
  onChange
}: QtyInputProps) => {

  const onAdd = () => {
    if (value + 1 > max) return
    onChange(value + 1)
  }

  const onRemove = () => {
    if (value - 1 < min) return
    onChange(value - 1)
  }

  return (
    <div className={'flex flex-row space-x-6 items-center text-font'}>
      <div className={'cursor-pointer bg-plane h-[28px] w-[28px] rounded flex justify-center items-center'} onClick={onRemove}>
        <Icon name={'Minus'} width={18} height={18} />
      </div>
      <div className={'text-lg !text-primary min-w-[10px] text-center'}>{value || min}</div>
      <div className={'cursor-pointer bg-plane h-[28px] w-[28px] rounded flex justify-center items-center'} onClick={onAdd}>
        <Icon name={'Plus'} width={18} height={18} />
      </div>
    </div>
  )
}

export default QtyInput