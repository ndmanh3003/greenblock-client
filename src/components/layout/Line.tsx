import cn from '../../utils/cn'

interface ILine {
  theme: 'light' | 'dark'
  className?: string
}

const _theme = {
  dark: 'bg-white',
  light: 'bg-black'
}

const Line = ({ theme, className }: ILine) => {
  return (
    <div
      className={cn(
        'w-full h-[1px] my-2 bg-opacity-10',
        _theme[theme],
        className
      )}
    />
  )
}

export default Line
