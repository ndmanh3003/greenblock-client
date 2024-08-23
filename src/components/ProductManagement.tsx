import { useState } from 'react'
import { Line } from './layout'
import { IProduct, useGetAllProductQuery } from '../service/store/product'
import { DeleteOutlined, HomeOutlined } from '@ant-design/icons'
import { cn } from '../utils'
import { useHandleError, useHandleSuccess } from '../hooks'
import { ProductInfo, TagCurrent } from '.'

export const ProductManagement = () => {
  const [current, setCurrent] = useState<string | null>(null)
  const [productList, setProductList] = useState<IProduct[]>()

  const {
    data,
    // refetch,
    isLoading,
    error
  } = useGetAllProductQuery({})
  useHandleError([error])
  useHandleSuccess(data, false, (data) => setProductList(data))

  if (isLoading) return
  return (
    <div>
      <h1 className='font-bold text-3xl mt-8'>
        List of Products
        <Line theme='light' />
      </h1>
      <main className='flex space-x-10 mt-5'>
        <div className='min-w-[350px] h-fit max-h-screen rounded-2xl bg-white border-[1px] overflow-y-auto py-3'>
          {productList &&
            productList.map((product) => (
              <div
                key={product._id}
                className={cn(
                  'my-1 group transition-all duration-100 cursor-pointer py-2 px-6 pr-12 relative hover:!bg-gray-100',
                  product._id === current && 'bg-linear1'
                )}
                onClick={() => setCurrent(product._id)}
              >
                <DeleteOutlined className='!text-red-500 absolute text-lg right-4 top-1/2 -translate-y-1/2 hidden group-hover:flex' />
                <div className='font-semibold text-lg truncate whitespace-nowrap overflow-hidden'>
                  {product.name}
                </div>
                <div className='grid grid-cols-3 mt-1'>
                  <TagCurrent state={product.current} />
                  <div className='flex items-center space-x-2 col-span-2'>
                    <HomeOutlined /> <span>{product.business.name}</span>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {current && (
          <div className='border rounded-2xl overflow-hidden w-full h-fit p-10'>
            <ProductInfo id={current} isBusiness={false} />
          </div>
        )}
      </main>
    </div>
  )
}
