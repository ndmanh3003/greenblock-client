import { useState } from 'react'
import { Line } from './layout'
import {
  IProduct,
  useDeleteProductMutation,
  useGetAllProductQuery
} from '../service/store/product'
import { CloseOutlined, DeleteOutlined, HomeOutlined } from '@ant-design/icons'
import { cn } from '../utils'
import { useHandleError, useHandleSuccess } from '../hooks'
import { CreateProductModal, ProductInfo, TagCurrent } from '.'
import { useNavigate, useParams } from 'react-router-dom'
import { ConfigProvider, Empty, Popconfirm } from 'antd'
import { Routes } from '../routes'

export const ProductManagement = () => {
  const [productList, setProductList] = useState<IProduct[]>()
  const { id } = useParams()
  const navigate = useNavigate()

  const { data, isLoading, error, refetch } = useGetAllProductQuery({})
  useHandleSuccess(data, false, (data) => setProductList(data))

  const {
    mutate,
    data: dataDelete,
    error: errorDelete,
    isPending
  } = useDeleteProductMutation()
  useHandleError([error, errorDelete])
  useHandleSuccess(dataDelete, true, () => refetch())

  return (
    <>
      <div className='flex items-end justify-between'>
        <h1 className='font-bold text-3xl mt-8 mb-0'>List of Products</h1>
        <CreateProductModal />
      </div>
      <Line theme='light' />
      {productList && productList.length === 0 && (
        <ConfigProvider
          theme={{
            token: { colorTextDescription: 'black' }
          }}
        >
          <div className='text-center mt-5'>
            <Empty />
          </div>
        </ConfigProvider>
      )}
      <main
        className={cn('flex space-x-10 mt-5', {
          hidden: !productList || productList.length === 0 || isLoading
        })}
      >
        <div className='min-w-[350px] h-fit max-h-screen rounded-2xl bg-white border-[1px] overflow-y-auto py-3'>
          {productList &&
            productList.map((product) => (
              <div
                key={product._id}
                className={cn(
                  'my-1 group transition-all duration-100 cursor-pointer py-2 px-6 pr-12 relative hover:!bg-gray-100',
                  product._id === id && 'bg-linear1'
                )}
                onClick={() => {
                  if (!id) navigate(product._id)
                  if (id !== product._id) {
                    const newPath = window.location.pathname.replace(
                      /\/[^/]+$/,
                      `/${product._id}`
                    )
                    navigate(newPath)
                  }
                }}
              >
                <ConfigProvider
                  theme={{
                    token: { fontSize: 14, colorText: 'black' }
                  }}
                >
                  <Popconfirm
                    title='Sure to update?'
                    onConfirm={() => mutate(product._id)}
                    style={{ fontSize: 14 }}
                    cancelText={<CloseOutlined style={{ fontSize: 12 }} />}
                    cancelButtonProps={{ className: '!aspect-square !p-0' }}
                    okText={<DeleteOutlined style={{ fontSize: 12 }} />}
                    okButtonProps={{ className: '!aspect-square !p-0' }}
                  >
                    <DeleteOutlined
                      onClick={(e) => e.stopPropagation()}
                      disabled={isPending}
                      className={cn(
                        '!text-red-500 absolute text-lg right-4 top-1/2 -translate-y-1/2 hidden z-50',
                        {
                          'group-hover:flex': window.location.pathname.includes(
                            Routes.BUSINESS
                          )
                        }
                      )}
                    />
                  </Popconfirm>
                </ConfigProvider>
                <div className='font-semibold text-lg truncate whitespace-nowrap overflow-hidden'>
                  {product.name}
                </div>
                <div className='grid grid-cols-3 mt-1'>
                  <TagCurrent state={product.current} />
                  <div className='flex items-center space-x-2 col-span-2'>
                    <HomeOutlined />
                    <span>
                      {window.location.pathname.includes(Routes.BUSINESS)
                        ? product.inspector.name
                        : product.business.name}
                    </span>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {id && (
          <div className='border rounded-2xl overflow-hidden w-full h-fit p-10'>
            <ProductInfo />
          </div>
        )}
      </main>
    </>
  )
}
