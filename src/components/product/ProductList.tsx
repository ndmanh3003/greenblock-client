import { CloseOutlined, DeleteOutlined, HomeOutlined } from '@ant-design/icons'
import { ConfigProvider, Empty, Popconfirm } from 'antd'
import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { FilterProduct } from './FilterProduct'
import { CreateProductModal, ProductInfo, TagCurrent } from '..'
import { Line } from '../layout'
import { _currents } from '@/assets/options'
import { useAppSelector, useHandleRefetch, useHandleSuccess } from '@/hooks'
import { Routes } from '@/routes'
import {
  IGetAllProductReq,
  IGetAllProductRes,
  useDeleteProductMutation,
  useGetAllProductQuery
} from '@/service/api/product'
import { selectRole } from '@/service/store/user'
import { cn } from '@/utils'
import { initQuery } from '@/utils'

export const ProductList = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const isBusiness = useAppSelector(selectRole)

  const [query, setQuery] = useState<IGetAllProductReq>(initQuery)
  const [productList, setProductList] = useState<IGetAllProductRes>()

  const { data, isLoading, refetch } = useGetAllProductQuery(query)
  useHandleSuccess(data, false, (data) => {
    if (query.page === 1) {
      setProductList(data)
    } else {
      setProductList((prev) => ({
        ...data,
        products: [...(prev?.products || []), ...data.products]
      }))
    }
  })
  useHandleRefetch(refetch, [query])

  const { mutate, data: dataDelete, isPending } = useDeleteProductMutation()
  useHandleSuccess(dataDelete, false, () => refetch())

  return (
    <div>
      {isBusiness && (
        <Link
          className='underline underline-offset-2 hover:text-primary'
          to={Routes.BUSINESS}
        >
          &#171; Return to the system
        </Link>
      )}
      <div className='flex items-end justify-between'>
        <h1 className='font-bold text-3xl mt-8 mb-0'>Product Management</h1>
        <div className='flex gap-5'>
          <FilterProduct query={query} setQuery={setQuery} />
          {isBusiness && <CreateProductModal />}
        </div>
      </div>
      <Line theme='light' />

      <main
        className={cn('flex space-x-10 mt-5', {
          hidden: !productList || isLoading
        })}
      >
        <div className='min-w-[350px] w-[350px]'>
          {productList && productList.products.length === 0 ? (
            id && (
              <ConfigProvider
                theme={{
                  token: { colorTextDescription: 'black' }
                }}
              >
                <div className='text-center mt-5'>
                  <Empty />
                </div>
              </ConfigProvider>
            )
          ) : (
            <div className='overflow-hidden h-fit max-h-[70vh] rounded-2xl border-[1px] overflow-y-auto py-3'>
              {productList?.products.map((product) => (
                <div
                  key={product._id}
                  className={cn(
                    'my-1 group cursor-pointer py-2 px-6 pr-12 relative hover:!bg-gray-100',
                    product._id === id && 'bg-linear1'
                  )}
                  onClick={() => {
                    if (!id) {
                      navigate(product._id)
                    }
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
                      cancelButtonProps={{ className: '!aspect-square !p-0' }}
                      cancelText={<CloseOutlined style={{ fontSize: 12 }} />}
                      okButtonProps={{ className: '!aspect-square !p-0' }}
                      okText={<DeleteOutlined style={{ fontSize: 12 }} />}
                      style={{ fontSize: 14 }}
                      title='Sure to delete?'
                      onCancel={(e) => e?.stopPropagation()}
                      onConfirm={(e) => {
                        e?.stopPropagation()
                        mutate(product._id)
                      }}
                    >
                      <DeleteOutlined
                        className={cn(
                          '!text-red-500 absolute text-lg right-4 top-1/2 -translate-y-1/2 hidden z-50',
                          {
                            'group-hover:flex': isBusiness
                          }
                        )}
                        disabled={isPending}
                        onClick={(e) => e.stopPropagation()}
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
                      <span className='line-clamp-1'>
                        {isBusiness
                          ? product.inspector.name
                          : product.business.name}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              <div className='text-center pt-2 text-sm'>
                <span>
                  {productList?.products.length} / {productList?.totalProducts}{' '}
                  {(productList?.totalProducts || 0) > 1
                    ? 'products'
                    : 'product'}
                </span>
                <span
                  className={cn(
                    'underline cursor-pointer hover:text-black text-primary !font-semibold ml-5',
                    {
                      hidden:
                        productList?.currentPage === productList?.totalPages
                    }
                  )}
                  onClick={() =>
                    setQuery((prev) => ({
                      ...prev,
                      page: (prev.page ?? 1) + 1
                    }))
                  }
                >
                  Load more
                </span>
              </div>
            </div>
          )}
        </div>
        {productList &&
          productList.products.length !== 0 &&
          (id ? (
            <div className='border rounded-2xl overflow-hidden w-full h-fit p-10'>
              <ProductInfo />
            </div>
          ) : (
            <span className='w-full text-center mt-5 text-base'>
              Please select a product
            </span>
          ))}
      </main>
      {productList && productList.products.length === 0 && !id && (
        <ConfigProvider
          theme={{
            token: { colorTextDescription: 'black' }
          }}
        >
          <div className='text-center mt-5 w-full'>
            <Empty />
          </div>
        </ConfigProvider>
      )}
    </div>
  )
}
