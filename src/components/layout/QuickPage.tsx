import { ReactNode } from 'react'

interface QuickPageProps {
  title: string
  children: ReactNode
}

export const QuickPage = ({ title, children }: QuickPageProps) => {
  return (
    <div className='w-full flex flex-col items-center justify-center text-white px-2 my-auto'>
      <h1 className='text-5xl text-center font-extrabold bg-linear2 inline-block text-transparent bg-clip-text'>
        {title}
      </h1>
      <div className='lg:w-[500px] w-fit text-center leading-relaxed text-lg bg-green2 inline-block text-transparent bg-clip-text font-medium'>
        {children}
      </div>
    </div>
  )
}
