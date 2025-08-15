import * as PhosphorIcons from '@phosphor-icons/react'
import { PhosphorIconProps } from './types'
import { FC } from 'react'

const Icon = ({ name, size = 24, weight = 'regular', className, ...rest }: PhosphorIconProps) => {
  const PhosphorIcon = PhosphorIcons[name] as FC<any>

  if (!PhosphorIcon) {
    console.warn(`Icon "${name}" does not exist in Phosphor icons.`)
    return null
  }

  return <PhosphorIcon size={size} weight={weight} {...rest} className={className} />
}

export default Icon
