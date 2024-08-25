import { Tag } from 'antd'
import { allCurrent } from '../service/store/product'
import { cn } from '../utils'

export const TagCurrent = ({
  state,
  className
}: {
  state: (typeof allCurrent)[keyof typeof allCurrent]
  className?: string
}) => {
  const color = {
    PLANTING: 'green',
    HARVESTED: 'lime',
    INSPECTING: 'magenta',
    INSPECTED: 'cyan',
    EXPORTED: 'blue',
    SOLD: 'volcano'
  }
  return (
    <Tag
      color={color[state.toUpperCase() as keyof typeof color]}
      className={cn('!w-fit !font-bold', className)}
      bordered={false}
    >
      {state.toLowerCase()}
    </Tag>
  )
}
