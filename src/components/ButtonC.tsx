import { Button, ButtonProps } from 'antd'
import cn from '../utils/cn'

interface IButtonC extends ButtonProps {
  variant: 'primary' | 'linear'
}

const style = {
  primary: 'hover:!text-black !text-black',
  linear:
    '!bg-linear2 hover:!bg-linear3 transition ease-in-out duration-300 delay-150'
}

const ButtonC = ({ variant, children, className, ...rest }: IButtonC) => {
  return (
    <Button
      className={cn(
        '!font-semibold !p-5 !pr-8 !border-0 !text-lg',
        style[variant],
        className
      )}
      type='primary'
      {...rest}
    >
      <div className='pl-1'>{children}</div>
    </Button>
  )
}

export default ButtonC
