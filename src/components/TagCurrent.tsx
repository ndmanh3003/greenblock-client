import { Tag } from 'antd'
import { allCurrent } from '../service/store/product'

export const TagCurrent = ({
  state
}: {
  state: (typeof allCurrent)[keyof typeof allCurrent]
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
      className='!w-fit !font-bold'
      bordered={false}
    >
      {state}
    </Tag>
  )
}
