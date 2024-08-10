import { useState } from 'react'
import { ButtonC, HistoryModal } from '.'

export const ProductCard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className='p-6 w-full border-[1px] rounded-lg bg-white group cursor-pointer'>
      <div
        className='relative w-full h-[200px] overflow-hidden rounded-lg'
        onClick={() => setIsModalOpen(true)}
      >
        <img
          src='auth-bg-dark.png'
          className='w-full aspect-video object-cover group-hover:scale-110 transition ease-in-out delay-75 '
        />
        <span className='absolute bottom-1 right-1 text-sm bg-green-200 px-2 rounded-lg z-50 text-green3 font-semibold'>
          00000123
        </span>
      </div>
      <div
        className='mt-4 font-semibold text-lg'
        onClick={() => setIsModalOpen(true)}
      >
        <p className='line-clamp-1 my-0'>ABC Company: Xoài vụ 01/2024</p>
        <p className='text-base font-medium text-black line-clamp-1'>
          Exported at: 01/01/2024
        </p>
      </div>
      <ButtonC
        className='!text-base !font-medium'
        variant='primary'
        onClick={() => setIsModalOpen(true)}
      >
        Inspect and Upload
      </ButtonC>
      <HistoryModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </div>
  )
}
