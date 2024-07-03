import { Input } from 'antd'
import cn from '../../utils/cn'
import React from 'react'

type IInput = React.ComponentProps<typeof Input>

export default function InputC({ className, ...props }: IInput) {
  return (
    <Input
      className={cn('rounded-full w-52 px-5 pb-1', className)}
      {...props}
    />
  )
}
