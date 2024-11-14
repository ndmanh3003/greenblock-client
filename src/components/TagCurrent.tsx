import { Tag } from 'antd'

import { _currents } from '@/assets/options'
import { cn } from '@/utils'

const colors = ['green', 'lime', 'magenta', 'cyan', 'blue', 'volcano']

export const TagCurrent = ({
  state,
  className
}: {
  state: (typeof _currents)[keyof typeof _currents]
  className?: string
}) => {
  const index = Object.values(_currents).indexOf(state)
  const color = colors[index]

  return (
    <Tag
      bordered={false}
      className={cn('!w-fit !font-bold', className)}
      color={color}
    >
      {state.toLowerCase()}
    </Tag>
  )
}
