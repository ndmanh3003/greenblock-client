import { Form, Popconfirm } from 'antd'
import { InputC, ruleRequired } from './form'
import { EditOutlined, CloseOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { ButtonC } from './ButtonC'
import {
  allCurrent,
  IGetOverallProductRes,
  useGetOverallProductQuery
} from '../service/store/product'
import { useHandleError, useHandleSuccess } from '../hooks'
import { useChangeCodeMutation } from '../service/store/batch'
import { v4 as uuidv4 } from 'uuid'

export const ProductCode = () => {
  const [data, setData] = useState<Partial<IGetOverallProductRes>>()
  const [code, setCode] = useState('')

  const {
    data: dataOverall,
    isLoading,
    error,
    refetch
  } = useGetOverallProductQuery()
  useHandleSuccess(dataOverall, false, (data) => setData(data))

  const {
    mutate,
    error: errorUpdate,
    isPending,
    data: dataChangeCode
  } = useChangeCodeMutation()
  useHandleError([error, errorUpdate])
  useHandleSuccess(dataChangeCode, true, () => refetch())

  return (
    <div>
      <h1 className='text-2xl font-semibold'>Product Management</h1>
      <h2 className='text-lg font-semibold mt-5'>Secret Code</h2>
      {!isLoading && data && (
        <>
          <Form>
            <InputC
              disabled={isPending}
              onChange={(e) => setCode(e.target.value)}
              rules={ruleRequired}
              defaultValue={data?.code}
              name='code'
              suffix={
                <Popconfirm
                  title='Sure to update?'
                  onConfirm={() => mutate(code)}
                  style={{ fontSize: 14 }}
                  cancelText={<CloseOutlined style={{ fontSize: 12 }} />}
                  cancelButtonProps={{ className: '!aspect-square !p-0' }}
                  okText={<EditOutlined style={{ fontSize: 12 }} />}
                  okButtonProps={{ className: '!aspect-square !p-0' }}
                  disabled={!code}
                >
                  <EditOutlined className='mr-3 text-2xl cursor-pointer hover:!text-primary transition-all' />
                </Popconfirm>
              }
              className='!border-gray-200 w-[500px] !rounded-full'
              placeholder='1121217621'
            />
          </Form>
          <h2 className='text-lg font-semibold mt-10'>Static Product</h2>
          <div className='font-medium text-base mt-3 grid grid-cols-2 gap-x-5 w-fit'>
            <span>- Total product</span>
            <span>: {data.total}</span>
            {Object.values(allCurrent).map((key) => {
              return (
                <>
                  <span key={uuidv4()}>- Total {key}</span>
                  <span key={uuidv4()}>
                    : {data[key as keyof IGetOverallProductRes]}
                  </span>
                </>
              )
            })}
          </div>
        </>
      )}

      <ButtonC
        variant='primary'
        className='!text-0lg rounded-full !font-medium mt-5'
      >
        View and manage product
      </ButtonC>
    </div>
  )
}
