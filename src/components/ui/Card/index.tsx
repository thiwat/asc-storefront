import { CardProps } from "./types"

const Card = ({
  children
}: CardProps) => {
  return (
    <div className={'bg-white shadow rounded px-3 py-3'}>
      {children}
    </div>
  )
}

export default Card