import cn from '../utils/cn'
import ButtonC from './ButtonC'
import { Link } from 'react-router-dom'

const _color = [
  'bg-red-500',
  'bg-orange-500',
  'bg-yellow-500',
  'bg-green-500',
  'bg-blue-500',
  'bg-pink-500'
]

interface IPromotionCard {
  title: string
  desc: string
  link: string
  index: number
}

const PromotionCard = ({ title, desc, link, index }: IPromotionCard) => {
  const type = index % 2
  const color = _color[index % _color.length]
  return (
    // eslint-disable-next-line quotes
    <div
      className={cn(
        `h-[460px] w-full text-white relative overflow-hidden flex flex-col justify-center items-center p-10 text-center gap-5 ${color}`
      )}
    >
      {type ? (
        <>
          <div className='absolute h-4/5 aspect-square bg-linear4 rounded-full opacity-15 bottom-1/4 left-10 translate-y-1/2 -translate-x-1/4'>
            <div className='absolute h-full aspect-square rounded-full border-2 right-10 translate-x-1/2 border-white top-1/4' />
          </div>
          <div className='absolute h-4/5 aspect-square rounded-full border-2 opacity-15 right-20 translate-x-1/2 border-white top-0 -translate-y-1/4' />
        </>
      ) : (
        <>
          <img
            src='illus/wave-left.svg'
            className='absolute min-h-full left-0'
          />
          <img
            src='illus/wave-right.svg'
            className='absolute min-h-full right-0 top-0'
          />
        </>
      )}
      <h1 className='text-4xl font-bold max-w-[500px]'>{title}</h1>
      <p className='text-base max-w-[600px] line-clamp-3'>{desc}</p>
      <Link to={link} target='_blank'>
        <ButtonC variant='outline' className='!text-base !px-8 !py-4 !delay-0'>
          Read more
        </ButtonC>
      </Link>
    </div>
  )
}

export default PromotionCard
