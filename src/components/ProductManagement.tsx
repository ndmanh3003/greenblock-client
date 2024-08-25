import { useState } from 'react'
import { Line } from './layout'
import {
  allCurrent,
  IProduct,
  useDeleteProductMutation,
  useGetAllProductQuery
} from '../service/store/product'
import {
  CloseOutlined,
  DeleteOutlined,
  FilterOutlined,
  HomeOutlined
} from '@ant-design/icons'
import { cn } from '../utils'
import { useDebounce, useHandleError, useHandleSuccess } from '../hooks'
import { ButtonC, CreateProductModal, ProductInfo, TagCurrent } from '.'
import { useNavigate, useParams } from 'react-router-dom'
import { Checkbox, ConfigProvider, Empty, Input, Popconfirm } from 'antd'
import { Routes } from '../routes'

export const ProductManagement = () => {
  const [productList, setProductList] = useState<IProduct[]>()
  const { id } = useParams()
  const navigate = useNavigate()
  const [filter, setFilter] = useState<Record<string, boolean | string>>({
    ...Object.fromEntries(
      Object.entries(allCurrent).map(([key]) => [key, false])
    ),
    name: ''
  })
  const debounceName = useDebounce(
    (value: string) => setFilter({ ...filter, name: value }),
    300
  )

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

  const matchesFilter = (product: IProduct) => {
    const name = product.name.toLowerCase()
    const id = product._id
    const current = product.current.toUpperCase()
    const filterName = filter.name as string

    const nameOrIdMatches =
      name.includes(filterName) || id.includes(filterName) || filterName === ''

    const currentMatches = filter[current] === true
    const allFiltersFalse = Object.keys(allCurrent).every((key) => !filter[key])
    return nameOrIdMatches && (currentMatches || allFiltersFalse)
  }

  return (
    <>
      <div className='flex items-end justify-between'>
        <h1 className='font-bold text-3xl mt-8 mb-0'>List of Products</h1>
        <div className='flex gap-5'>
          <ConfigProvider
            theme={{
              token: {
                fontSize: 14,
                colorText: 'black',
                colorTextPlaceholder: 'gray'
              }
            }}
          >
            <Popconfirm
              title={null}
              icon={null}
              style={{ fontSize: 14 }}
              okButtonProps={{ className: 'p-1 px-2' }}
              placement='bottomRight'
              showCancel={false}
              description={
                <div className='w-60'>
                  <div className='font-semibold text-base'>
                    Filter products by:
                  </div>
                  <div className='mt-2'>Product name</div>
                  <Input
                    placeholder='Enter ID or name'
                    onChange={(e) => debounceName(e.target.value.toLowerCase())}
                  />
                  <div className='mt-2'>Current</div>
                  {Object.keys(allCurrent).map((current) => (
                    <Checkbox
                      key={current}
                      className='!text-base'
                      onChange={(e) =>
                        setFilter({ ...filter, [current]: e.target.checked })
                      }
                    >
                      <TagCurrent state={current} className='!my-1' />
                    </Checkbox>
                  ))}
                </div>
              }
            >
              <ButtonC
                variant='outline'
                className='!text-base !text-gr !font-medium !text-primary !outline-primary !aspect-square group !delay-0 !duration-75 !p-0 !pr-1 !rounded-full'
              >
                <FilterOutlined />
              </ButtonC>
            </Popconfirm>
          </ConfigProvider>
          {window.location.pathname.includes(Routes.BUSINESS) && (
            <CreateProductModal />
          )}
        </div>
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
            productList
              .filter((product) => matchesFilter(product))
              .map((product) => (
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
                            'group-hover:flex':
                              window.location.pathname.includes(Routes.BUSINESS)
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
