import { Button, ButtonProps } from 'antd'
import { cn } from '../utils'

export interface IButtonC extends ButtonProps {
  variant?: 'primary' | 'linear' | 'outline'
}

const style = {
  primary: 'hover:!text-black !text-black',
  linear: '!bg-linear2 hover:!bg-linear3 ',
  outline:
    '!bg-transparent outline !outline-2 !outline-white hover:!bg-white hover:!bg-opacity-10'
}

export const ButtonC = ({
  variant,
  children,
  className,
  ...rest
}: IButtonC) => {
  return (
    <Button
      className={cn(
        '!font-semibold !p-5 !pr-8 !border-0 !text-lg transition ease-in-out duration-300 delay-75',
        style[variant || 'linear'],
        className
      )}
      type='primary'
      {...rest}
    >
      <div className='pl-1'>{children}</div>
    </Button>
  )
}
