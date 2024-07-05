import { Button } from 'antd'
import React from 'react'

interface IButtonC {
  //2 loại type là primary và variant
  type: 'primary' | 'variant'
  icon: React.ReactNode
  children: React.ReactNode
}

const ButtonC = (props: IButtonC) => {
  if (props.type === 'primary')
    return (
      <Button
        icon={props.icon}
        className='!text-lg !font-semibold !text-black !pr-8 !p-5 hover:!text-black !border-0'
        type='primary'
      >
        <div className='pl-1'>{props.children}</div>
      </Button>
    )
}

export default ButtonC
