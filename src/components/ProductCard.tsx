import { useState } from 'react'
import ButtonC from './ButtonC'
import HistoryModal from './HistoryModal'

const ProductCard = () => {
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
        <span className='absolute bottom-1 right-1 text-sm bg-green-200 px-1 rounded-lg z-50 text-green3 font-semibold'>
          ID: 00000123
        </span>
      </div>
      <div
        className='mt-4 font-semibold text-green3 text-lg'
        onClick={() => setIsModalOpen(true)}
      >
        <p className='line-clamp-1 my-0'>ABC Company: Xoài vụ 01/2024</p>
        <p className='text-base font-medium text-black line-clamp-1'>
          Started: 03/03/24 - Harvested: 05/05/24
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

export default ProductCard
